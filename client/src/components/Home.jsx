import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="home">
            <h3>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>!</h3>
        </div>
    )
}