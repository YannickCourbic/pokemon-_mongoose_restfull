import React, {useEffect, useState} from "react";
import {
    Col,
    Container,
    Form,
    FormCheck,
    FormGroup,
    FormLabel,
    FormSelect,
    Image,
    Pagination,
    Row,
    Table
} from "react-bootstrap";
import useApiArrayType from "../hook/useApiArrayType.ts";
import TypeModel from "../model/Type.model.ts";
import useApiArrayResult from "../hook/useApiArrayResult.ts";
import PokemonModel from "../model/Pokemon.model.ts";
import {useNavigate} from "react-router-dom";
import useApiArrayGen from "../hook/useApiArrayGen.ts";
import GenerationModel from "../model/Generation.model.ts";
const SearchAdvancedPokemon:React.FC = () => {
    const [ type , setType] = useState<string | null>(null);
    const [ gen , setGen] = useState<string | null>(null);
    const [limit , setLimit] = useState<string | null>(null);
    const [active , setActive] = useState<boolean>(false);
    const [currentPage , setCurrentPage] = useState<number>(1)
    const [params , setParams] = useState<string[] >([]);
    useEffect(() => {
        const updatedParams: string[] = [];

        if (type !== null) {
            updatedParams.push(type);
        }

        if (gen !== null) {
            updatedParams.push(gen);
        }

        if (limit !== null){
            updatedParams.push(limit)
        }
        if (active){
            if(limit !== null){
                updatedParams.push(`page=${currentPage}`)
            }
            else{
                updatedParams.push(`page=${currentPage}`);
                updatedParams.push(`limit=10`);
            }
        }

        setParams(updatedParams);
    }, [gen, type , limit , active , currentPage ]);


    const {resultType , loadingType , errorType} = useApiArrayType(`http://localhost:3000/api/v1/types/all`);
    const {result , loading , error} = useApiArrayResult(`http://localhost:3000/api/v1/pokemons/all?${params.length > 1 ? params.join("&") : params.join()}`);
    const {resultGen , loadingGen , errorGen} = useApiArrayGen(`http://localhost:3000/api/v1/generations/all`);

    const handleChangeType = (e: React.FormEvent<HTMLSelectElement>) => {
        setType( e.currentTarget.value !== "recherche par type" ? "type=" + e.currentTarget.value : "");
    }
    const handleChangeGeneration = (e:React.FormEvent<HTMLSelectElement>) => {
        setGen("gen=" +e.currentTarget.value );
    }
    const handleChangeLimit = (e:React.FormEvent<HTMLSelectElement>) => {
        setLimit("limit=" + e.currentTarget.value );
    }

    const handleCheckPaginated = () => {
            setActive(!active);
    }

    const navigate = useNavigate();
     return (
        <Container style={{marginTop:"10rem"}}>
            <Row>
                <Col xs={11} md={4}>
                    <Form onSubmit={(e) => e.preventDefault()} className={"w-50"}>
                        <Row>
                            <FormGroup as={Col} md={12}>
                                <FormLabel className={"text-uppercase text-white fw-semibold mt-5"}>Rechercher par type </FormLabel>
                                <FormSelect
                                    size={"sm"}
                                    className={"bg-dark text-white"}
                                    onChange={(e) => {handleChangeType(e)}}
                                >
                                    <option>recherche par type</option>
                                    {!loadingType && errorType === null && resultType.types?.map((type:TypeModel , index:number) => {
                                        return <option
                                                    key={index}
                                                    value={type.name}
                                                    className={""}
                                                >
                                              {type.name}
                                        </option>
                                    })}
                                </FormSelect>
                            </FormGroup>
                            <FormGroup as={Col} md={12}>
                                <FormLabel className={"text-uppercase text-white fw-semibold mt-5"}>Rechercher par génération </FormLabel>
                                <FormSelect
                                    size={"sm"}
                                    className={"bg-dark text-white"}
                                    onChange = {(e) => handleChangeGeneration(e)}
                                >
                                    <option>rechercher par génération</option>
                                    {!loadingGen && errorGen === null && resultGen?.generation?.map((generation:GenerationModel , index:number) => {

                                        return <option
                                                key={index}
                                                value={generation.gen}
                                                >{generation.region}</option>
                                    })}
                                </FormSelect>
                            </FormGroup>
                            <FormGroup as={Col} md={12}>
                                <FormLabel className={"text-uppercase text-white fw-semibold mt-5"}>Nombre de Pokémon Maximum</FormLabel>
                                <FormSelect
                                    size={"sm"}
                                    className={"bg-dark text-white"}
                                    onChange={(e) => handleChangeLimit(e)}
                                >
                                    <option>nombre de pokémon</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel className={"text-uppercase text-white fw-semibold mt-5"}>Pagination</FormLabel>
                                <FormCheck
                                    type={"switch"}
                                    label={"activer la pagination"}
                                    className={"text-white text-capitalize"}
                                    onInput={() => handleCheckPaginated()}
                                />
                            </FormGroup>
                        </Row>
                    </Form>
                </Col>
                <Col xs={11} md={8}>
                    <h3 className={"text-center text-uppercase text-light"}>Recherche avancée pokémon</h3>
                    {(!loading && error == null) &&
                        <Container>
                            <Table striped bordered hover variant={"secondary"}  className={"mt-5"} size={"sm"}>
                                <thead>
                                <tr>
                                    <th className={"text-center fw-bold"}>#</th>
                                    <th className={"text-center fw-bold"}>Nom français</th>
                                    <th className={"text-center fw-bold"}>Nom anglais</th>
                                    <th className={"text-center fw-bold"}>Nom japonais</th>
                                    <th className={"text-center fw-bold"}>sprite</th>
                                    <th className={"text-center fw-bold"}>type</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {result?.pokemon?.map((pokemon : PokemonModel) => {
                                                return <tr key={pokemon.id}>
                                                    <td className={"fw-bolder text-center"}>{pokemon.pokedexId}</td>
                                                            <td className={"text-center icon-link-hover link-success"}
                                                                onClick={() => navigate(`/pokemon/${pokemon.name.fr}` , {state:{key: pokemon.pokedexId , pokemon: pokemon}})}
                                                            >
                                                                {pokemon.name.fr}
                                                            </td>
                                                            <td className={"text-center text-primary"}>{pokemon.name.en}</td>
                                                            <td className={"text-center text-danger"}>{pokemon.name.jp}</td>
                                                            <td className={" d-flex justify-content-center align-items-center"} style={{height:"100px"}}><Image src={pokemon.sprites.regular} width={50} className={""}/></td>
                                                            <td className={""}>{pokemon.type.map((type , index) => {
                                                                return <div key={index} className={`d-flex mb-1 mx-auto rounded-2 text-white align-items-center type-${type.name} justify-content-center gap-2 w-90`} >
                                                                    <Image src={(type.image !== null) ? type.image : ""} className={"rounded-circle"} width={"auto"} height={20} />
                                                                    <h6 className={"pt-2"}>{type.name}</h6>
                                                                </div>
                                                            })}
                                                            </td>
                                                </tr>
                                    })}
                                </tbody>
                            </Table>
                            {active &&
                            <Pagination className={"mt-3 d-flex justify-content-center"}>
                                <Pagination.First onClick={() => setCurrentPage(1)} />
                                <Pagination.Prev onClick={() => setCurrentPage( currentPage - 1)} className={(currentPage <= 1 ) ? "disabled" : ""}/>
                                <Pagination.Item>{currentPage}</Pagination.Item>
                                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
                            </Pagination>
                            }
                        </Container>
                    }
                </Col>
            </Row>

        </Container>
    );
}

export default SearchAdvancedPokemon;