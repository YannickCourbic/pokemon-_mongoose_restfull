const Generation = require("../models/GenerationModel")
const MongoConnect = require("../data/mongo.connect");
const Type = require("../models/TypeModel");
const axios = require("axios");
const Pokemon = require("../models/PokemonModel");
const GenerationServiceImpl = require("../services/GenerationServiceImpl");
class TestApplication {
    static generationServiceImpl = new GenerationServiceImpl();




    static async getCreateGeneration(gen, region){
        await Generation.create({
            gen: gen,
            region: region
        });
    }

    static  getCreateType(name , type , mongoose){
        try {
            MongoConnect.run().then(async () => {
                console.log("création de type");
                await Type.create({
                    name: name,
                    image: `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${type}.png`
                })
            })
        }catch (err){
            MongoConnect.run().catch(err => console.log(err));
        }
    }

    static createPokemon(gen) {
        axios.get(`https://tyradex.vercel.app/api/v1/gen/${gen}`, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.data)
            .then(async (pokemonList) => {
                await MongoConnect.run();

                const genId = await Generation.findOne({ gen: gen });

                for (const pokemon of pokemonList) {
                    console.log(pokemon)
                    let types = [];
                    for (const type of pokemon?.types || []) {
                        const typeFind = await Type.findOne({ name: type.name });
                        types.push(typeFind.id);
                    }
                    const formes = pokemon?.forme  ? pokemon?.forme : null;
                    const sexe = {
                        male: pokemon?.sexe && pokemon.sexe.male ? pokemon.sexe.male : null,
                        female: pokemon?.sexe && pokemon.sexe.female ? pokemon.sexe.female : null
                    };
                    const evolution = pokemon?.evolution || {
                        pre: null,
                        next: null,
                        mega: null
                    };
                    await Pokemon.create({
                        pokedexId: pokemon?.pokedexId,
                        generationId: genId.id,
                        category: pokemon?.category,
                        name: {
                            fr: pokemon?.name.fr,
                            en: pokemon?.name.en,
                            jp: pokemon?.name.jp
                        },
                        sprites: {
                            regular: pokemon?.sprites.regular,
                            shiny: pokemon?.sprites.shiny ? pokemon?.sprites.shiny : null,
                            gmax: pokemon?.gmax ? {
                                regular: pokemon.gmax.regular,
                                shiny: pokemon.gmax.shiny
                            } : null
                        },
                        typeId: types,
                        talents : pokemon?.talents,
                        stats: {
                            hp: pokemon?.stats.hp,
                            atk: pokemon?.stats.atk,
                            def: pokemon?.stats.def,
                            spe_atk: pokemon?.stats.spe_atk,
                            spe_def: pokemon?.stats.spe_def,
                            vit: pokemon?.stats.vit
                        },
                        resistances: pokemon?.resistances,
                        evolution: evolution,
                        height: pokemon?.height,
                        weight: pokemon?.weight,
                        eggGroups: pokemon['egg_groups'] || null,
                        sexe: sexe,
                        catchRate: pokemon['catch_rate'],
                        level100: pokemon["level_100"],
                        forme: formes
                    });
                    types = [];
                }

            })
            .catch(error => console.error("Erreur lors de la création du Pokémon:", error));
    }

    static TestFindAllGeneration() {
        MongoConnect.run().then(async () => {
            try {
                let generation = await Generation.findOne({ gen: 9 });
                let pokemons = await Pokemon.find({ generationId: generation.id })
                // console.log(pokemons[0])
                await Generation.findOneAndUpdate({gen: 9} , {pokemons : pokemons})

            } catch (error) {
                console.error(error);
            }
        });
    }


}

module.exports = TestApplication