import IGenerationService from "./IGenerationService";
 const Generation = require("../models/GenerationModel");
// const MongoConnect = require("../data/mongo.connect");
  class GenerationServiceImpl implements IGenerationService{
    constructor() {
    }

      generationById = async(id: string): Promise<any> => {
         return await Generation.findById(id);
      }
     generationExistByGen =  async (gen: number): Promise<boolean> => {
        return await Generation.findOne({gen : gen}) === null ? false : true;
    }

      generationExistByRegion = async(region: string): Promise<boolean> => {
        return await Generation.findOne({region: region}) === null ? false : true;
      }

      createGeneration = (generation: { gen: number; region: string }): Promise<any> =>{
            const newGeneration = new Generation({
                gen : generation.gen,
                region: generation.region
            });
          return newGeneration.save();
      }

      updateGeneration = async(generation:any ,id:string): Promise<any> =>{
            return await Generation.updateOne({_id : id} , generation)
      }

      removeGeneration = async (id: string): Promise<any> => {
            return await Generation.deleteOne({_id : id});
      }

}

module.exports =GenerationServiceImpl;

