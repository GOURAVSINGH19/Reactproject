import { Container } from "postcss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../Component";


function Edit(){
    const[post,setposts]=useState(null);
    const [slug]=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setposts(post);
                }
            })
        }else{
            navigate('/');
        }
    },[slug,navigate])
    return(
     post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}></PostForm>
            </Container>
        </div>
     ):null
    )
}
export default Edit