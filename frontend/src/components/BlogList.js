// 

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../services/api';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id)); // Update state to remove the deleted post
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Blogs</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-xl mb-6 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-3xl font-bold mb-3">
              <Link to={`/post/${post._id}`} className="text-blak hover:text-slate-800 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-slate-700 text-lg">
              By <span className="font-semibold ">{post.author}</span>
            </p>

            {isAuthenticated && (
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
