import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div className="flex flex-col items-center flex-auto">
            <div className="flex mt-8 flex-col items-center w-[72rem]">
                <h1 className="text-zinc-800 text-4xl">A pagina que estás a procura <label className="underline text-red-500">não foi</label> encontrada!</h1>
                <img src="/404.svg" title="Pagina não encontrada" alt="Pagina não encontrada" className="w-[30rem] mt-16" />
                <p className="text-zinc-800 text-xl mt-8"><Link to="/" className="underline">Clica aqui</Link>, para chamares por ajuda!</p>
            </div>
        </div>
    );
}