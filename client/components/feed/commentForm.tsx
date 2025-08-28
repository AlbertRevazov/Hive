'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface CommentFormProps {
    postId: string;
    onCommentCreated: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentCreated }) => {
    const [commentText, setCommentText] = useState('');
    const { data } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        try {
            await fetch(`http://localhost:3333/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: data?.user?.id,
                    postId,
                    text: commentText,
                }),
            });

            setCommentText('');
            onCommentCreated();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
                placeholder="Написать комментарий"
                style={{ flex: 1, padding: '8px' }}
            />
            <button type="submit" disabled={!commentText.trim()}>
                Отправить
            </button>
        </form>
    );
};
