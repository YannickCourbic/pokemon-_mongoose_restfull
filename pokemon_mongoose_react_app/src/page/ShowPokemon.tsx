import React from "react";
import {Badge, Col, Container, Image, Row} from "react-bootstrap";
import PokemonModel from "../model/Pokemon.model.ts";
import {useLocation} from "react-router-dom";
import useApi from "../hook/useApi.ts";
import EvolutionCard from "../component/EvolutionCard.tsx";
import EggCard from "../component/EggCard.tsx";

interface ShowPokemonState{
    key:number,
    pokemon: PokemonModel | null| undefined
}
const ShowPokemon:React.FC<ShowPokemonState>= () => {
    const {state} = useLocation();
    const { pokemon} = state;
    console.log(pokemon)


    const statBgColor = (stat:number):string => {
        let newValueBg = null;
        if(stat >= 100){
           newValueBg = "#70e000"
        }
        else if(stat >= 80 && stat <100){
           newValueBg =  "#ffd100"
        }
        else{
           newValueBg =  "#fca311"
        }
        return newValueBg;
    }

    const maxHp = useApi("http://localhost:3000/api/v1/pokemons/stats/max?hp=1")?.result?.pokemon?.stats?.hp;
    const maxAtk = useApi("http://localhost:3000/api/v1/pokemons/stats/max?atk=1")?.result?.pokemon?.stats?.atk;
    const maxDef = useApi("http://localhost:3000/api/v1/pokemons/stats/max?def=1")?.result?.pokemon?.stats?.def;
    const maxSpeAtk = useApi("http://localhost:3000/api/v1/pokemons/stats/max?spe_atk=1")?.result?.pokemon?.stats?.spe_atk;
    const maxSpeDef = useApi("http://localhost:3000/api/v1/pokemons/stats/max?spe_def=1")?.result?.pokemon?.stats?.spe_def;
    const maxVit = useApi("http://localhost:3000/api/v1/pokemons/stats/max?vit=1")?.result?.pokemon?.stats?.vit;



    return (
        <Container fluid={"md overflow-x-hidden"} style={{paddingTop:"5rem"}}>
            <Badge bg={"secondary rounded-4 px-5"} className={"fs-4"}>{pokemon?._generation ? pokemon?._generation[0].region : pokemon?.generation[0].region}</Badge>
            <Container className={"py-md-2 px-4 my-3 rounded-4 d-flex flex-md-row flex-column align-items-center gap-3 "} style={{background: "#284b63"}}>
                <Image src={pokemon?._sprites?.regular || pokemon?.sprites?.regular } width={60} height={60} />
                <div className={"fw-bold text-light mt-md-4  w-100 d-flex  justify-content-around fs-5"}> <span>{pokemon?._name?.fr || pokemon?.name?.fr}</span>  <span className={"text-danger"}>{pokemon?._name?.en || pokemon?.name?.en}</span>  <span className={"text-warning"}>{pokemon?._name?.jp || pokemon?.name?.jp}</span></div>
            </Container>
            <Container className={"mt-3 w-100"}>
                <Row>
                    <Col xs={11} md={4} className={"d-flex justify-content-center align-items-center"}>
                        <Image src={pokemon?._sprites?.regular || pokemon?.sprites?.regular} width={"75%"}/>
                    </Col>
                    <Col xs={11} md={4} className={"text-white px-5 py-3 "}>
                        <Container >
                            <h5 className={"text-capitalize"}>type :</h5>
                            <div className={"d-md-flex"}>
                                {pokemon?._type?.map((type:{name:string , image:string} , index:number) => {
                                    return <p key={index} className={`type-${type.name} d-flex px-3 rounded-4 me-3 fw-bold`}> <Image src={type.image} width={40} height={40}/> <span className={"mt-2 px-2"}>{type.name}</span></p>
                                }) || pokemon?.type?.map((type:{name:string , image:string} , index:number) => {
                                    return <p key={index} className={`type-${type.name} d-flex px-3 rounded-4 me-3 fw-bold`}> <Image src={type.image} width={40} height={40}/> <span className={"mt-2 px-2"}>{type.name}</span></p>
                                })}
                            </div>
                        </Container>
                        <Container className={"mt-2"}>
                            <h5 className={"text-capitalize"}>talent :</h5>
                            <div className={"d-flex flex-column"}>
                                {pokemon?._talents?.map((talent:{name:string , tc:boolean} , index:number) => {
                                    return <span key={index} className={"fs-5"}>  {talent.name} {talent.tc ? "(talent caché)" : ""}</span>
                                })
                                || pokemon?.talents?.map((talent:{name:string , tc:boolean} , index:number) => {
                                        return <span key={index} className={"fs-5"}>  {talent.name} {talent.tc ? "(talent caché)" : ""}</span>
                                    })
                                }
                            </div>

                        </Container>
                        <Container className={"mt-4"}>
                            <h5 className={"text-capitalize"}>groupe d'oeuf :</h5>
                            <div className={"d-flex flex-column"}>
                                {pokemon?._eggGroups?.map((egg:string , index:number) => {
                                    return <span key={index} className={"fs-5"}> {egg}</span>
                                }) ||
                                    pokemon?.eggGroups?.map((egg:string , index:number) => {
                                    return <span key={index} className={"fs-5"}> {egg}</span>
                                })
                                    ||"Pas de groupe d'Oeuf"}
                            </div>
                        </Container>
                        <Container className={"d-md-flex gap-1 mt-4 align-items-baseline"}>
                            <h5 className={"text-capitalize ms-md-2"}>sexe :</h5>
                            <h6>
                                {(pokemon?._sexe?.male || pokemon?.sexe?.male )&& <i className="bi bi-gender-male fs-5 text-primary"></i>} {(pokemon?._sexe?.male || pokemon?.sexe?.male) ? pokemon?._sexe?.male || pokemon?.sexe?.male + "%" : ""}
                            </h6>
                            <h6 className={"ms-md-2"}> {(pokemon?._sexe?.female || pokemon?.sexe?.female )&& <i className="bi bi-gender-female fs-5 text-danger"></i>} {(pokemon._sexe?.female || pokemon?.sexe?.female) ? pokemon?._sexe?.female || pokemon?.sexe?.female + "%" : ""} </h6>
                        </Container>

                    </Col>
                    <Col xs={11} md={4} className={"text-white px-5 py-3 border border-1 border-secondary rounded-4 mx-auto"}>
                        <Container>
                            <h5 className={"text-capitalize"}>statistique :</h5>
                            <div className={"d-flex flex-column align-items-around justify-content-center"}>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"} style={{marginRight:"38px"}}>pv</h6>
                                    <div className={"rounded-4 mb-1 d-flex align-items-center justify-content-end"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.hp || pokemon?.stats?.hp) , width:(((pokemon?._stats?.hp || pokemon?.stats?.hp) / (maxHp != undefined ? maxHp : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.hp || pokemon?.stats?.hp}</p>
                                </div>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"} style={{marginRight:"30px"}}>atk</h6>
                                    <div className={"rounded-4 mb-1"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.atk || pokemon?.stats?.atk) , width:(((pokemon?._stats?.atk || pokemon?.stats?.atk) / (maxAtk != undefined ? maxAtk : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.atk || pokemon?.stats?.atk}</p>

                                </div>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"} style={{marginRight:"30px"}}>def</h6>
                                    <div className={"rounded-4 mb-1"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.def || pokemon?.stats?.def) , width:(((pokemon?._stats?.def || pokemon?.stats?.def) / (maxDef != undefined ? maxDef : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.def || pokemon?.stats?.def}</p>
                                </div>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"}>spé atk</h6>
                                    <div className={"rounded-4 mb-1"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.spe_atk || pokemon?.stats?.spe_atk) , width:(((pokemon?._stats?.spe_atk || pokemon?.stats?.spe_atk) / (maxSpeAtk != undefined ? maxSpeAtk : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.spe_atk || pokemon?.stats?.spe_atk}</p>
                                </div>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"}>spé def</h6>
                                    <div className={"rounded-4 mb-1"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.spe_def || pokemon?.stats?.spe_def) , width:(((pokemon?._stats?.spe_def || pokemon?.stats?.spe_def) / (maxSpeDef != undefined ? maxSpeDef : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.spe_def || pokemon?.stats?.spe_def}</p>
                                </div>
                                <div className={"d-flex align-items-center gap-2"}>
                                    <h6 className={"text-uppercase"} style={{marginRight:"35px"}}>vit</h6>
                                    <div className={"rounded-4 mb-1"} style={{height:"10px" , background : statBgColor(pokemon?._stats?.vit || pokemon?.stats?.vit) , width:(((pokemon?._stats?.vit || pokemon?.stats?.vit) / (maxVit != undefined ? maxVit : 1)) * 100) + "%" }}></div>
                                    <p className={"mt-2"}>{pokemon?._stats?.vit || pokemon?.stats?.vit}</p>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
                <Row className={"text-white mt-5 d-flex justify-content-center "} >
                    <Col md={6} xs={11} className={"border border-1 border-secondary rounded-4 py-2"}>
                        <Container >
                            <h4 className={"text-uppercase text-center"}>Résistances</h4>
                            <div className="d-flex flex-column">
                                <h5>Immunité :</h5>
                                <div className={"d-flex flex-row  mb-3"}>
                                    {pokemon?._resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier === 0))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                        console.log(resistance , index)
                                        return<h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/>x {resistance.multiplier}</h6>
                                    } )
                                    || pokemon?.resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier === 0))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                            console.log(resistance , index)
                                            return<h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/>x {resistance.multiplier}</h6>
                                        } )
                                    }
                                </div>
                                <h5>Résiste à :</h5>
                                <div className={"d-flex flex-row gap-3 mb-3"} >
                                    <Row className={""}>
                                        {pokemon?._resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier < 1 && resistance?.multiplier > 0))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                            console.log(resistance , index)
                                            return <Col xs={6} md={3} key={index} >
                                                <h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/> <span>x {resistance.multiplier}</span></h6>
                                            </Col>
                                        } ) || pokemon?.resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier < 1 && resistance?.multiplier > 0))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                            console.log(resistance , index)
                                            return <Col xs={6} md={3} key={index}>
                                                <h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/>x {resistance.multiplier}</h6>
                                            </Col>
                                        } )}
                                    </Row>

                                </div>
                                <h5>Faiblesse à :</h5>
                                <div className={"d-flex flex-row  gap-3 w-100"} >
                                    <Row className={"w-100"}>
                                        {pokemon?._resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier > 1 ))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                            console.log(resistance , index)
                                            return <Col xs={6} md={4} key={index} ><h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/>x {resistance.multiplier}</h6></Col>
                                        } )
                                            || pokemon?.resistances?.filter(((resistance:{name:string , multiplier:number}) => resistance?.multiplier > 1 ))?.map((resistance:{name:string , multiplier:number} , index:number) =>{
                                                console.log(resistance , index)
                                                return <Col xs={6} md={4} key={index}><h6 key={index} className={"text-uppercase text-white d-flex align-items-end"}> <Image className={"mx-2"} src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${resistance.name.toLowerCase().replace("é" , "e").replace("è" , "e")}.png`} width={40}/>x {resistance.multiplier}</h6></Col>
                                            } )
                                        }
                                    </Row>

                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col md={6} xs={11} className={"d-flex flex-column"}>
                        <h3 className={"text-white text-center text-uppercase mb-4 mt-3 mt-md-0"}>Information complémentaire</h3>
                        <Row className={"d-flex justify-content-center"}>
                            <Col>
                                <Container className={"text-white d-flex justify-content-center gap-3 px-5"}>
                                    <h5 className={"fw-bold"}>Taille : </h5>
                                    <p className={""}>{pokemon?._height || pokemon?.height }</p>
                                </Container>
                            </Col>
                            <Col>
                                <Container className={"text-white d-flex justify-content-center gap-3 px-5"}>
                                    <h5 className={"fw-bold"}>Poids : </h5>
                                    <p className={""}>{pokemon?._weight || pokemon?.weight}</p>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={"text-white mt-5"}>
                      <Container>
                          <h3 className={"text-center text-uppercase"}> arbre d'évolution</h3>
                          <Container fluid={"sm"} className={"d-flex flex-md-row flex-column justify-content-md-center align-items-center gap-5 mt-5"}>
                              {pokemon?._evolution !== null && pokemon?._evolution?.pre !== null &&
                              pokemon?._evolution?.pre.map((pokemon:{pokedexId:number , name:string , condition:string} , index:number) => {
                                  return  <EvolutionCard  key={index} pokemon={pokemon}/>
                              } )
                                  ||pokemon?.evolution !== null && pokemon?.evolution?.pre !== null &&
                                  pokemon?.evolution?.pre?.map((pokemon:{pokedexId:number , name:string , condition:string} , index:number) => {
                                      return  <EvolutionCard  key={index} pokemon={pokemon}/>
                                  } )
                              }
                              {pokemon?._evolution !== null && pokemon?._evolution?.next !== null &&
                              pokemon?._evolution?.next.map((pokemon:{pokedexId:number , name:string , condition:string} , index:number) => {
                                  return  <EvolutionCard  key={index} pokemon={pokemon}/>
                              }) || pokemon?.evolution !== null && pokemon?.evolution?.next !== null &&
                                  pokemon?.evolution?.next.map((pokemon:{pokedexId:number , name:string , condition:string} , index:number) => {
                                      return  <EvolutionCard  key={index} pokemon={pokemon}/>
                                  })
                              }
                          </Container>
                      </Container>
                </Row>
                <Row className={"pb-5"}>
                    <Container className={"text-white"}>
                        <h3 className={"text-center text-uppercase mt-5"}>Reproduction</h3>
                        <Container fluid={"sm"}>
                            <h6 className={"mb-4"}>Peut se reproduire avec les pokémon : </h6>
                            {pokemon?._eggGroups?.map((egg:string,index:number) => {
                                    return <EggCard key={index} egg={egg}/>
                                }) ||
                                pokemon?.eggGroups?.map((egg:string,index:number) => {
                                    return <EggCard key={index} egg={egg}/>
                                })
                            }
                        </Container>
                    </Container>
                </Row>

            </Container>

        </Container>
    );
}

export default ShowPokemon;