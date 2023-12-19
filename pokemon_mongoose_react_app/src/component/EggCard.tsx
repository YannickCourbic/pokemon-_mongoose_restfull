import React from "react";
import {Container, Image, Spinner} from "react-bootstrap";
import useApiArrayResult from "../hook/useApiArrayResult.ts";
import PokemonModel from "../model/Pokemon.model.ts";
import {useNavigate} from "react-router-dom";

interface EggCardType{
    egg:string
}
const EggCard:React.FC<EggCardType> = ({egg}) => {
    const {result , loading , error} = useApiArrayResult(`http://localhost:3000/api/v1/pokemons/eggGroups/${egg}`);
    const navigate = useNavigate();
    console.log(error)
    return (
        <Container>
            <h6 className={"text-uppercase my-2"}>{egg} :</h6>
            {result?.pokemon?.map((pokemon:PokemonModel , index:number) => {
                return <span key={index}
                        onClick={() => {navigate(`/pokemon/${pokemon.name.fr}`, {state: {key: pokemon.pokedexId , pokemon: pokemon || null}})}}
                >
                    {loading && <Spinner animation="grow" variant="light" />}
                    {!loading && <Image key={pokemon.pokedexId} src={pokemon.sprites.regular} width={40}/>}
                </span>
            })}
        </Container>
    );
}

export default EggCard;