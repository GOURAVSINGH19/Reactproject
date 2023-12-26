import conf from "../conf/conf";

import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client = new Client();
    account;
      constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account=new Account(this.client);
      }

      async  createAccount({email,password,name}){
        try{
           const useraccount= await this.account.create(ID.unique(),email,password,name);
           if(useraccount){
            //call  another method
            return this.login({email,password});
           }
           else{
            return useraccount;
           }
        }catch(error){
            console.log("error",error);
        }
      }
      async  getCurrentUser(){
        try{
           return await this.account.get();
        }catch(error){
            console.log("error",error);
        }
        return null;
      }

      async  deletesession(){
        try{
           return await this.account.deleteSessions();
        }catch(error){
            console.log("error",error);
        }
      }

      
}

const authservice=new AuthService();

export default authservice