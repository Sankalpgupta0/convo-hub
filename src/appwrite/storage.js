import envImport from "../envImport";
import { Client, Databases, ID, Query } from "appwrite";

export class DataBaseService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(envImport.appwriteUrl)
        .setProject(envImport.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    //  for users
    async createUserDatabase(userId, userName, userPassword){
        try{
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                userId,
                {
                    name:userName,
                    ID: userId,
                    password: userPassword,
                }
            )
        } catch(error){
            console.log("Appwrite serive :: createUserDatabase :: error", error);
        }
    }

    async getAllUsers(){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
            )
        } catch (error) {
            console.log("Appwrite serive :: getMessages :: error", error);
            return false
        }
    }

    // for messages
    async createMessage(message,userId,userTo){
        try {
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId1,
                ID.unique(),
                {
                    message,
                    userId,
                    userTo
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }


    // async deleteMessage(slug){
    //     try {
    //         await this.databases.deleteDocument(
    //             envImport.appwriteDatabaseId,
    //             envImport.appwriteCollectionId1,
    //             slug
    //         )
    //         return true
    //     } catch (error) {
    //         console.log("Appwrite serive :: deletePost :: error", error);
    //         return false
    //     }
    // }

    // async getMessage(slug){
    //     try {
    //         return await this.databases.getDocument(
    //             envImport.appwriteDatabaseId,
    //             envImport.appwriteCollectionId1,
    //             slug          
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: getMessage :: error", error);
    //         return false
    //     }
    // }

    async getMessages(){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId1,
            )
        } catch (error) {
            console.log("Appwrite serive :: getMessages :: error", error);
            return false
        }
    }
}

const dataBaseService = new DataBaseService()
export default dataBaseService