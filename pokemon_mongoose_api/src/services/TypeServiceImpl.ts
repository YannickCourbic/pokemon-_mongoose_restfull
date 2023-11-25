import ITypeService from "./ITypeService";

const Type = require("../models/TypeModel");

class TypeServiceImpl implements ITypeService{
    getAllType= async (): Promise<[any, any[]]> => {
        return await Type.find();
    }

    getTypebyId = async (id: string): Promise<any> => {
        return await Type.findById(id);
    }


}

module.exports = TypeServiceImpl;