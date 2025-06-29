'use client';
import { signIn } from 'next-auth/react';
import { useSignHook } from './hooks';
import Image from 'next/image';
import googleIcon from '../../../icons/google.svg';
import gitIcon from '../../../icons/git.svg';

export const SignUp = () => {
    const {
        handleCredentialsLogin,
        name,
        setName,
        lastName,
        setLastName,
        isLoading,
        password,
        setPassword,
        email,
        setEmail,
        error,
        phone,
        setPhone,
        image,
        setImage,
    } = useSignHook('register');

    return (
        <div>
            <h2>Вход в аккаунт</h2>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleCredentialsLogin} className="mb-6">
                <div>
                    <label htmlFor="name">Имя</label>
                    <input
                        id="name"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                        id="lastName"
                        type="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Телефон</label>
                    <input
                        id="phone"
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Фото</label>
                    <input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                {image && <img src={image} alt="photo" width={50} height={50} />}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>
            </form>

            <div className="space-y-3">
                <button onClick={() => signIn('google', { callbackUrl: '/profile' })}>
                    <Image src={googleIcon} alt="Google" width={24} height={24} />
                </button>{' '}
                <button onClick={() => signIn('github', { callbackUrl: '/profile' })}>
                    <Image src={gitIcon} alt="Google" width={24} height={24} />
                </button>
            </div>
        </div>
    );
};
