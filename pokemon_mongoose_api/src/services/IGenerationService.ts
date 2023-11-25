
export default interface  IGenerationService {
    generationExistByGen (gen:number):Promise<boolean>;
    generationExistByRegion (name:string): Promise<boolean>;
    createGeneration(generation: {gen:number, region:string}):Promise<any>;
    updateGeneration(generation : any , id:string):Promise<any>
    removeGeneration(id:string) :Promise<any>;
    generationById(id:string): Promise<any>;
}

