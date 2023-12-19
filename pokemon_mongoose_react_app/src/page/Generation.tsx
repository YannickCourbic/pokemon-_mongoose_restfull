import React, {useState} from "react";
import {Col, Container, FormSelect, Image, Row, Table} from "react-bootstrap";
import useApiArrayPokemons from "../hook/useApiArrayPokemons.ts";
import useApiArrayGen from "../hook/useApiArrayGen.ts";
import PokemonModel from "../model/Pokemon.model.ts";
import {useNavigate} from "react-router-dom";


const Generation:React.FC = () => {
    const [gen , setGen] = useState<number>(1);
    const {resPokemons , loading , error , message } = useApiArrayPokemons(`http://localhost:3000/api/v1/pokemons/gen/${gen}`)
    console.log(resPokemons)
    const {resultGen , loadingGen , errorGen} = useApiArrayGen(`http://localhost:3000/api/v1/generations/all`);
    const handleSubmitForm = (e:React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
    }
    const handleChangeForm = (e:React.FormEvent<HTMLSelectElement>) => {
        setGen(parseInt(e.currentTarget.value))
    }
    const navigate = useNavigate();
    return (
        <Container  style={{marginTop:"10rem"}}>
            <Row>
                <Col sm={11} md={3}>
                    <FormSelect
                        size={"lg"}
                        onSubmit={(e) => {handleSubmitForm(e)}}
                        onChange={(e) => {
                            handleChangeForm(e)
                        }}
                        className={"bg-secondary text-white shadow shadow-lg text-center"}>
                        <option className={""}>Génération</option>
                        {(!loadingGen && !errorGen )&& resultGen?.generation?.map((generation) => {
                            return<option key={generation.id} value={generation.gen}> {generation.region}</option>
                        })}
                    </FormSelect>
                </Col>
                <Col sm={11} md={8}>
                        <Container>
                            <h3 className={"text-center text-uppercase text-white mt-5 mt-md-0"}>Pokémon de la génération n°{gen}</h3>
                            {(!loading && error === null && message !== null)  &&
                                <Table striped bordered hover variant={"secondary"}  className={"mt-5"}>
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
                                    {resPokemons?.map((pokemon : PokemonModel) => {

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
                            }

                        </Container>
                </Col>
            </Row>

        </Container>
    );
}

export default Generation;