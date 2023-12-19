import IPokemonService from "./IPokemonService";
import * as mongoose from "mongoose";
const Pokemon = require("../models/PokemonModel");
const Generations = require("../models/GenerationModel");
class PokemonServiceImpl implements IPokemonService{
    getPokemonByEgg = async (egg: string): Promise<any> => {
        return await Pokemon.aggregate(  [{
                $lookup: {
                    from: 'generations',
                    localField: 'generationId',
                    foreignField: '_id',
                    as: 'generation',
                },
            },
            {
                $project:{
                    'generation.pokemons': 0
                }
            },
            {
                $lookup: {
                    from: 'types',
                    localField: 'typeId',
                    foreignField: '_id',
                    as: 'type',
                },
            },
            {
                $match: {
                    eggGroups: {$in: [egg]}
                }
            }]
        );
    }
    getAllPokemon = async (page?: number | null, limit?: number | null, region?: string | null, gen?: number, name?: string, lang?: string, id?: string, type?: string, evolution?: number | null, string?: string | null): Promise<[any, any[]]>  =>{
        const pipeline = [];
        // const errors = [];
        pipeline.push(
            {
                $lookup: {
                    from: 'generations',
                    localField: 'generationId',
                    foreignField: '_id',
                    as: 'generation',
                },
            },
            {
                $project:{
                    'generation.pokemons': 0
                }
            },
            {
                $lookup: {
                    from: 'types',
                    localField: 'typeId',
                    foreignField: '_id',
                    as: 'type',
                },
            },

        );

        if(id !== undefined){
            pipeline.push(   {
                    $match: {generationId : new mongoose.Types.ObjectId(id) }
                });
        }
        if(evolution !== null){
            //pokemon sans évolution
            if(evolution === 0){
                pipeline.push(
                    {$match: {'evolution.pre': null}},
                    {$match: {'evolution.next': null}}
                )
            }
            //pokémon de base
            if(evolution === 1 ){
                pipeline.push(
                    {$match: {'evolution.pre': null}}
                )
            }
            //pokémon de stade 2
            if(evolution === 2){
                pipeline.push(
                    {
                        $match: {
                            'evolution.pre': {$size : 1},
                            'evolution.next': {$size: 1}
                        },
                    },

                )
            }
            //pokémon de stade 3
            if(evolution === 3){
                pipeline.push({
                    $match: {
                        'evolution.pre': {$size:2},
                        'evolution.next': null
                    }
                })
            }
            //pokemon de stade 2 mais qui n'a pas de stade 3
            if(evolution === 4){
                pipeline.push({
                    $match: {
                        'evolution.pre': {$size: 1},
                        'evolution.next': null
                    }
                })
            }


        }
        // @ts-ignore
        if(!isNaN(gen)){
            pipeline.push(
                {$match: {'generation.gen': gen}}
            )
        }
        if( region !== undefined){
            pipeline.push({$match: {'generation.region': region}})
        }
        if(type !== undefined){
            pipeline.push({
                $match: { 'type.name': type }
            })
        }

        // @ts-ignore
        if (!isNaN(page)) {
            // @ts-ignore
            let offset = (page - 1) * limit;
            pipeline.push(
                {
                    $skip: offset,
                }
            );
        }
         // @ts-ignore
        if(!isNaN(limit)){
            pipeline.push({
                $limit : limit
            })

        }
        if(name !== undefined && name !== null){

            if(lang === "fr"){
                pipeline.push( {
                    $match: {"name.fr": name}
                })
            }
            if(lang === "en"){
                pipeline.push( {
                    $match: {"name.en": name}
                })
            }
            if(lang === "jp"){
                pipeline.push( {
                    $match: {"name.jp": name}
                })
            }

        }
        if(string !== undefined){
            pipeline.push({
                $search: {

                }
            })
        }
        return await Pokemon.aggregate(pipeline);
    }

    getAllPokemonByGeneration = async (): Promise<any> => {

           return  await Generations.aggregate([
                {
                    $lookup: {
                        from : 'pokemons',
                        localField: '_id',
                        foreignField: 'generationId',
                        as: 'pokemons'
                    }
                }
            ]);

    }

    getAllPokemonsByIdGeneration = async (gen: number): Promise<any> =>  {
        return await Generations.aggregate([
            {
                $match: { gen : gen}
            },
            {
                $lookup: {
                    from : 'pokemons',
                    localField: '_id',
                    foreignField: 'generationId',
                    as: 'pokemons'
                }
            }
        ])
    }

    searchPokemon = async (name: string | null): Promise<any> => {
        const criteriaSearch = {
            'name.fr': { $regex: name, $options: 'i' },
        };

        return await Pokemon.aggregate([
            {
                $match: criteriaSearch,
            },
            {
                $lookup: {
                    from: 'generations',
                    localField: 'generationId',
                    foreignField: '_id',
                    as: 'generation',
                },
            },
            {
                $lookup: {
                    from: 'types',
                    localField: 'typeId',
                    foreignField: '_id',
                    as: 'type',
                },
            },
            {
                $limit: 10,
            },
        ]);
    };


    maxStatsPokemon = async(hp?: number | null, atk?: number | null, def?: number | null, speAtk?: number | null, speDef?: number | null, vit?: number | null): Promise<any> => {
        if(hp === 1){
            return await Pokemon.findOne().sort({'stats.hp': -1});
        }
        if(atk === 1){
            return await Pokemon.findOne().sort({'stats.atk': -1});
        }
        if(def === 1){
            return await Pokemon.findOne().sort({'stats.def': -1});
        }
        if(speAtk === 1){
            return await Pokemon.findOne().sort({'stats.spe_atk': -1});
        }
        if(speDef === 1){
            return await Pokemon.findOne().sort({'stats.spe_def': -1});
        }
        if(vit === 1){
            return await Pokemon.findOne().sort({'stats.vit': -1});
        }

    }

    getPokemonById = async(id: string): Promise<any> => {
        return await Pokemon.findById(id);
    }

    getPokemonByPokedexId = async(id: number): Promise<any> => {
        return await Pokemon.find({pokedexId: id});
    }

    createPokemon = async (pokemon: object): Promise<any>=> {
        const newPokemon = new Pokemon(pokemon)
        return await newPokemon.save();
    }
    updatePokemon = async (pokemon: object , id:string): Promise<any> => {
        return await Pokemon.updateOne({_id : id} , pokemon)
    }

    removePokemon= async (id: string): Promise<any>  =>{
        return await Pokemon.deleteOne({_id : id});
    }





}

module.exports = PokemonServiceImpl;