import axiosApi from '../../axiosApi';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import FormForPost from '../../components/FormForPost/FormForPost';

interface Post {
  id: string;
  title: string;
  time: number;
  content: string;
}

const ReadPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosApi.get(`/posts/${id}.json`);
        if (response.data) {
          setPost({ id, ...response.data });
        }
      } catch (error) {
        console.log('Error fetch post', error);
      }
    };
    void fetch();
  }, [id]);

  const deletePost = async () => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      navigate('/');
    } catch (error) {
      console.log('Error delete post', error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div className="m-3">
      {post ? (
        <div className="border p-3" style={{ maxWidth: '480px' }}>
          <h2>{post.title}</h2>
          <p>Created at: {new Date(post.time).toLocaleString()}</p>
          <p>{post.content}</p>
          <button onClick={deletePost} className="btn btn-danger me-3">
            Delete
          </button>
          <button onClick={handleEditClick} className="btn btn-primary">
            Edit
          </button>
          {editing && <FormForPost postData={post} />}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ReadPost;
