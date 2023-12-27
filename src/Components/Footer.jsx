export default function Footer(){
    return (
        <div className="p-3 border-t mt-4 bg-zinc-100 flex justify-center">
            <p className="text-zinc-800">League Of Heroes | Copyright © {new Date().getFullYear()} by Tomás Figueiredo</p>
        </div>
    );
}