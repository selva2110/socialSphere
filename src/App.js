import { Route, Routes, } from "react-router";
import Header from "./Header";
import About from "./About";
import Footer from "./Footer";
import Home from "./Home";
import { Misssing } from "./Misssing";
import { NAv } from "./NAv";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Link } from "react-router-dom";
import Post from "./Post";
import{ useState } from "react";
import { format } from "date-fns"; 
import { useEffect } from 'react';
import { useNavigate } from  'react-router-dom'
import api from "./api/posts";



function App() {
  const [posts, setPost] = useState([])
  const [search, setSearch]= useState('')
  const [searchResult, setSearchResult]= useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const Nav = useNavigate()
  

  useEffect(() => {
   const fetchPosts = async () => {
    try{
      const res = await api.get("/api/posts/");
      setPost(res.data);
    }catch(err){
     console.log(err)
    }
   }

   fetchPosts();
  },[])

  useEffect(()=>{
    console.log(posts)
    const filterResult = posts.filter((post)=>((post.body).toLowerCase().includes(search.toLowerCase()))) 

    setSearchResult(filterResult.reverse())
  },[posts,search])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const id =posts.length ? posts[posts.length-1].id+1:1
    const datetime = format(new Date(), 'MMMM dd, yyyy PP')
    const newPost={id, 
                  title:postTitle.toUpperCase(), 
                  datetime,
                  body:postBody}
    try{
      console.log(`/api/posts/?id=${1}&title=${newPost.title}&datetime=${newPost.datetime}&body=${newPost.body}`)
    const responce = await api.post(`/api/posts/?id=${newPost.id}&title=${newPost.title}&datetime=${newPost.datetime}&body=${newPost.body}`)
    const allPost=[...posts, responce.data]
    setPost(allPost)
    setPostTitle('')
    setPostBody('')
    Nav('/')
    }catch(err){
      console.log(`Error:${err.message}`)
    }
  }

  const handleDelet = async (id)=>{
    try{
      await api.delete(`/api/posts/?id=${id}`)
    }catch(err){
      console.log(`Error:${err.message}`)
    }
    const postList =posts.filter(posts=> posts.id !== id)
    setPost(postList)
    console.log(postList)
    Nav('/')
  }
  return (
    <div className="App">
                              {/* <nav>
                                <ul>
                                  <li><Link to="/">Home</Link></li>
                                  <li><Link to="/about">About</Link></li>
                                  <li><Link to="/postpage">PostPage</Link></li>
                                </ul>
                              </nav>
                                <Routes>
                                  <Route path="/" element={<Home/>}/>
                                  <Route path="/about" element={<About/>}/>
                                  <Route path="/newpost" element={<NewPost/>}/>

                                  <Route path="/postpage" element={<Layout />}>
                                      <Route index element={<PostPage/>}/>
                                      <Route path=":id" element={<Post/>}/>
                                      <Route path="newpost" element={<NewPost/>}/>
                                  </Route>
                                  <Route path="*" element={<Misssing/>}/>

                                </Routes> */}

       

        <Header/>
        <NAv search={search}
            setSearch={setSearch}/>
        <Routes>
           <Route path="/" element={<Home post={searchResult}/>}/>
            <Route path="post">
            <Route index element={<NewPost
                  handleSubmit={handleSubmit} 
                  postTitle={postTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  setPostTitle={setPostTitle}/>}/>
                  <Route path=":id" element={<PostPage post={posts} handleDelet={handleDelet}/>}/>
             </Route>     
             <Route path="about" element={<About/>}/>
             <Route path="*"  element={<Home post={searchResult}/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
