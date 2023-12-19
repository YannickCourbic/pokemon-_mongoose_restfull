import React from "react";
import PokemonModel from "../model/Pokemon.model.ts";
import {Image} from "react-bootstrap";
import GenerationModel from "../model/Generation.model.ts";
import TypeImage from "./TypeImage.tsx";
interface TableBodyProps{
    pokemon:PokemonModel,
    currentGen: GenerationModel | undefined
}
const RowTable:React.FC<TableBodyProps> = ({pokemon, currentGen}) => {
    pokemon.generation = [{ id: currentGen?.id  ,gen: currentGen?.gen , region: currentGen?.region}];

    return (
        <tr>
            <td className={"border border-3 border-secondary rounded text-center" }>{pokemon.pokedexId}</td>
            <td className={"border border-3 border-secondary rounded text-center" }>{currentGen?.gen}</td>
            <td className={"border border-3 border-secondary rounded text-center" }>{currentGen?.region}</td>
            <td className={"border border-3 border-secondary rounded text-center" }

            ><Image src={pokemon?.sprites?.regular} width={45} /></td>
            <td className={"border border-3 border-secondary rounded text-center" }
            >{pokemon?.name?.fr}</td>
            <td className={"border border-3 border-secondary rounded text-center text-primary" }>{pokemon?.name?.en}</td>
            <td className={"border border-3 border-secondary rounded text-center text-danger" }>{pokemon?.name?.jp}</td>
            <td className={"border border-3 border-secondary rounded text-center d-flex gap-1 justify-content-center align-items-center"} style={{height:"100%" , width:"100%"}}>    {
                pokemon?.typeId?.map((type:string , index:number) => {
                    return <TypeImage key={index} typeId={type}/>
                })}
            </td>
            <td className={"border border-3 border-secondary rounded text-center" }>{pokemon?.category}</td>
            <td className={"border border-3 border-secondary rounded text-center"}>
                <div className="d-flex">
                    <i className="bi bi-gender-male text-primary"></i>
                    <span className={"text-primary"}>{pokemon?.sexe?.male}% </span>
                    <i className="bi bi-gender-female text-danger"></i>
                    <span className={"text-danger"} >{pokemon?.sexe?.female}% </span>
                </div>

            </td>
        </tr>
    );
}

export default RowTable;