import {useEffect, useState} from "react";
import PokemonModel from "../model/Pokemon.model.ts";
import axios, {AxiosError} from "axios";


const useApi = (url:string) => {
    const [result, setResult] = useState<{pokemon: PokemonModel|null|undefined, message: string} | null>({pokemon : null , message: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>( null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(url)
                    .then(res => res.data)
                    .then(({message, data} : {data:PokemonModel , message:string}) =>{
                        const p = new PokemonModel(data);
                        p.id = data.id;
                        setResult({pokemon:p , message:message});
                    })
            }catch (error){
                setError(error as AxiosError);
            }finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);
    return {result,loading,error}
}

export default useApi;