import { toast } from "react-toastify";
import conf from "../conf/conf";

import {Client,ID,Databases,Storage,Query} from 'appwrite';

export class Service{
    Client=new Client();
    Databases;
    Bucket;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.Databases=new Databases(this.Client);
        this.Bucket=new Storage(this.Client);
    }

    async createpost({title,slug,content,featuredimg,status,userid}){
        try{
           return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredimg,
                    status,
                    userid
                },
                toast.success("post created")
                )
        }catch(error){
            console.log("error",error);
            toast.error("error found in creating post")
        }
    }

    async updatepost(slug,{title,content,featuredimg,status}){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredimg,
                    status
                },
                toast.success("post update")
                )
        }
        catch(error){
            console.log("error",error);
            toast.error("error found in updating post")

        }
    }
    async deletepost(slug){
        try{
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
                )
                toast.success("Delete Successfully");
        }
        catch(error){
            console.log("error",error);
            toast.error("error found in deleting post")
        }
    }

    async getpost(slug){
        try{
            return await this.Databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
            )
        }catch(error){
            console.log("error",error);
            toast.error("No document found")
        }
    }

    async getposts(queries =[Query.equal("status","active")]){
        try{
           return await this.Databases.listDocuments(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                queries,
            )
        }catch(error){
            console.log("error",error);
        }
    }


    //upload file 

    async fileupload(file){
        try{
            return await this.Bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                ),
                toast.success("Flie Upload")
        }
        catch(error){
            console.log("error",error);
            toast.error("error");
        }
    }

    async deletefile(fileiId){
        try{
            return await this.Bucket.deleteFile(
                conf.appwriteBucketId,
                fileiId,
                ),
                toast.success("File deleted")
        }
        catch(error){
            console.log("error");
            toast.error("Not deleted");
        }
    }

    getfilepreview(fileiId){
        return this.Bucket.getFilePreview(
            conf.appwriteBucketId,
            fileiId
        )
    }


}
