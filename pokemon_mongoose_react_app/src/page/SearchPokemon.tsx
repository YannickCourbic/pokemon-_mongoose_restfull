import React, { useState} from "react";
import {Button, Container, Form, Image, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import useApiArrayResult from "../hook/useApiArrayResult.ts";
import {useNavigate} from "react-router-dom";

const SearchPokemon:React.FC = () => {
    const [search , setSearch] = useState<string>("");
    const handleSubmitInput = (e:React.FormEvent<HTMLElement>) => {
        e.preventDefault();
    }
    const handleChangeInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        setSearch(e.target.value);
    }
    const {result ,loading , error} = useApiArrayResult((search !== "") ? `http://localhost:3000/api/v1/pokemons/search/${search}` :  `http://localhost:3000/api/v1/pokemons/search/""`);
    console.log(result , loading , error)
    const navigate = useNavigate();


    return (
        <Container style={{paddingTop:"6rem"}}>
            <h3 className={"text-center text-white text-uppercase"}>chercher un pokémon</h3>
            <Container
                fluid={"sm"}
                className={"mt-5 w-75"}
            >
                <InputGroup
                    className={"my-2"}
                    onSubmit={(e) => handleSubmitInput(e)}
                >
                    <InputGroupText className={"bg-secondary text-white"}>Rechercher Un Pokémon</InputGroupText>
                    <Form.Control
                        aria-label="search"
                        className={"bg-dark text-white"}
                        onInput={(e) => handleChangeInput(e)}
                    />
                    <Button variant={"primary"} className={"border border-white"}>Chercher un pokémon</Button>
                </InputGroup>
            </Container>
            {(result?.pokemon && result?.pokemon?.length > 0  ) &&
                <div className={"d-flex justify-content-center"}>
                    <ListGroup variant={"flush"} className={"rounded-4"} style={{width:"700px"}}>
                        {result.pokemon.map((pokemon , index) => {
                            return <ListGroupItem
                                        key={index}
                                        className={"bg-secondary-subtle d-flex align-items-center justify-content-center gap-5 linkHover"}
                                        onClick={() => {navigate(`/pokemon/${pokemon.name.fr}` , {state : { key:pokemon.pokedexId , pokemon:pokemon }})}}
                                    >
                                <Image src={pokemon.sprites.regular} width={40}/>
                                <h6 className={"mt-3"}>{pokemon.name.fr}</h6>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                </div>

            }
        </Container>

    );
}

export default SearchPokemon;