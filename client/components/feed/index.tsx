'use client';
import React from 'react';
import { IPost } from 'types/post';
import { PostCard } from './PostCard';

interface IFeedResponse {
    data: { posts: IPost[]; Id: string };
}

export const Feed: React.FC<IFeedResponse> = React.memo(({ data }) => {
    if (!data.posts || data.posts.length === 0) {
        return <div>No posts found</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.posts.map((post) => {
                return <PostCard key={post.id} post={post} currentUserId={data.Id} />;
            })}
        </div>
    );
});

Feed.displayName = 'Feed';
