import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav>
      <h1>Recipe App</h1>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;