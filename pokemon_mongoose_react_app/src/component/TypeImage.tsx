import React from "react";
import useApiByType from "../hook/useApiByType.ts";
import {Image} from "react-bootstrap";
interface TypeProps{
    typeId:string
}
const TypeImage:React.FC<TypeProps> = ({typeId}) => {
    const {resultType , loadingType , errorType} = useApiByType(`http://localhost:3000/api/v1/types/${typeId}`);
    return (
        <>
            {!loadingType && !errorType &&
                <div className={`d-flex  gap-1 text-white type-${resultType?.type?.name} rounded px-3 py-2`} style={{height: "45px"}}>
                    <Image src={resultType?.type?.image} width={20}/>
                    <span>{resultType?.type?.name}</span>
                </div>
            }
        </>

    );
}

export default TypeImage;