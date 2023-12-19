import React from "react";
import {Card, CardSubtitle, Col, ProgressBar, Row, Spinner} from "react-bootstrap";
import useApi from "../hook/useApi.ts";
interface CardPokemonType {
    name: {fr:string , en:string , jp:string}
    sprites: { regular: string, shiny?: string | null, gmax?: { regular?: string; shiny?: string } | null},
    stats:{hp:number, atk:number, def:number, spe_atk:number, spe_def:number, vit:number}
}
const CardPokemon:React.FC<CardPokemonType> = ({name, sprites, stats}) => {
    const {result , loading , error} = useApi("http://localhost:3000/api/v1/pokemons/stats/max?hp=1")
    const hp = result?.pokemon?.stats.hp ? (100 * stats.hp / result?.pokemon?.stats.hp) : 0;
    const atk = useApi("http://localhost:3000/api/v1/pokemons/stats/max?atk=1");
    const def = useApi("http://localhost:3000/api/v1/pokemons/stats/max?def=1");
    const spe_atk = useApi("http://localhost:3000/api/v1/pokemons/stats/max?spe_atk=1");
    const spe_def = useApi("http://localhost:3000/api/v1/pokemons/stats/max?spe_def=1");
    const vit = useApi("http://localhost:3000/api/v1/pokemons/stats/max?vit=1");
    return (
        <Card className={"rounded-4  shadow"}  style={{background: "#d9d9d9"}}>
            {error && <h1 className={"text-danger"}>Une Erreur est Survenue...</h1>}
            {loading && <Spinner style={{position:"relative" , top:"50%" , left:"50%" }} animation={"grow"} variant={"danger"}/>}
            {!loading &&
                <Row>
                    <Col>
                        <Card.Img variant="top" src={sprites?.regular} />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{name.fr}</Card.Title>
                            <CardSubtitle className={"mt-1 text-danger"}>{name.en}</CardSubtitle>
                            <CardSubtitle className={"mt-1 text-primary"}>{name.jp}</CardSubtitle>
                            <div>
                                <span className={"fw-bolder"} style={{fontSize:"8px",  }}>PV</span>
                                <ProgressBar variant="success" now={hp} style={{height:"8px" , marginBottom:"-8px"}}/>
                                <span className={"fw-bolder"} style={{fontSize:"8px"}}>ATK</span>
                                <ProgressBar variant="danger" now={stats.atk/(atk.result?.pokemon?.stats.atk ? atk.result?.pokemon?.stats.atk : 0) * 100} style={{height:"8px" , marginBottom:"-8px"}}/>
                                <span className={"fw-bolder"} style={{fontSize:"8px"}}>DEF</span>
                                <ProgressBar variant="primary" now={stats.def/(def.result?.pokemon?.stats.def ? def.result?.pokemon?.stats.def : 0) * 100} style={{height:"8px" , marginBottom:"-8px"}}/>
                                <span className={"fw-bolder"} style={{fontSize:"8px"}}>SPE ATK</span>
                                <ProgressBar variant="info" now={stats.spe_atk/(spe_atk.result?.pokemon?.stats.spe_atk ? spe_atk.result?.pokemon?.stats.spe_atk : 0) * 100} style={{height:"8px", marginBottom:"-8px"}}/>
                                <span className={"fw-bolder"} style={{fontSize:"8px"}}>SPE DEF</span>
                                <ProgressBar variant="warning" now={stats.spe_def/(spe_def.result?.pokemon?.stats.spe_def ? spe_def.result?.pokemon?.stats.spe_def : 0) * 100} style={{height:"8px", marginBottom:"-8px"}}/>
                                <span className={"fw-bolder"} style={{fontSize:"8px"}}>VIT</span>
                                <ProgressBar variant="secondary" now={stats.vit/(vit.result?.pokemon?.stats.vit ? vit.result?.pokemon?.stats.vit : 0) * 100} style={{height:"8px"}}/>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            }
        </Card>
    );
}

export default CardPokemon;