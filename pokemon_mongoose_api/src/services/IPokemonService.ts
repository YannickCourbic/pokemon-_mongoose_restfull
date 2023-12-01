export default interface IPokemonService {
    getAllPokemon(page?: number | null,
                  limit?: number | null,
                  region?: string | null,
                  gen?: number | null,
                  name?: string,
                  lang?: string,
                  id?: string,
                  type?: string,
                  evolution?: number | null,
                  string?: string | null
    ):Promise<[any, any[]]>
    getAllPokemonByGeneration():Promise<any>
    getAllPokemonsByIdGeneration(gen:number):Promise<any>
    searchPokemon(name:string|null, lang?:string|null):Promise<any>
    maxStatsPokemon(hp?:number|null ,
                    atk?:number|null ,
                    def?:number|null ,
                    speAtk?:number|null ,
                    speDef?:number|null ,
                    vit?:number|null):Promise<any>
    getPokemonById(id:string):Promise<any>
    getPokemonByPokedexId(id:number):Promise<any>
    createPokemon(pokemon:object):Promise<any>
    updatePokemon(pokemon:object , id:string):Promise<any>
    removePokemon(id:string):Promise<any>
    getPokemonByEgg(egg:string):Promise<any>
}

