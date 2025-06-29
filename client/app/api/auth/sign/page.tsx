'use client';
import React, { useState } from 'react';
import { SignUp } from 'components/auth/sign/SignUp';
import { SignIn } from 'components/auth/sign/SignIn';

const LoginPage = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div>
            {toggle ? <SignUp /> : <SignIn />}
            <button onClick={() => setToggle(!toggle)}> {toggle ? 'Вход' : 'Регистрация'}</button>
        </div>
    );
};

export default LoginPage;
