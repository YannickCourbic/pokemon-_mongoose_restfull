import TypeModel from "./Type.model.ts";

// interface PokemonModelInterface {
//     id:string;
//     pokedexId:number;
//     generationId:string,
//     category:string,
//     name:{
//        fr:string;
//        en:string;
//        jp:string;
//     };
//     sprites:{
//         regular:string;
//         shiny?:string | null;
//         gmax?:{regular?:string, shiny?:string} | null;
//     };
//     typeId: [string];
//     talents?: [{name:string , tc:boolean}];
//     stats:{
//         hp:number;
//         atk:number;
//         def:number;
//         spe_atk:number;
//         spe_def:number;
//         vit:number;
//     };
//     resistances: [{name:string , multiplier:number}] | null;
//     evolution?: {
//         pre?: [{pokedexId:number , name:string , condition:string}] | null;
//         next?: [{pokedexId:number , name:string , condition:string}] | null;
//         mega?: [{orbe:string , sprites :[{regular:string , shiny:string}]}] | null;
//     } | null;
//     height:string;
//     weight:string;
//     sexe?:{
//         male?:number |null;
//         female?:number | null;
//     } | null;
//     eggGroups?:[string] | null;
//     catchRate?:number;
//     level100?:number;
//     forme?: [] | null;
//     generation?: [{id:string | undefined, gen:number | undefined , region:string | undefined}];
//     type?:[{id:string | undefined | null  , name:string | undefined | null , image:string | undefined | null }] | [TypeModel]
// }



class PokemonModel{
    private _id:string
    private _pokedexId: number;
    private _generationId: string;
    private _category: string;
    private _name: {
        fr: string;
        en: string;
        jp: string;
    };
    private _sprites: {
        regular: string;
        shiny?: string | null;
        gmax?: { regular?: string; shiny?: string } | null;
    };
    private _typeId: [string] | undefined;
    private _talents?: [{ name: string; tc: boolean }] | undefined;
    private _stats: {
        hp: number;
        atk: number;
        def: number;
        spe_atk: number;
        spe_def: number;
        vit: number;
    };
    private _resistances: [{ name: string; multiplier: number }] | null;
    private _evolution?: {
        pre?: [{ pokedexId: number; name: string; condition: string }] | null;
        next?: [{ pokedexId: number; name: string; condition: string }] | null;
        mega?: [{ orbe: string; sprites: [{ regular: string; shiny: string }] }] | null;
    } | null;
    private _height: string;
    private _weight: string;
    private _sexe?: {
        male?: number | null;
        female?: number | null;
    } | null;
    private _eggGroups?: [string] | null;
    private _catchRate?: number;
    private _level100?: number;
    private _forme?: [] | null;
    private _generation?: [{ id: string | undefined; gen: number | undefined; region: string | undefined}];
    private _type?: [{ id: string | undefined | null ; name: string | undefined | null ; image: string | undefined | null }] | [TypeModel];

    constructor(pokemon:PokemonModel )  {
        this._id = pokemon?.id;
        this._pokedexId = pokemon?.pokedexId;
        this._generationId = pokemon?.generationId;
        this._category = pokemon?.category;
        this._name = pokemon?.name;
        this._sprites = pokemon?.sprites;
        this._typeId = pokemon?.typeId;
        this._talents = pokemon?.talents;
        this._stats = pokemon?.stats;
        this._resistances = pokemon?.resistances;
        this._evolution = pokemon?.evolution;
        this._height = pokemon?.height;
        this._weight = pokemon?.weight;
        this._sexe = pokemon?.sexe;
        this._eggGroups = pokemon?.eggGroups;
        this._catchRate = pokemon?.catchRate;
        this._level100 = pokemon?.level100;
        this._forme = pokemon?.forme;
        this._generation = pokemon?.generation;
        this._type = pokemon?.type;
    }

    
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get pokedexId(): number {
        return this._pokedexId;
    }

    set pokedexId(value: number) {
        this._pokedexId = value;
    }

