"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <Link href="/create" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Create Post
          </Link>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex space-x-2">
                <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700">View</Link>
                <Link href={`/posts/${post.id}/edit`} className="text-yellow-500 hover:text-yellow-700">Edit</Link>
                <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="text-gray-500 text-center">No posts found.</p>}
        </div>
      </div>
    </div>
  );
}
