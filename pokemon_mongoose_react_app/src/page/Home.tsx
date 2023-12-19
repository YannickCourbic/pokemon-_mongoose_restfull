import React, {useState} from "react";
import useApiArrayResult from "../hook/useApiArrayResult.ts";
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import CardPokemon from "../component/CardPokemon.tsx";
import {useNavigate} from "react-router-dom";



const Home:React.FC = () => {
    const [page , setPage] = useState<number>(1);
    const [limit , setLimit] = useState<number>(6);

    const {result, loading , error} = useApiArrayResult(`http://localhost:3000/api/v1/pokemons/all?page=${page}&limit=${limit}`);
    const handlePageNext = () => {
        setPage(page => page + 1);
    }
    const handlePagePrev = () => {
        setPage(page => page - 1);
    }
    const handleLimit = () => {
        setLimit(limit => limit + 1);
    }
    const  navigate = useNavigate();

    console.log(handleLimit );
    return (
        <>
            <Container className={"overflow-x-hidden"} style={{paddingTop:"8rem"}}>
                {error && <h1 className={"text-danger"}>Une erreur est Survenue...</h1>}
                {loading && <Spinner style={{position:"absolute" , top:"50%" , left:"50%" }} animation={"grow"} variant={"danger"}/>}
            <Row>
                {
                    result?.pokemon?.map((pokemon) => {
                        return<Col
                            key={pokemon.pokedexId}
                            sm={11}
                            md={4}
                            className={"mt-3"}
                            onClick={() => navigate(`/pokemon/${pokemon.name.fr}`, {state: {key: pokemon.pokedexId , pokemon: pokemon || null}})}
                        >
                            <CardPokemon key={pokemon.pokedexId} name={pokemon.name} sprites={pokemon.sprites} stats={pokemon.stats}/>
                        </Col>

                    })
                }
            </Row>
                <Pagination className={"mt-3 d-flex justify-content-center"}>
                    <Pagination.First onClick={() => setPage(1)} />
                    <Pagination.Prev onClick={() => handlePagePrev()} className={(page <= 1 ) ? "disabled" : ""}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={() => handlePageNext()}/>
                    <Pagination.Last onClick={()=> setPage(result ? Math.ceil(result?.count/limit ): 1)}/>
                </Pagination>
            </Container>
        </>
    );
}

export default Home;