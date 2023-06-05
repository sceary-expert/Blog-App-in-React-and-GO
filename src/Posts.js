import React, { useState, useEffect } from 'react';
import './Posts.css';
import VisitorCount from './VisitorCount';
// SkeletonLoading component to represent the loading state
const SkeletonLoading = () => {
  return (
    <div className="skeletonLoading">
      <div className="skeletonTitle"></div>
      <div className="skeletonContent"></div>
      <div className="skeletonButton"></div>
    </div>
  );
};

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [visitorCount, setVisitorCount] = useState(285); 
  useEffect(() => {
    fetch('https://loomi-backend-private.onrender.com/posts')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setPosts(data.data.data);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handlePostClick = post => {
    setSelectedPost(post);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search articles..."
          className="searchInput"
        />
        <SkeletonLoading /> {/* Render the SkeletonLoading component */}
        <SkeletonLoading />
        <SkeletonLoading />
        
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search articles..."
        className="searchInput"
      />
      {selectedPost ? (
        <div className="post">
          <h2 className="title">{selectedPost.title}</h2>
          <p className="selectedPostBody">{selectedPost.body}</p>
          <button className="backButton" onClick={() => setSelectedPost(null)}>
            Back
          </button>
        </div>
      ) : (
        filteredPosts.map(post => (
          <div key={post._id} className="preview">
            <h2 className="previewTitle">{post.title}</h2>
            <p className="previewContent">{post.body.substring(0, 150)}...</p>
            <button className="readMoreButton" onClick={() => handlePostClick(post)}>
              Read More
            </button>
          </div>
        ))
      )}
      <VisitorCount count={visitorCount} />
    </div>
  );
}

export default Posts;
