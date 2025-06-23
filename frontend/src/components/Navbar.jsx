import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Smart Recipe Manager</h2>
            <ul>

                <li><Link to="/pantry">Pantry</Link></li>
                <li><Link to="/generate-recipes">Generate Recipes</Link></li>
                <li><button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
