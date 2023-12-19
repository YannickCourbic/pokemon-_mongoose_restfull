import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import GenerationModel from "../model/Generation.model.ts";


const useApiByGen = (url:string) => {
    const [result, setResult] = useState<{generation: GenerationModel|null|undefined, message: string} | null>({generation : null , message: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>( null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(url)
                    .then(res => res.data)
                    .then(({message, data} : {data:GenerationModel , message:string}) =>{
                        const g = new GenerationModel(data);
                        g.id = data.id;
                        setResult({generation:g , message:message});
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

export default useApiByGen;