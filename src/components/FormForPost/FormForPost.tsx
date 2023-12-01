import React, { useState } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

const FormForPost: React.FC = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postTime = (new Date()).valueOf();
      const postDataPostTime = {
        title: postData.title,
        content: postData.content,
        time: postTime,
      };
      await axiosApi.post('/posts.json', postDataPostTime);
      navigate('/');

      setPostData({
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('Error new post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 ms-0" style={{maxWidth: '480px'}}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
          value={postData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content:</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          required
          value={postData.content}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
  );
};

export default FormForPost;
