"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Type = require("../models/TypeModel");
var Pokemon = require("../models/PokemonModel");
var Generations = require("../models/GenerationModel");
var PokemonServiceImpl = /** @class */ (function () {
    function PokemonServiceImpl() {
        var _this = this;
        this.getPokemonByEgg = function (egg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Pokemon.aggregate([{
                                $lookup: {
                                    from: 'generations',
                                    localField: 'generationId',
                                    foreignField: '_id',
                                    as: 'generation',
                                },
                            },
                            {
                                $project: {
                                    'generation.pokemons': 0
                                }
                            },
                            {
                                $lookup: {
                                    from: 'types',
                                    localField: 'typeId',
                                    foreignField: '_id',
                                    as: 'type',
                                },
                            },
                            {
                                $match: {
                                    eggGroups: { $in: [egg] }
                                }
                            }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getAllPokemon = function (page, limit, region, gen, name, lang, id, type, evolution, string) { return __awaiter(_this, void 0, void 0, function () {
            var pipeline, errors, offset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pipeline = [];
                        errors = [];
                        pipeline.push({
                            $lookup: {
                                from: 'generations',
                                localField: 'generationId',
                                foreignField: '_id',
                                as: 'generation',
                            },
                        }, {
                            $project: {
                                'generation.pokemons': 0
                            }
                        }, {
                            $lookup: {
                                from: 'types',
                                localField: 'typeId',
                                foreignField: '_id',
                                as: 'type',
                            },
                        });
                        if (id !== undefined) {
                            pipeline.push({
                                $match: { generationId: new mongoose.Types.ObjectId(id) }
                            });
                        }
                        if (evolution !== null) {
                            //pokemon sans évolution
                            if (evolution === 0) {
                                pipeline.push({ $match: { 'evolution.pre': null } }, { $match: { 'evolution.next': null } });
                            }
                            //pokémon de base
                            if (evolution === 1) {
                                pipeline.push({ $match: { 'evolution.pre': null } });
                            }
                            //pokémon de stade 2
                            if (evolution === 2) {
                                pipeline.push({
                                    $match: {
                                        'evolution.pre': { $size: 1 },
                                        'evolution.next': { $size: 1 }
                                    },
                                });
                            }
                            //pokémon de stade 3
                            if (evolution === 3) {
                                pipeline.push({
                                    $match: {
                                        'evolution.pre': { $size: 2 },
                                        'evolution.next': null
                                    }
                                });
                            }
                            //pokemon de stade 2 mais qui n'a pas de stade 3
                            if (evolution === 4) {
                                pipeline.push({
                                    $match: {
                                        'evolution.pre': { $size: 1 },
                                        'evolution.next': null
                                    }
                                });
                            }
                        }
                        if (!isNaN(gen)) {
                            pipeline.push({ $match: { 'generation.gen': gen } });
                        }
                        if (region !== undefined) {
                            pipeline.push({ $match: { 'generation.region': region } });
                        }
                        if (type !== undefined) {
                            pipeline.push({
                                $match: { 'type.name': type }
                            });
                        }
                        if (!isNaN(page)) {
                            offset = (page - 1) * limit;
                            pipeline.push({
                                $skip: offset,
                            });
                        }
                        if (!isNaN(limit)) {
                            pipeline.push({
                                $limit: limit
                            });
                        }
                        if (name !== undefined && name !== null) {
                            if (lang === "fr") {
                                pipeline.push({
                                    $match: { "name.fr": name }
                                });
                            }
                            if (lang === "en") {
                                pipeline.push({
                                    $match: { "name.en": name }
                                });
                            }
                            if (lang === "jp") {
                                pipeline.push({
                                    $match: { "name.jp": name }
                                });
                            }
                        }
                        if (string !== undefined) {
                            pipeline.push({
                                $search: {}
                            });
                        }
                        return [4 /*yield*/, Pokemon.aggregate(pipeline)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getAllPokemonByGeneration = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Generations.aggregate([
                            {
                                $lookup: {
                                    from: 'pokemons',
                                    localField: '_id',
                                    foreignField: 'generationId',
                                    as: 'pokemons'
                                }
                            }
                        ])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getAllPokemonsByIdGeneration = function (gen) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Generations.aggregate([
                            {
                                $match: { gen: gen }
                            },
                            {
                                $lookup: {
                                    from: 'pokemons',
                                    localField: '_id',
                                    foreignField: 'generationId',
                                    as: 'pokemons'
                                }
                            }
                        ])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.searchPokemon = function (name, lang) { return __awaiter(_this, void 0, void 0, function () {
            var criteriaSearch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteriaSearch = {
                            'name.fr': { $regex: name, $options: 'i' }
                        };
                        return [4 /*yield*/, Pokemon.find(criteriaSearch).limit(10)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.maxStatsPokemon = function (hp, atk, def, speAtk, speDef, vit) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(hp === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.hp': -1 })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(atk === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.atk': -1 })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (!(def === 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.def': -1 })];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        if (!(speAtk === 1)) return [3 /*break*/, 8];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.spe_atk': -1 })];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        if (!(speDef === 1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.spe_def': -1 })];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10:
                        if (!(vit === 1)) return [3 /*break*/, 12];
                        return [4 /*yield*/, Pokemon.findOne().sort({ 'stats.vit': -1 })];
                    case 11: return [2 /*return*/, _a.sent()];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.getPokemonById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Pokemon.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getPokemonByPokedexId = function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Pokemon.find({ pokedexId: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.createPokemon = function (pokemon) { return __awaiter(_this, void 0, void 0, function () {
            var newPokemon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPokemon = new Pokemon(pokemon);
                        return [4 /*yield*/, newPokemon.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.updatePokemon = function (pokemon, id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Pokemon.updateOne({ _id: id }, pokemon)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removePokemon = function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Pokemon.deleteOne({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    return PokemonServiceImpl;
}());
module.exports = PokemonServiceImpl;
