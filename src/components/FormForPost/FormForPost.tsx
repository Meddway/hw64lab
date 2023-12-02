import React, { useState, useEffect } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';

interface PostData {
  title: string;
  content: string;
}

interface FormForPostProps {
  postData?: PostData;
}

const FormForPost: React.FC<FormForPostProps> = ({ postData = { title: '', content: '' } }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PostData>(postData);

  useEffect(() => {
    if (id) {
      setFormData(postData);
    }
  }, [id, postData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await axiosApi.put(`/posts/${id}.json`, formData);
      } else {
        const postTime = new Date().valueOf();
        const postDataWithTime = { ...formData, time: postTime };
        await axiosApi.post('/posts.json', postDataWithTime);
      }
      navigate('/');
    } catch (error) {
      console.error('Error post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-2 ms-0" style={{ maxWidth: '480px' }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          required
          value={formData.content}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {id ? 'Save' : 'Create'}
      </button>
    </form>
  );
};

export default FormForPost;
