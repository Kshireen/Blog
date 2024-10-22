
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { getPost, updatePost } from '../services/api';

function EditPost() {
  const { id } = useParams(); // Get the post ID from the route
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (content) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      navigate(`/post/${id}`); // Navigate back to the post after editing
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Author:</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Content:</label>
          <ReactQuill
            value={post.content}
            onChange={handleQuillChange}
            className="h-64"
            theme="snow"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
