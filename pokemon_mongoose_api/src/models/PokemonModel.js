const {model , Schema} = require("mongoose");
const Generation = require("./GenerationModel");
const Pokemon = new Schema({
    pokedexId: {
        type:Number,
        unique: false,
        required:[true, "le champ pokedexId ne peut être vide ou null"],
    },
    generationId:{
        type: Schema.Types.ObjectId,
        ref: "Generation",
    },
    category:{
        type:String,
        required:true
    },
    name:{
        fr:{
            type:String,
            required:true
        },
        en:{
            type:String,
            required:true
        },
        jp:{
            type:String,
            required:true
        }
    },
    sprites:{
        regular:{
            type:String,
            required:true
        },
        shiny:{
            type:String,
            required:false
        },
        gmax:{
            regular: {
                type:String,
                required: false
            },
            shiny:{
                type:String,
                required:false
            }
        }
    },
    typeId:[{type: Schema.Types.ObjectId, ref:'Type'}],
    talents :{
        type: Array,
        required:false
    },
    stats:{
        hp:{
            type:Number,
            required:true
        },
        atk:{
            type:Number,
            required:true
        },
        def:{
            type:Number,
            required:true
        },
        spe_atk:{
            type:Number,
            required:true
        },
        spe_def:{
            type:Number,
            required:true
        },
        vit:{
            type:Number,
            required:true
        }
    },
    resistances :{
        type:Array,
        required:true
    },
    evolution:{
        pre:{
            type:Array,
            required:false
        },
        next:{
            type:Array,
            required:false
        },
        mega :{
            type:Array,
            required:false
        }
    },
    height:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    eggGroups:{
        type:Array,
        required:false
    },
    sexe:{
        male:{
            type:Number,
            required:false
        },
        female:{
            type:Number,
            required:false
        }
    },
    catchRate:{
        type:Number,
        required:false
    },
    level100:{
        type:Number,
        required:false
    },
    forme : {
        type:Array,
        required:false
    }
})

module.exports = model("Pokemon" , Pokemon);