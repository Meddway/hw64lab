import axiosApi from '../../axiosApi';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  id: string;
  title: string;
  time: number;
  content: string;
}
const ReadPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Props | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosApi.get(`/posts/${id}.json`);
        if(response.data) {
          setPost({id, ...response.data});
        }
      }catch (error) {
        console.log('Error fetch post', error);
      }
    };
    void fetch();
  }, [id]);

  const deletePost = async () => {
    try {
      await axiosApi.delete(`/post/${id}.json`);
      navigate('/');
    }catch (error) {
      console.log('Error delete post', error);
    }
  };

  return (
    <div className="m-3">
      {post ? (
        <div className="border p-3" style={{maxWidth: '480px'}}>
          <h2>{post.title}</h2>
          <p>Created at: {new Date(post.time).toLocaleString()}</p>
          <p>{post.content}</p>
          <button onClick={deletePost} className="btn btn-danger me-3">
            Delete
          </button>
          <Link to={`/posts/${id}/edit`} className="btn btn-primary">
            Edit
          </Link>
        </div>
      ) : (
        <Spinner/>
      )}
    </div>
  );
};

export default ReadPost;