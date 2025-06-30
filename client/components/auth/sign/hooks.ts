import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useSignHook = (action: 'login' | 'register') => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Заполните все поля');
            return;
        }

        setError('');
        setIsLoading(true);
        const credentials =
            action === 'login'
                ? { email, password }
                : { name, lastName, phone, email, password, image };
        try {
            const result = await signIn('credentials', {
                ...credentials,
                redirect: false,
                action,
                callbackUrl: '/profile',
            });

            if (result?.error) {
                setError(
                    result.error === 'CredentialsSignin'
                        ? 'Неверный email или пароль'
                        : result.error,
                );
            } else {
                router.push('/profile');
            }
        } catch (err) {
            setError('Произошла ошибка при входе');
        } finally {
            setIsLoading(false);
        }
    };
    return {
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
        phone,
        setPhone,
        error,
        image,
        setImage,
    };
};
