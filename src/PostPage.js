import React from 'react'
import { useParams, Link } from 'react-router-dom';

const PostPage = ({post, handleDelet}) => {
    const {id} = useParams();
    console.log(post)
    console.log(id)
    //items.map((item) => item.id===id 
   // const Post =post.forEach((Post) => ((Post.id) !== id));
   console.log(typeof id)

    const Post =post.find(Post=> (Post.id).toString() === id)
  
    console.log(Post)
  return (
   <main className='PostPage'>
    <article className='post'>
        {Post &&
        <>
           <h2>{Post.title}</h2>
           <p className='postDate'>{Post.datetime}</p>
           <p className='postBody'>{Post.body}</p>
           <button onClick={()=>handleDelet(Post.id)}>Delet post</button>
        </>}
        {
            !Post &&
            <>
              <h2>Post Not Found</h2>
              <p><Link to="/">Back TO Home</Link></p>
            </>
        }
    </article>
   </main>
  )
}

export default PostPage