const express = require("express");
const router = express.Router();
const MongoConnect = require("../data/mongo.connect");
const Generations = require("../models/TypeModel");
const TypeServiceImpl = require("../services/TypeServiceImpl")
MongoConnect.run();

router.get('/all' , async(req,res) => {
    const typeService = new TypeServiceImpl();
    typeService.getAllType()
        .then(result => {
        return res.json({message: "Vous avez récupérée la totalité des types existantes" , data:result});
    })
        .catch(error => {
            return res.status(404).json({message: "Une erreur est survenu..." , error: error});
        })
})

router.get("/:id", (req, res) => {
  const typeService = new TypeServiceImpl();
  typeService.getTypebyId(req.params.id).then(result => {
      return res.json({message:"Vous avez récupérée un type avec succès." , data: result});
  })
      .catch(error => {
          return res.status(404).json({message: "Une erreur est survenu..." , error: error});
      })
})


module.exports = router;