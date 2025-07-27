


export interface IFlieService{
     uploadFile(userId:string,files: Express.Multer.File[]):Promise<{
    statuscode:number,
    message:string,
    success:boolean
  }>
     deleteFile(fileId:string):Promise<{
    statuscode:number,
    message:string,
    success:boolean
  }>
}