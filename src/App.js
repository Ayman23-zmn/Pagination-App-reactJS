import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Posts from './components/Posts';
import Pagination from './components/Pagination';


function App() {
  // Initializing the state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      // Since we are in a fetching process, so setLoading = true
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      //Data has been fetched so turn setLoading back to false becasue API calling is done 
      setLoading(false);
    };

    fetchPosts()
  }, [])

  
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)

  //Change Page
  const paginate = (pageNumber)=> setCurrentPage(pageNumber)
  
  
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} 
      loading = {loading}/>
      <Pagination 
      postsPerPage={postsPerPage} 
      totalPosts={posts.length}
      paginate={paginate}/>
    </div>
  );
}

export default App;
