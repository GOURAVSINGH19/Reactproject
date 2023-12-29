import React,{useState,useEffect} from "react";
import appwriteService from '../appwrite/config'
import { Container } from "postcss";
import { PostCard } from "../Component";

function AllPosts(){
    const[post,setpost]=useState();
    useEffect(()=>{},[]);
        appwriteService.getPosts([]).then((posts)=>{
           if(posts){
            setpost(posts.documents);
           }
    })
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post)=>{
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard post={post}/>
                            </div>
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts