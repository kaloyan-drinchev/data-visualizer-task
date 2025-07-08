import { useState, useEffect } from 'react'
import './App.css'
import type { Post, User } from './interfaces/interfaces'
import PostList from './components/PostList'
import AddPostForm from './components/AddPostForm'
import UserFilter from './components/UserFilter'
import PopupMessage from './components/PopupMessage'

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const savedLocalPosts = localStorage.getItem("localPosts");
    if (savedLocalPosts) {
      setLocalPosts(JSON.parse(savedLocalPosts));
    }
  }, []);

  useEffect(() => {
    fetch(USERS_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error message: " + error));
  }, []);

  useEffect(() => {
    setLoading(true)
    let url = POSTS_URL + '?_sort=id&_order=desc&_limit=20';
    if (userId) {
      url += `&userId=${userId}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, [userId]);

// For clearing all created posts
// const handleClearPosts = () => {
//   localStorage.removeItem("localPosts");
//   setLocalPosts([]);
// };

  const handlePostAdded = (newPost: Post) => {
    const updatedLocalPosts = [newPost, ...localPosts];
    setLocalPosts(updatedLocalPosts);
    localStorage.setItem("localPosts", JSON.stringify(updatedLocalPosts));
  };

  const filteredLocalPosts = localPosts.filter(post => !userId || String(post.userId) === userId);
  const filteredApiPosts = posts.filter(post => !userId || String(post.userId) === userId);

  return (
    <div className='container'>
      <PopupMessage message={successMessage} />
      <h1 className='title'>Data visualizer</h1>
      <h2>Latest Posts</h2>
      <UserFilter users={users} userId={userId} setUserId={setUserId} />
      {loading ? (
        <p> Loading.... </p>
      ) : (
        <>
          <PostList posts={[...filteredLocalPosts, ...filteredApiPosts]} users={users} />
          <AddPostForm
            users={users}
            onPostAdded={handlePostAdded}
            setSuccessMessage={setSuccessMessage}
          />
          {/* For clearing localStorage */}
          {/* <button onClick={handleClearPosts}>Remove Storage</button> */}
        </>
      )}
    </div>
  );
}

export default App;