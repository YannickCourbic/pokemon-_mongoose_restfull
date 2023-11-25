const {Schema , model} = require ("mongoose");

const Type = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        set: function (value){
            return this.name = value;
        }
    },
    image:{
        type:String,
        unique:true,
        required: true,
        set: function (value) {
            return this.image = value;

        }
    }
})
module.exports = model("Type" , Type);