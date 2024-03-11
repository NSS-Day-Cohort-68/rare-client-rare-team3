import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService"
import './AllPostsList.css'


export const PostDetails = ({ currentUser }) => {
  
    const [post, setPost] = useState({});
    const { postId } = useParams();

    const navigate = useNavigate()
  
    const getAndSetPosts = () => {
      getPostByPostId(postId).then( (data) => 
      { const postObj = data[0]
        setPost(postObj)}
      );
    }

    useEffect(() => {
      getPostByPostId(postId).then( (data) => 
      { const postObj = data[0]
        setPost(postObj)}
      );
    }, [postId]);
  
    return (
      
      <section>
        <header>{post.title
        }</header>
        <div>
        {post.user.first_name} {post.user.last_name}
        </div>
        <div>
          {post.content}
        </div>

        {currentUser.id === post.user_id ? <button onClick={() => {
          navigate("/editPost")
        }}>Edit Post</button> : ""}

        <div className="btn-container">
        
      
        </div>


      </section>
    );
  };