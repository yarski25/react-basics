import axios from "axios";
import { IPostItem } from "../types/interfaces/PostItem";
import { IPostComments } from "../types/interfaces/PostComments";

export default class PostService{
    static async getAll(limit: number = 10, page: number = 1){
        const response = await axios.get<IPostItem[]>('https://jsonplaceholder.typicode.com/posts',{
            params: {
                _limit: limit,
                _page: page
            }
        });
        return response;
    }

    static async getById(id: number){
        const response = await axios.get<IPostItem>('https://jsonplaceholder.typicode.com/posts/' + id);
        
        return response;
    }

    static async getCommentsByPostId(id: number){
        const response = await axios.get<IPostComments[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

        return response;
    }
}