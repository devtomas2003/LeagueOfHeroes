import { Link } from "react-router-dom";

export default function Header(){
    return (
        <div className="flex p-3 space-x-12 shadow-lg justify-center">
            <div className="flex items-center space-x-2">
                <img src="/vite.svg" title="League Of Heroes" alt="League Of Heroes" />
                <h1 className="text-2xl text-zinc-800">League Of Heroes</h1>
                <p className="text-zinc-800 mt-1 text-lg">| By Tomás Figueiredo</p>
            </div>
            <div className="flex items-center space-x-4">
                <Link className="text-zinc-800 hover:underline" to="/">Home</Link>
                <Link className="text-zinc-800 hover:underline" to="/dashboard">Dashboard</Link>
            </div>
        </div>
    );
}