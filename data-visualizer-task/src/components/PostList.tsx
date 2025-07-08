import type { Post, User } from '../interfaces/interfaces';

interface PostListProps {
  posts: Post[];
  users: User[];
}

function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const PostList = ({ posts, users }: PostListProps) => (
  <ul className='posts'>
    {posts.map((post) => (
      <li key={post.id} className='post'>
      <h3 className='title'>{capitalizeFirstLetter(post.title)}</h3>
      <p>{capitalizeFirstLetter(post.body)}</p>
        <small>
          Author: {users.find(u => u.id === post.userId)?.name || `Author: ${post.userId}`}
        </small>
      </li>
    ))}
  </ul>
);

export default PostList;