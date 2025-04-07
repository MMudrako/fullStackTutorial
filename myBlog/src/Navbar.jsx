import { Link } from "react-router-dom"
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import UseUser from './useUser'
const NavBar = () => {
    const { isLoading, user } = UseUser();
    const navigate = useNavigate();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                {isLoading ? <li>Loading...</li> : (
                    <>
                        {user && (
                            <li >
                                🔛{user.email}
                            </li>
                        )}
                        <li>
                            {user
                                ? <button onClick={() => signOut(getAuth())}>Sign Out</button>
                                : <button onClick={() => navigate('/login')}>Log In</button>
                            }
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;