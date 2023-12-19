
interface TypeModelInterface {
    id:string,
    name:string,
    image:string
}

class TypeModel {
    private _id:string;
    private _name:string;
    private _image:string;

    constructor(data:TypeModelInterface) {
        this._id = data?.id;
        this._name = data?.name;
        this._image = data?.image;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }
}


export default TypeModel;