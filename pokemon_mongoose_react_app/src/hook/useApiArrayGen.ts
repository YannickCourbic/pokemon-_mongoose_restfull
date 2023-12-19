import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import GenerationModel from "../model/Generation.model.ts";


const useApiArrayGen = (url:string) => {
    const [resultGen, setResultGen] = useState<{generation: GenerationModel[]|null|undefined, message: string} | null>({generation : null , message: ""});
    const [loadingGen, setLoadingGen] = useState(true);
    const [errorGen, setErrorGen] = useState<AxiosError | null>( null);
    useEffect(() => {


            const fetchData = async () => {
                try {
                    axios.get(url)
                        .then(res => res.data)
                        .then(({message, data}: { data: [GenerationModel], message: string }) => {
                            const gArr:GenerationModel[] = [];
                            data?.forEach(generation => {
                                const g = new GenerationModel(generation);
                                g.id = generation["_id"];
                                gArr.push(g);
                                setResultGen({generation:gArr , message:message})
                            })
                        })
                }

                catch (error){
                    setErrorGen(error as AxiosError);
                }
                finally {
                    setLoadingGen(false);
                }

            }
            fetchData();

    }, [url]);
    return {resultGen , loadingGen, errorGen};

}

export default  useApiArrayGen;