import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import TypeModel from "../model/Type.model.ts";
import typeModel from "../model/Type.model.ts";

const useApiByType = (url:string) => {
    const [resultType, setResultType] = useState<{type: typeModel|null|undefined, message: string} | null>({type : null , message: ""});
    const [loadingType, setLoadingType] = useState(true);
    const [errorType, setErrorType] = useState<AxiosError | null>( null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                axios.get(url)
                    .then(res => res.data)
                    .then(({message , data}:{data:TypeModel , message:string} ) => {
                        setResultType({type: data , message:message})
                    })
            }
            catch (error){
                setErrorType(error as AxiosError)
            }
            finally {
                setLoadingType(false);
            }
        }
        fetchData();
    }, [url]);
    return{resultType ,loadingType , errorType}
}

export default useApiByType;