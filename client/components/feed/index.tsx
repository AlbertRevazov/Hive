'use client';
import React from 'react';
import { IPost } from 'types/post';
import { PostCard } from './PostCard';

interface IFeedResponse {
    posts: IPost[];
}

export const Feed: React.FC<IFeedResponse> = ({ posts }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
