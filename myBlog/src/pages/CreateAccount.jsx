import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import validator from 'validator';



export default function CreateAccpunt() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    async function createAccount() {

        // Check if email is valid
        if (!validator.isEmail(email)) {
            setError("Invalid email.");
            return;
        }
        if (password !== confirmPassword) {
            setError('Password and Confirmed password do not match')
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles')

        } catch (e) {
            setError(e.message)
        }
    }
    return (
        <>
            <h1>Create An Account</h1>
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
            <input
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={createAccount}>Create Account</button>
            <Link to='/login'>Already have an account. Log in here</Link>
        </>

    )
}