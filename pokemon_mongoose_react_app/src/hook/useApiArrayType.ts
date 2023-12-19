import {useEffect, useState} from "react";
import TypeModel from "../model/Type.model.ts";
import axios, {AxiosError} from "axios";

const useApiArrayType = (url:string) => {
    const [resultType, setResultType] = useState<{types: TypeModel[] |null |undefined, message:string}>({types:null , message:""});
    const [loadingType , setLoadingType] = useState(true);
    const [errorType , setErrorType] = useState<AxiosError|null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(url)
                    .then(res => res.data)
                    .then(({message, data}:{data: TypeModel[] , message:string}) => {
                        const typeArr:TypeModel[] = [];
                        data?.forEach(type  => {
                            const t = new TypeModel(type);
                            t.id = type?.["_id"];
                            typeArr.push(t);
                            setResultType({types: typeArr , message:message});
                        })
                    })
            }
            catch (error){
                setErrorType(error as AxiosError);
            }
            finally {
                setLoadingType(false);
            }
        }
        fetchData();
    }, [url]);

    return {resultType , loadingType , errorType};
}

export default  useApiArrayType;