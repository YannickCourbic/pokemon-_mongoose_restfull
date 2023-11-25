
export default interface ITypeService {
    getAllType():Promise<[any , any[]]>
    getTypebyId(id:string):Promise<any>
}