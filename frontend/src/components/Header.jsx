import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gradient-to-b from-indigo-400 to-indigo-600 ...">
            <div className="flex justify-between items-center mx-6">
                <div>
                    <Link to="/" >
                        <img src="/images/RoamlogLogo.jpg" className="h-24" />
                    </Link>
                </div>
                <div className="flex">
                    <button>Log In</button>
                    <button className="ml-2">Get Started</button>
                </div>
            </div>
        </header>
    );
}