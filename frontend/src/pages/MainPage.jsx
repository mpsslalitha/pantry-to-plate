import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div>

            <div className="dashboard-content">
                <h1>Welcome to Smart Recipe Manager</h1>
                <p>Track your pantry, avoid waste, and cook smarter.</p>
                <div>
                    <button onClick={() => navigate("/register")}>Register</button>
                    <button onClick={() => navigate("/login")}>Login </button>
                </div>

            </div>
        </div>
    );
};

export default MainPage;
