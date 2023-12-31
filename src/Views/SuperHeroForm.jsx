import { FaSave } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useApi } from "../Contexts/Api";
import { Fragment, useEffect } from "react";
import { useUtils } from "../Contexts/Utils";

const submitHeroFormSchema = z.object({
    name: z.string().min(3, 'O nome têm de ter no minimo 3 caracteres!'),
    image: z.string().url('O Endereço informado não é uma URL!'),
    super_power: z.string().max(30, 'O super poder têm de ter no maximo 30 caracteres!')
});

export default function SuperHeroForm(){
    const { loadHeroes, heroes, isLoading, setHeroes, setIsLoading } = useApi();
    const { showNotification } = useUtils();

    const navigate = useNavigate();
    const { id } = useParams();
    
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(submitHeroFormSchema),
        mode: 'onChange'
    });

    useEffect(() => {
        loadHeroes();
    }, []);

    useEffect(() => {
        const heroIdToEdit = heroes.findIndex((listOfAllHeroes) => { return(listOfAllHeroes.id === parseInt(id)) });
        if(heroIdToEdit !== -1){
            const listOfProps = Object.keys(heroes[id]);
            const heroData = heroes[id];
            listOfProps.splice(listOfProps.indexOf('id'), 1);
            listOfProps.forEach((propToPut) => {
                setValue(propToPut, heroData[propToPut]);
            });
        }
    }, [heroes]);

    async function submitLogin(formData){
        reset();
        setIsLoading(true);
        if(id){
            const heroIdToEdit = heroes.findIndex((listOfAllHeroes) => { return(listOfAllHeroes.id === parseInt(id)) });
            formData.id = parseInt(id); 
            try{
                heroes[heroIdToEdit] = formData;
                await api.request.post('/users/' + api.secret, heroes);
                setHeroes(heroes);
                showNotification('Heroi atualizado com sucesso!', 2);
                navigate('/dashboard');
            }catch(e){
                navigate('/api-error');
            }
        }else{
            formData.id = heroes.length === 0 ? 0 : heroes[heroes.length-1].id+1;
            try{
                await api.request.post('/users/' + api.secret, [...heroes, formData]);
                setHeroes(lastHeroes => [...lastHeroes, formData]);
                showNotification('Heroi criado com sucesso!', 2);
                navigate('/dashboard'); 
            }catch(e){
                navigate('/api-error');
            }
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center flex-auto">
            <div className="flex mt-8 w-[72rem] flex-col">
                { isLoading ? <div className="w-full h-96 bg-zinc-200 animate-pulse rounded-lg" /> :
                <Fragment>
                { !id || heroes[id] ?
                <Fragment>
                <h1 className="text-3xl text-zinc-800">{ id && heroes[id] ? "Editar " + heroes[id].name : "Criar Super Heroi" }</h1>
                <form className="flex flex-col space-y-4 mt-6" onSubmit={handleSubmit(submitLogin)}>
                    <div className="w-full flex items-center space-x-2">
                        <p className="w-1/6">Nome:</p>
                        <input
                            type="text"
                            placeholder="Nome do Super Heroi"
                            autoCapitalize="on"
                            autoComplete="name"
                            autoCorrect="on"
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('name')}
                        />
                    </div>
                    { errors.name ? <p className="text-red-600">{errors.name.message}</p> : null }
                    <div className="w-full flex items-center space-x-2">
                        <p className="w-1/6">Imagem:</p>
                        <input
                            type="text"
                            placeholder="URL da Imagem"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('image')}    
                        />
                    </div>
                    { errors.image ? <p className="text-red-600">{errors.image.message}</p> : null }
                    <div className="w-full flex items-center space-x-2">
                        <p className="w-1/6">Super-Poder:</p>
                        <input
                            type="text"
                            placeholder="Super Poder"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('super_power')}
                        />
                    </div>
                    { errors.super_power ? <p className="text-red-600">{errors.super_power.message}</p> : null }
                    <div className="flex space-x-2 self-end">
                        <button type="button" onClick={() => { navigate("/dashboard"); }} className="bg-yellow-500 px-5 py-2 rounded text-white text-lg flex items-center space-x-2 hover:bg-yellow-600 w-fit">
                            <MdOutlineArrowBackIos className="w-6 h-6 text-white" />
                            <p>Voltar</p>
                        </button>
                        <button type="submit" className="bg-emerald-500 px-5 py-2 rounded text-white text-lg flex items-center space-x-2 hover:bg-emerald-600 w-fit">
                            <FaSave className="w-6 h-6 text-white" />
                            <p>Gravar</p>
                        </button>
                    </div>
                </form>
                </Fragment> :
                <div className="mt-6 flex flex-col items-center">
                    <img src="/search.svg" title="Ups, o teu heroi ainda não foi exposto a darkmatter!" alt="Ups, o teu heroi ainda não foi exposto a darkmatter!" className="w-[40rem]" />
                    <p className="text-zinc-800 text-4xl mt-6">Ups, o teu heroi ainda não foi exposto a darkmatter!</p>
                    <p className="text-zinc-800 text-lg mt-3">Vai ao <Link to="/dashboard" className="underline">Dashboard</Link> e adiciona os teus herois favoritos!</p>
                </div>
                }
                </Fragment> }
            </div>
        </div>
    );
}