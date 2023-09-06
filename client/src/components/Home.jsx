import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="home">
            <h1>Please <Link to="/login">Login</Link> or <Link to="/register">Sign Up</Link>!</h1>
        </div>
    )
}