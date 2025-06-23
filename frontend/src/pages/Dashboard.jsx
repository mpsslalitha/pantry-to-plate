import Navbar from '../components/Navbar';
import "../styles/Dashboard.css"

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="dashboard-content">
                <h1>Welcome to Smart Recipe Manager</h1>
                <p>Track your pantry, avoid waste, and cook smarter.</p>
                <ul>
                    <li>📦 Manage your Pantry</li>
                    <li>🍳 Get Recipe Suggestions (Coming soon)</li>
                    <li>🛒 Generate Shopping Lists (Coming soon)</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
