import React, { useState, useEffect, } from 'react';
import axiosApi from '../../axiosApi';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title?: string;
  time: number;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosApi.get('/posts.json');
        if (response.data) {
          const postsArray: Post[] = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          setPosts(postsArray);
        }
      } catch (error) {
        console.error('Error fetch posts:', error);
      }
    };
    void fetch();
  }, []);

  const textLengthForPost = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="mt-3">
      {posts.map(post => (
        <div key={post.id} className="mb-4 border p-3" style={{maxWidth: '480px'}} >
          <p className="text-secondary">Created on: {new Date(post.time).toLocaleString()}</p>
          <p>{textLengthForPost(post.content, 20)}</p>
          <Link to={`/posts/${post.id}`} className="btn btn-outline-primary">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
