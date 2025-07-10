'use client';
import React, { FC } from 'react';
import { IPost } from 'types/post';
import Link from 'next/link';
import Image from 'next/image';
import CommentIcon from '../../icons/comments.svg';
import LikesIcon from '../../icons/likes.svg';

interface IFeedResponse {
    posts: IPost[];
}

export const Feed: FC<IFeedResponse> = ({ posts }) => {
    return (
        <div>
            {posts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: '1px solid black',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <img
                            src={post.author.img}
                            alt={`${post.author.name} ${post.author.lastName}`}
                            width={60}
                        />
                        <Link href={`/person/${post.author.id}`}>
                            <span>
                                {post.author.name} {post.author.lastName}
                            </span>
                        </Link>
                        <div>
                            <h3>{post.content}</h3>
                            <span>
                                {new Date(post.createdAt).toLocaleString('ru-RU', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                    timeZone: 'Europe/Moscow',
                                })}{' '}
                            </span>
                            {!post.isPublic && <span>Private</span>}
                        </div>
                    </div>

                    <div>
                        {post.comments.slice(0, 2).map((comment) => (
                            <div key={comment.id}>
                                <Link href={`/person/${comment.author.id}`}>
                                    <img
                                        key={comment.id}
                                        src={comment.author.img}
                                        alt={`${comment.author.name} ${comment.author.lastName}`}
                                        width={30}
                                    />
                                </Link>
                                <span>{comment.text}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span>
                            <Image src={LikesIcon} width={20} alt="likes" />
                            {post.likes.length}
                        </span>
                        <span>
                            <Image src={CommentIcon} width={20} alt="comments" />{' '}
                            {post.comments.length}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
