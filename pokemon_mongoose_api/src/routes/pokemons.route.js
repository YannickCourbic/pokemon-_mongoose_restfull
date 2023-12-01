const express = require("express");
const router = express.Router();
const MongoConnect = require("../data/mongo.connect");
const Generations = require("../models/GenerationModel");
const Pokemon = require("../models/PokemonModel");
const Type = require("../models/TypeModel");
const PokemonServiceImpl = require("../services/PokemonServiceImpl");
const GenerationServiceImpl = require("../services/GenerationServiceImpl");
const TypeServiceImpl = require("../services/TypeServiceImpl");
MongoConnect.run();

router.get("/gens/all" , async(req, res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.getAllPokemonByGeneration().then(result => {
        return res.json({message: "Vous avez récupérée tous les pokémons rangée par générations avec succès.", data: result })
    })
})

router.get("/gen/:gen" , async (req, res) => {
    const pokemonService = new PokemonServiceImpl();
    await Generations.aggregate([
        {
            $match: { gen : parseInt(req.params.gen)}
        },
        {
            $lookup: {
                from : 'pokemons',
                localField: '_id',
                foreignField: 'generationId',
                as: 'pokemons'
            }
        }
    ]).then(result => {
        res.json({message: `vous avez récupérée touts les pokémons de la génération n° ${req.params.gen}.` , data :result[0].pokemons})
    })
})

router.get("/all" ,  (req , res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.getAllPokemon(parseInt(req.query.page), parseInt(req.query.limit), req.query.region, parseInt(req.query.gen), req.query.name, req.query.lang, req.query.id, req.query.type, parseInt(req.query.evolution))
        .then(async (result) => {
            if(req.query.page && req.query.limit){
                const count = await Pokemon.countDocuments();
                const PageMax = Math.ceil(count / req.query.limit);
                if(req.query.page > PageMax){
                    return res.status(404).json({ message: "Un erreur est survenue..." , errors: `la page n° ${req.query.page} est supérieur au maximum de page : ${PageMax} `});
                }
            }
            return res.json({ message: "Vous avez récupérée la liste de  pokémons avec succès." , data: result});
        })
        .catch((error) => {
            if(parseInt(req.query.limit) <= 0){
                return res.status(404).json({message: "Erreur de query : " , error : {data: error.message , msg: `Le paramètre limit : ${req.query.limit} est inférieur à 1, veuillez réssayez avec une limite positive` , reason : error.reason}})
            }
            if(req.query.id !== null && error.name === "CastError"){
                return res.status(404).json({message: "Erreur de query : " , error : {data: error.message , msg: `L'identifiant ${error.value} de la génération n'existe pas , veuillez réessayez avec un identifiant valide.` , reason : error.reason}})
            }
            return res.status(404).json({message: "Erreur de query : " , error : error})
        })
});

router.get("/search/:search" , (req , res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.searchPokemon(req.params.search)
        .then(result => {
        if(result.length === 0){
            return res.status(404).json({message: "Erreur de paramètre : " , errors: "Le paramètre doit être seulement des lettres , veuillez réessayez avec des critères valides."})
        }
        return res.json({message: "Vous avez rechercher une liste de pokémon avec succès." , data: result})
        })
        .catch(error => {
            return res.status(404).json({message: "Erreur de paramètre : " , error : error})
        })
})
router.get("/stats/max", (req , res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.maxStatsPokemon(parseInt(req.query.hp) , parseInt(req.query.atk) , parseInt(req.query.def) , parseInt(req.query.spe_atk) ,parseInt(req.query.spe_def) , parseInt(req.query.vit))
        .then(result => {
        res.json({message: "Vous avez récupérée avec succès la statistique maximale",data:result})
        })
        .catch(error => console.error(error))
})

router.get("/pokemon/id/:id" ,  (req, res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.getPokemonById(req.params.id)
        .then((pokemonData) => {
            //récupérer la génération
            const generationService = new GenerationServiceImpl();
            const typeService = new TypeServiceImpl();
            generationService.generationById(pokemonData.generationId)
                .then(async (generation) => {
                    const types = [];
                    for (const typeId of pokemonData.typeId) {
                        const data = await typeService.getTypebyId(typeId);
                        types.push(data);
                    }
                    return res.json({message: "Vous avez récupérée un pokémon par id avec succès." , data: {pokemon: pokemonData , generation:generation , types: types }});
                })
        })
        .catch(error => {
            return res.status(404).json({message: "Une erreur est survenue ! Veuillez réessayez avec un identifiant valide." , error: error.message , data: error})
        })
})

router.get("/pokemon/pokedex/:id" , (req,res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.getPokemonByPokedexId(parseInt(req.params.id))
        .then((result) => {
            return res.json({message: "Vous avez récupérée un pokémon par id avec succès." , data: result});
        })
        .catch(error => {
            return res.status(404).json({message: "Une erreur est survenue ! Veuillez réessayez avec un identifiant valide." , error: error.message , data: error})
        })
})

router.get("/eggGroups/:egg", (req , res) =>{
    const pokemonService = new PokemonServiceImpl();
    pokemonService.getPokemonByEgg(req.params.egg).then(result => {
        return res.json({message: "Vous avez récupérée un pokémon par groupe d'oeuf avec succès." , data: result});
    })
});
router.post("/create" , (req ,res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.createPokemon(req.body).then(result => {
        res.json({message:"Vous avez crée un pokémon avec succès." , data: result});
    })
});

router.put("/update/:id" , (req, res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.updatePokemon(req.body , req.query.id).then(result => {
        res.json({message:`Vous avez modifiée le pokémon ${req.body.name.fr} avec succès.` , data: result});
    })
});
router.delete("/remove/:id", (req , res) => {
    const pokemonService = new PokemonServiceImpl();
    pokemonService.removePokemon(req.params.id)
        .then((result) => {
        res.json({message:`Vous avez supprimer le pokémon avec succès.` , data: result});
    })
        .catch(error => console.error(error))
});




module.exports = router;