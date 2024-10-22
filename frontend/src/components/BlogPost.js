import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';

function BlogPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-lg text-gray-600 mb-6">By <span className="font-semibold">{post.author}</span></p>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default BlogPost;
