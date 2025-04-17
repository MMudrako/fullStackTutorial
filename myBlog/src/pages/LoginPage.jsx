import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import validator from 'validator';



export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    async function logIn() {
        if (!validator.isEmail(email)) {
            setError("Invalid email.");
            return;
        }
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles')

        } catch (e) {
            setError(e.message)
        }
    }
    return (
        <>
            <h1>Log In</h1>
            {error && <p>{error}</p>}
            <input
                placeholder='Your email address'
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input
                type='password'
                placeholder='Your password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button onClick={logIn}>Log in</button>
            <Link to='/create-account'>Don't have an account. Create one here</Link>
        </>

    )
}