import { Link } from "react-router-dom";

export default function APIError(){
    return (
        <div className="flex flex-col items-center flex-auto">
            <div className="flex mt-8 flex-col items-center w-[72rem]">
                <h1 className="text-zinc-800 text-4xl">Ocorreu um <label className="underline text-red-500">erro</label> na ligação a API!</h1>
                <img src="/error.svg" title="Erro de API" alt="Erro de API" className="w-[30rem] mt-16" />
                <p className="text-zinc-800 text-xl mt-8">Por favor, tente novamente, mais tarde! <Link to="/" className="underline">Voltar a Home</Link></p>
            </div>
        </div>
    );
}