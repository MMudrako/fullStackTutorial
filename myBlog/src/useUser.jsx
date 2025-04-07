import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function UseUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), function (user) {
            setUser(user);
            setIsLoading(false)
        });

        return unsubscribe;
    }, []);

    return { isLoading, user }
}

