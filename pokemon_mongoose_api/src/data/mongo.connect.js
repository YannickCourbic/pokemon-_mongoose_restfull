require("dotenv").config()
const mongoose = require("mongoose")
class MongoConnect  {

    static connection = null;

    static async run (){
        try {
            this.connection = await mongoose.connect(process.env.DATABASE_ENV, {
                socketTimeoutMS:1000,
                dbName: process.env.DBNAME_ENV
            })
            console.log("Vous êtes connecté avec succès!");

        }catch (error){
            console.error("Une erreur est survenue lors de la connexion : ", error);
        }
    }

    static  async  closeRunConnection(){
        try {
            if(this.connection){
                await this.connection.close();
                console.log("Connexion fermée avec succès ! ")
            }

        }catch (error){
            console.error("Une erreur est survenue lors de la fermeture de la connexion : ", error);
        }
    }
}


module.exports = MongoConnect;