    get generationId(): string {
        return this._generationId;
    }

    set generationId(value: string) {
        this._generationId = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get name(): { fr: string; en: string; jp: string } {
        return this._name;
    }

    set name(value: { fr: string; en: string; jp: string }) {
        this._name = value;
    }

    get sprites(): { regular: string; shiny?: string | null; gmax?: { regular?: string; shiny?: string } | null } {
        return this._sprites;
    }

    set sprites(value: { regular: string; shiny?: string | null; gmax?: { regular?: string; shiny?: string } | null }) {
        this._sprites = value;
    }

    get typeId(): [string] | undefined {
        return this._typeId;
    }

    set typeId(value: [string] | undefined) {
        this._typeId = value;
    }

    get talents(): [{ name: string; tc: boolean }] | undefined {
        return this._talents;
    }

    set talents(value: [{ name: string; tc: boolean }] | undefined) {
        this._talents = value;
    }

    get stats(): { hp: number; atk: number; def: number; spe_atk: number; spe_def: number; vit: number } {
        return this._stats;
    }

    set stats(value: { hp: number; atk: number; def: number; spe_atk: number; spe_def: number; vit: number }) {
        this._stats = value;
    }

    get resistances(): [{ name: string; multiplier: number }] | null {
        return this._resistances;
    }

    set resistances(value: [{ name: string; multiplier: number }] | null) {
        this._resistances = value;
    }

    get evolution(): { pre?: [{ pokedexId: number; name: string; condition: string }] | null; next?: [{ pokedexId: number; name: string; condition: string }] | null; mega?: [{ orbe: string; sprites: [{ regular: string; shiny: string }] }] | null } | null {
        return <{ pre?: [{ pokedexId: number; name: string; condition: string }] | null; next?: [{ pokedexId: number; name: string; condition: string }] | null; mega?: [{ orbe: string; sprites: [{ regular: string; shiny: string }] }] | null } | null>this._evolution;
    }

    set evolution(value: { pre?: [{ pokedexId: number; name: string; condition: string }] | null; next?: [{ pokedexId: number; name: string; condition: string }] | null; mega?: [{ orbe: string; sprites: [{ regular: string; shiny: string }] }] | null } | null) {
        this._evolution = value;
    }

    get height(): string {
        return this._height;
    }

    set height(value: string) {
        this._height = value;
    }

    get weight(): string {
        return this._weight;
    }

    set weight(value: string) {
        this._weight = value;
    }

    get sexe(): { male?: number | null; female?: number | null } | null {
        return <{ male?: number | null; female?: number | null } | null>this._sexe;
    }

    set sexe(value: { male?: number | null; female?: number | null } | null) {
        this._sexe = value;
    }

    get eggGroups(): [string] | null {
        return <[string]>this._eggGroups;
    }

    set eggGroups(value: [string] | null) {
        this._eggGroups = value;
    }

    get catchRate(): number {
        return <number>this._catchRate;
    }

    set catchRate(value: number) {
        this._catchRate = value;
    }

    get level100(): number {
        return <number>this._level100;
    }

    set level100(value: number) {
        this._level100 = value;
    }

    get forme(): [] | null  {
        return <[]>this._forme;
    }

    set forme(value: [] | null) {
        this._forme = value;
    }

    get generation(): [{ id: string | undefined; gen: number | undefined; region: string | undefined }]  {
        return <[{ id: string | undefined; gen: number | undefined; region: string | undefined }]>this._generation;
    }

    set generation(value: [{ id: string | undefined; gen: number | undefined; region: string | undefined}]) {
        this._generation = value;
    }

    get type(): [{ id: string | undefined | null; name: string | undefined | null; image: string | undefined | null }] | [TypeModel]  {
        return <[{ id: string | undefined | null; name: string | undefined | null; image: string | undefined | null }] | [TypeModel]>this._type;
    }

    set type(value: [{ id: string | undefined | null; name: string | undefined | null; image: string | undefined | null }] | [TypeModel]) {
        this._type = value;
    }
}
export default PokemonModel;
