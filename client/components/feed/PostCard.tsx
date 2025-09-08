'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Comment } from './comment';
import { CommentForm } from './commentForm';
import { IPost } from 'types/post';
import Link from 'next/link';
import Image from 'next/image';
import CommentIcon from '../../icons/comments.svg';
import LikeIcon from '../../icons/like.svg';
import LikedIcon from '../../icons/liked.svg';
import './styles.css';

interface PostCardProps {
    post: IPost;
    currentUserId: string;
}

export const PostCard: React.FC<PostCardProps> = React.memo(({ post, currentUserId }) => {
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes.length);

    // проверка лайка
    useEffect(() => {
        const hasUserLiked = post.likes.some((like) => like.userId === currentUserId);
        setIsLiked(hasUserLiked);
    }, [post.likes, currentUserId]);

    const toggleComments = useCallback(() => {
        setAreCommentsVisible((prev) => !prev);
    }, []);

    const toggleCommentForm = useCallback(() => {
        setIsCommentFormVisible((prev) => !prev);
    }, []);

    const handleCommentSubmit = useCallback(() => {
        setIsCommentFormVisible(false);
    }, []);

    const handleLikeToggle = useCallback(async () => {
        const action = isLiked ? 'remove' : 'add';

        try {
            await fetch(`http://localhost:3333/like/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUserId, postId: post.id }),
            });

            setIsLiked((prev) => !prev);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        } catch (error) {
            console.error('Error updating like:', error);
        }
    }, [isLiked, currentUserId, post.id]);

    const authorName = `${post.author.name} ${post.author.lastName}`;
    const formattedDate = new Date(post.createdAt).toLocaleString('ru-RU', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    return (
        <article className="post-card">
            <div className="post-header">
                <img
                    src={post.author.img}
                    alt={authorName}
                    width={60}
                    height={60}
                    className="author-avatar"
                />
                <div className="post-info">
                    <Link href={`/profile/${post.author.id}`} className="author-link">
                        {authorName}
                    </Link>
                    <h3 className="post-content">{post.content}</h3>
                    <div className="post-meta">
                        <time className="post-date">{formattedDate}</time>
                        {!post.isPublic && <span className="post-visibility">Private</span>}
                    </div>
                </div>
            </div>

            <div className="post-actions">
                <button
                    className="like-button"
                    onClick={handleLikeToggle}
                    aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
                >
                    <Image src={isLiked ? LikedIcon : LikeIcon} width={20} height={20} alt="" />
                    {likesCount}
                </button>

                <button
                    className="comment-button"
                    onClick={toggleComments}
                    aria-label={areCommentsVisible ? 'Скрыть комментарии' : 'Показать комментарии'}
                >
                    <Image src={CommentIcon} width={20} height={20} alt="" />
                    {post.comments.length}
                </button>
            </div>

            {areCommentsVisible && (
                <div className="comments-section">
                    {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            )}

            <button className="comment-form-toggle" onClick={toggleCommentForm}>
                {isCommentFormVisible ? 'Отмена' : 'Написать комментарий'}
            </button>

            {isCommentFormVisible && (
                <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
            )}
        </article>
    );
});
