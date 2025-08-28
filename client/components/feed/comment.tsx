'use client';
import { IPostComment } from 'types/post';
import Link from 'next/link';

interface CommentProps {
    comment: IPostComment;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Link href={`/person/${comment.author.id}`}>
                <img
                    src={comment.author.img}
                    alt={`${comment.author.name} ${comment.author.lastName}`}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%' }}
                />
            </Link>
            <div>
                <span style={{ fontWeight: 'bold' }}>
                    {comment.author.name} {comment.author.lastName}
                </span>
                <span>: {comment.text}</span>
            </div>
        </div>
    );
};
