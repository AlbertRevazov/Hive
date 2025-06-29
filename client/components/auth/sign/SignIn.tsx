'use client';
import { signIn } from 'next-auth/react';
import { useSignHook } from './hooks';
import Image from 'next/image';
import googleIcon from '../../../icons/google.svg';
import gitIcon from '../../../icons/git.svg';

export const SignIn = () => {
    const { handleCredentialsLogin, isLoading, password, setPassword, email, setEmail, error } =
        useSignHook('login');

    return (
        <div>
            <h2>Вход в аккаунт</h2>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleCredentialsLogin} className="mb-6">
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
