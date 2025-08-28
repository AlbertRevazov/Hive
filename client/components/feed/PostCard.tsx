'use client';
import React, { useState } from 'react';
import { Comment } from './comment';
import { CommentForm } from './commentForm';
import { IPost } from 'types/post';
import Link from 'next/link';
import Image from 'next/image';
import CommentIcon from '../../icons/comments.svg';
import LikesIcon from '../../icons/likes.svg';

interface PostCardProps {
    post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);

    const toggleComments = () => setShowComments(!showComments);
    const toggleCommentForm = () => setShowCommentForm(!showCommentForm);

    const handleCommentCreated = () => {
        setShowCommentForm(false);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '16px',
                borderBottom: '1px solid grey',
                maxWidth: '450px',
                margin: '0 auto',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                    src={post.author.img}
                    alt={`${post.author.name} ${post.author.lastName}`}
                    width={60}
                    style={{ borderRadius: '50%' }}
                />
                <div>
                    <Link href={`/person/${post.author.id}`}>
                        <span style={{ fontWeight: 'bold' }}>
                            {post.author.name} {post.author.lastName}
                        </span>
                    </Link>
                    <div>
                        <h3 style={{ margin: '8px 0' }}>{post.content}</h3>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                            {new Date(post.createdAt).toLocaleString('ru-RU', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                            })}
                        </span>
                        {!post.isPublic && (
                            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#999' }}>
                                Private
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Image src={LikesIcon} width={20} height={20} alt="likes" />
                    {post.likes.length}
                </span>
                <span
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    onClick={toggleComments}
                >
                    <Image src={CommentIcon} width={20} height={20} alt="comments" />
                    {post.comments.length}
                </span>
            </div>

            {showComments && (
                <div>
                    {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            )}

            <button onClick={toggleCommentForm} style={{ alignSelf: 'flex-start' }}>
                {showCommentForm ? 'Отмена' : 'Написать комментарий'}
            </button>

            {showCommentForm && (
                <CommentForm postId={post.id} onCommentCreated={handleCommentCreated} />
            )}
        </div>
    );
};
