import {useEffect, useState} from "react";
import PokemonModel from "../model/Pokemon.model.ts";
import axios, {AxiosError} from "axios";


const useApiArrayPokemons = (url:string) => {
    const [resPokemons , setResPokemons] = useState<PokemonModel[]>();
    const [loading , setLoading] = useState(true);
    const [error , setError] =useState<AxiosError | null>(null);
    const [ message , setMessage] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(url)
                    .then(res => res.data)
                    .then(({generation , message}: {generation:[] , message:string} ) => {
                        const pArr : PokemonModel[] = [];
                        generation.forEach(({ _id, gen , region , pokemonData , pokemons, typeData}) => {
                            const p = new PokemonModel(
                                pokemonData
                            )
                            p.id = pokemons
                            p.generation = [{id : _id , gen:gen ,  region: region }]
                            p.type = typeData
                            pArr.push(p);
                        })
                        setResPokemons(pArr);
                        setMessage(message);
                    })
            }catch (error){
                setError(error as AxiosError);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {resPokemons , loading , error , message}
}

export default useApiArrayPokemons;