import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import PokemonModel from "../model/Pokemon.model.ts";

const useApiArrayResult = (url: string | undefined) => {
    const [result, setResult] = useState<{pokemon: PokemonModel[]| null, message: string , count:number} | null>({pokemon : null , message: "" , count:0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>( null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(url !== undefined ? url : "")
                    .then(res => res.data)
                    .then(({message , data , total } : { data: PokemonModel[], message:string , total:number}) => {
                        const pArr: PokemonModel[] = [];
                        if(data.length > 1){
                            data?.forEach((pokemon:PokemonModel) => {
                                const p = new PokemonModel(pokemon);
                                p.id = pokemon["_id"]
                                pArr.push(p);
                            })
                            setResult({pokemon : pArr , message:message , count:total})
                        }
                        else {
                            setResult({pokemon : data , message:message , count:total})
                        }

                    })

                // setResult( response.data);
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { result, loading, error };
};

export default useApiArrayResult;
