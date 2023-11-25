const express = require("express");
const router = express.Router();
const MongoConnect = require("../data/mongo.connect");
const Generations = require("../models/GenerationModel");
const Pokemon = require("../models/PokemonModel");
const GenerationServiceImpl = require("../services/GenerationServiceImpl");
MongoConnect.run();
router.get("/all" , async (req , res) => {
    try {
        return res.json({data: await Generations.find({}) , message: "Vous avez récupérée avec succès la liste de générations", status: 200});
    }catch (error){
        return res.status(500).json({error: 'Une Erreur est survenu...', data: error})
    }
})

router.get("/pokemons/:id" , async(req , res ) => {
    try{
        const pokemonArr = [];
        const generation = await Generations.findOne({gen : req.params.id})
        if(generation === null){
            return  res.status(404).json({message: `la gen n° ${req.params.id} n'existe pas , veuillez réessayez avec un numéro de génération valide`})
        }
        for (const id of generation.pokemons) {
            const pokemon = await Pokemon.findById(id);
            pokemonArr.push(pokemon);
        }
        return res.json({data: pokemonArr , message: `Vous avez  récupérer la liste de pokémon de la génération ${req.params.id}`, status:200})
    }catch (error){
        return res.status(500).json({error: 'Une Erreur est survenu...' , data: error})

    }
})

router.get("/:id" , async (req , res) => {
    const generation = await Generations.findOne({gen: req.params.id});
    try {
        if(generation === null){
            return  res.status(404).json({message: `la gen n° ${req.params.id} n'existe pas , veuillez réessayez avec un numéro de génération valide`})
        }
        return res.json({data: generation , message: `Vous avez récupérer la génération n°${req.params.id} avec succès!`});
    }
    catch (error){
        return res.status(500).json({error: 'Une Erreur est survenu...' , data: error})
    }

})

router.get("/name/:name" , async(req , res) => {
    const generation = await Generations.findOne({region: req.params.name});
    try {
        if(generation === null){q
            return  res.status(404).json({message: `le nom (${req.params.name}) de la région n'existe pas , veuillez réssayez avec un nom de région valide!`});
        }
        return res.json({data: generation , message: `Vous avez récupérer la génération de ${req.params.name} avec succès!`});
    }catch (error){
        return res.status(500).json({error: 'Une Erreur est survenu...' , data: error})
    }
})

router.get("/query/q",  async (req , res) => {
    // if(req.query.name !== ""){
    //     return res.status(200).json({ message: req.query.name });
    //
    // }
    if(req.query.all !== "" && parseInt(req.query.all) === 1){
        console.log(req.query.all);
        if(req.query.limit !== ""){
            const generations = await Generations.find({}).limit(parseInt(req.query.limit));
            return res.status(200).json({ message: "vous avez récupérée avec succès la totalité des génération" , data:generations});
        }
        const generations = await Generations.find({});
        return res.status(200).json({ message: "vous avez récupérée avec succès la totalité des génération" , data: generations});
    }
    if(req.query.page !== "" && parseInt(req.query.page) >= 1 && req.query.limit !== "" && parseInt(req.query.limit) > 1){
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let offset = (page - 1) * limit;
        const generations = await Generations.find().skip(offset).limit(limit);
        return res.status(200).json({ message: `La pagination page n° ${page} a été récupérée avec succès !` , data: generations });
    }
    return res.status(200).json({ message: "Le paramètre 'name' est vide ou non défini." });
})

router.post("/create" , async(req , res) => {
    // const create = await Generations.create(req.body)
    const generationService  = new GenerationServiceImpl();
    generationService.createGeneration(req.body.generation)
        .then(result => {
            return res.json({message: `Vous avez crée la génération n° ${req.body.generation.gen} avec succès !` , data: result})
        })
        .catch(({keyPattern , message} )=> {
            let  customError = null;
            if(keyPattern.gen)  customError = "Le champ gen existe déjà.";
            if(keyPattern.region)  customError  ="le champ region existe déjà";
            if(!Number.isInteger(req.body.generation.gen)) {
                return res.status(404).json({errors : "le champ gen ne peut contenir que des chiffres" , message: "Une erreur est survenue..." });
            }
            if(!(/^[a-zA-Z]+$/.test(req.body.generation.region))){
                return res.status(404).json({errors : "le champ region ne peut contenir que des lettres" , message: "Une erreur est survenue..." });
            }
            return res.status(404).json({errors :[ customError , message] , message: "Une erreur est survenue..." });
        })
})

router.put("/update/:id" , async(req, res) => {
    if(req.params.id !== null){
        const generationService  = new GenerationServiceImpl();
        try {
            await generationService.updateGeneration(req.body , req.params.id)
                .then((result) => {
                    console.log(result)
                    if(result.modifiedCount === 0) return res.status(404).json({message : "Aucune génération à modifier , l'id ne correspond pas à une génération existante."})
                    return res.json({message: `La génération n° ${req.params.id} a été modifiée avec succès.`});
                })
                .catch((error) => {
                    return res.status(404).json({error : "le champ gen ou région existe " , message: "Une erreur est survenue..." , data : error.message});
                })
        }catch (error){
            return res.status(500).json({error : error});
        }

    }
})

router.delete("/delete/:id" , async(req, res) => {
    if(req.params.id){
        const generationService = new GenerationServiceImpl();
        try {
            await generationService.removeGeneration(req.params.id).then((result) => {
                console.log(result)
                if (result.deletedCount > 0) {
                    console.log('Document supprimé avec succès.');
                    return res.status(200).json({message: "Génération supprimée avec succès."})
                } else {
                    console.log('Aucun document trouvé avec cet ID.');
                    return res.status(404).json({message: "Aucune génération à supprimer avec cette ID."})
                }
            })}
        catch (error){
                return res.status(500).json({error : error});
        }
    }
})

module.exports = router;