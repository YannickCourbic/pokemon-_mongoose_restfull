const {Schema, model} = require( "mongoose");

const Generation = new Schema({
    gen: {
        type: Number,
        unique: true,
        required: [true , "le champs gen ne doit pas être null ou vide"],
    },
    region:{
        type:String,
        unique: [true , "la génération doit un nom de région unique , veuillez lui donner un nom unique , et qui n'appartient pas à une génération existante"],
        required:[true , "le champs region ne doit pas être null ou vide"],
        minLength:[2 , "la region doit avoir 2 caractères minimum."],
    },
    pokemons: [{type: Schema.Types.ObjectId, ref: 'Pokemon'}],

})
module.exports = model('Generation' , Generation);