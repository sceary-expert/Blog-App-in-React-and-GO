import React, { useState, useEffect } from 'react';
import './Posts.css';
// import styles from './Posts.css';
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className = 'container'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search articles..."
        className='searchInput'
        // style={styles.searchInput}
      />
      {selectedPost ? (
        <div className = 'post'>
          <h2 className='title'>{selectedPost.title}</h2>
          <p className = 'selectedPostBody'>{selectedPost.body}</p>
          <button className = 'backButton' onClick={() => setSelectedPost(null)}>
            Back
          </button>
        </div>
      ) : (
        filteredPosts.map(post => (
          <div key={post.id} className = 'preview'>
            <h2 className = 'previewTitle'>{post.title}</h2>
            <p className = 'previewContent'>{post.body.substring(0, 150)}...</p>
            <button className = 'readMoreButton' onClick={() => handlePostClick(post)}>
              Read More
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// const styles = {
//   container: {
//     fontFamily: 'Poppins, sans-serif',
//     maxWidth: '800px',
//     margin: '0 auto',
//     padding: '20px',
//     boxSizing: 'border-box',
//   },
//   searchInput: {
//     marginBottom: '20px',
//     padding: '8px',
//     fontSize: '16px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     boxSizing: 'border-box',
//     outline: 'none',
//   },
//   preview: {
//     backgroundColor: '#f2f2f2',
//     padding: '20px',
//     marginBottom: '20px',
//     borderRadius: '4px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   previewContent: {
//     fontSize: '16px',
//     color: '#666',
//     fontFamily: 'Poppins, sans-serif',
//     marginBottom: '8px',
//   },
//   previewTitle: {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     marginBottom: '8px',
//     color: '#333',
//     fontFamily: 'Poppins, sans-serif',
//   },
//   readMoreButton: {
//     backgroundColor: '#017afe',
//     color: '#fff',
//     padding: '8px 16px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   post: {
//     backgroundColor: '#f2f2f2',
//     padding: '20px',
//     marginBottom: '20px',
//     borderRadius: '4px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '8px',
//     color: '#333',
//     fontFamily: 'Poppins, serif',
//   },
//   body: {
//     fontSize: '16px',
//     lineHeight: '1.5',
//     color: '#666',
//     fontFamily: 'Poppins, sans-serif',
//   },
//   backButton: {
//     backgroundColor: '#017afe',
//     color: '#fff',
//     padding: '8px 16px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: '16px',
//   },
// };

export default Posts;
