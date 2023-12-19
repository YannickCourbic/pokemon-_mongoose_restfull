import React from "react";
import {Card, CardImg, CardSubtitle, CardTitle} from "react-bootstrap";
import useApiArrayResult from "../hook/useApiArrayResult.ts";
import PokemonModel from "../model/Pokemon.model.ts";
import {useNavigate} from "react-router-dom";
interface EvolutionCardProps {
    pokemon: {pokedexId:number , name:string , condition:string}
}
const EvolutionCard :React.FC<EvolutionCardProps> = ({pokemon}) => {
    const {result} = useApiArrayResult(`http://localhost:3000/api/v1/pokemons/all?name=${pokemon.name}&lang=fr`)
    const navigate = useNavigate();
    return (
        <Card
            style={{width:"15rem", height:"15rem" , background:"none"}} className={"rounded-circle text-white d-flex justify-content-center align-items-center border border-2 border-secondary p-5"}>
            <CardTitle className={"pb-4 text-center"}>{pokemon?.name}</CardTitle>
            {
                result?.pokemon?.map(((pokemon:PokemonModel , index:number) => {
                    console.log(pokemon)
                    return <CardImg
                            onClick={() => {navigate(`/pokemon/${pokemon?.name?.fr}` , {state: {key: pokemon.pokedexId , pokemon: pokemon || null}})}}
                            key={index} variant={"top"} src={pokemon?.sprites?.regular} style={{width:"65%" ,marginTop:"-20px"}} >

                            </CardImg>
                }))
            }
            <CardSubtitle className={"mt-2 text-center"}>{pokemon.condition}</CardSubtitle>
        </Card>
    );
}

export default EvolutionCard;