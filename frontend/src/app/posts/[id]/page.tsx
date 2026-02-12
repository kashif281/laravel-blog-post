"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';

type Post = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

export default function ShowPost() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    if (!post) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-600 mb-6">{post.content}</p>
                <div className="flex space-x-4">
                    <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Back to List
                    </Link>
                    <Link href={`/posts/${post.id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}
