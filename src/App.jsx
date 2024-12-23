import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import PostService from "./api/PostService";
import Paginations from "./components/Paginations";
import Suggestions from "./components/Suggestions";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [suggestions, setSuggestions] = useState([]); 

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, posts]);


  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    loadPosts();
  }, []);

  async function fetchPosts() {
    const posts = await PostService.getAll();
    return posts;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const filteredSuggestions = posts.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); 
    } else {
      setSuggestions([]); 
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.title); 
    setSuggestions([]); 
  };

  return (
    <div>
      <div className="search">
        <input
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search"
        />
        <Suggestions 
          suggestions={suggestions} 
          onSuggestionSelect={handleSuggestionSelect} 
        />
      </div>
      
      <div className="App">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <Posts key={post.id} title={post.title} value={post.body} />
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>

      <Paginations 
        postsPerPage={postsPerPage} 
        totalPosts={filteredPosts.length} 
        paginate={paginate} 
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;