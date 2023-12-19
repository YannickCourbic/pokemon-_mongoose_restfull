import PokemonModel from "./Pokemon.model.ts";



class GenerationModel {
    private _id:string;
    private _gen:number;
    private _region:string;
    private _pokemons:[string] | [PokemonModel];


    constructor(data: GenerationModel) {
        this._id = data?.id;
        this._gen = data?.gen;
        this._region = data?.region;
        this._pokemons = data?.pokemons;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get gen(): number {
        return this._gen;
    }

    set gen(value: number) {
        this._gen = value;
    }

    get region(): string {
        return this._region;
    }

    set region(value: string) {
        this._region = value;
    }

    get pokemons(): [string] | [PokemonModel]  {
        return this._pokemons;
    }

    set pokemons(value: [string] | [PokemonModel]) {
        this._pokemons = value;
    }
}

export default GenerationModel;