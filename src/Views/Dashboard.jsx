import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../Contexts/Api";
import SkeletonTable from "../Components/SkeletonTable";
import api from "../services/api";
import { useUtils } from "../Contexts/Utils";

export default function Dashboard(){
    const navigate = useNavigate();

    const {
        loadHeroes,
        heroes,
        favoriteHeroes,
        isLoading,
        setFavoriteHeroes,
        setHeroes,
        users,
        updateSelectedUser,
        activeUser,
        setIsLoading
    } = useApi();

    const { showNotification } = useUtils();

    useEffect(() => {
        loadHeroes();
    }, []);

    async function removeHero(heroId){
        if(api.public !== activeUser){
            showNotification("Só podes remover herois teus!", 0);
            return;
        }

        const posHero = heroes.findIndex(object => {
            return object.id === heroId;
        });

        if(confirm("Deseja realmente apagar " + heroes[posHero].name + "?")){
            setIsLoading(true);
            const filterdFavs = favoriteHeroes.filter(item => item !== heroId);
            try{
                await api.request.post('/users/' + api.secret + "/top", filterdFavs);
                setFavoriteHeroes(filterdFavs);
            }catch(e){
                navigate('/api-error');
            }
            const filteredHeroes = heroes.filter(item => item.id !== heroId);
            try{
                await api.request.post('/users/' + api.secret, filteredHeroes);
                setHeroes(filteredHeroes);
                showNotification("Heroi apagado com sucesso!", 2);
            }catch(e){
                navigate('/api-error');
            }
            setIsLoading(false);
        }
    }

    async function addFav(heroId){
        if(api.public !== activeUser){
            showNotification("Só podes adicionar herois teus nos favoritos!", 0);
            return;
        }

        if(favoriteHeroes.length >= 3){
            showNotification("Só podes ter 3 herois nos favoritos!", 1);
            return;
        }

        const posHero = heroes.findIndex(object => {
            return object.id === heroId;
        });

        if(confirm("Deseja realmente adicionar " + heroes[posHero].name + " aos seus favoritos?")){
            setIsLoading(true);
            try{
                await api.request.post('/users/' + api.secret + '/top', [...favoriteHeroes, heroId]);
                setFavoriteHeroes(prevArray => [...prevArray, heroId]);
                showNotification("Heroi adicionado com sucesso aos favoritos!", 2);
            }catch(e){
                navigate('/api-error');
            }
            setIsLoading(false);
        }
    }

    async function deleteFav(heroId){
        if(api.public !== activeUser){
            showNotification("Só podes remover herois teus nos favoritos!", 0);
            return;
        }

        const posHero = heroes.findIndex(object => {
            return object.id === heroId;
        });

        if(confirm("Deseja realmente remover " + heroes[posHero].name + " aos seus favoritos?")){
            setIsLoading(true);
            const listDeleted = favoriteHeroes.filter(item => item !== heroId);
            try{
                await api.request.post('/users/' + api.secret + '/top', listDeleted);
                setFavoriteHeroes(listDeleted);
                showNotification("Heroi removido com sucesso dos favoritos!", 2);
            }catch(e){
                navigate('/api-error');
            }
            setIsLoading(false);
        }
    }

    function editHero(heroId){
        if(api.public !== activeUser){
            showNotification("Só podes editar herois teus!", 0);
            return;
        }

        navigate("/dashboard/edit/" + heroId);
    }

    function createHero(){
        if(api.public !== activeUser){
            showNotification("Só podes adicionar herois teus!", 0);
            return;
        }

        navigate("/dashboard/add");
    }

    return (
        <div className="flex flex-col items-center flex-auto">
            <div className="flex mt-8 items-center justify-between w-[72rem]">
                <div>
                    <h1 className="text-3xl text-zinc-800">Lista de Super Herois</h1>
                    { isLoading ?
                    <div className="rounded-lg w-42 h-8 bg-zinc-200 mt-2 animate-pulse" />
                    :
                    <div className="flex mt-2 items-center">
                        <label>Utilizador: </label>
                        <select onChange={(e) => { updateSelectedUser(e.target.value); }} defaultValue={activeUser} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-52 p-1 ml-2">
                            { users.map((user) => {
                                return (<option key={user} value={user}>{user === parseInt(api.public) ? api.public + " (Owner)" : user}</option>);
                            }) }
                        </select>
                    </div> }
                </div>
                <button className="bg-emerald-500 px-5 py-2 rounded text-white text-lg flex items-center space-x-2 hover:bg-emerald-600" title="Adicionar Heroi" type="button" onClick={() => { createHero(); }}>
                    {/* Codigo caso quisesse fazer o disable do btn: disabled={activeUser === api.public ? false : true} */}
                    <IoMdAdd className="w-6 h-6 text-white" />
                    <p>Adicionar Super Heroi</p>
                </button>
            </div>
            <table className="w-[72rem] mt-4">
                <thead>
                    <tr>
                        <td className="p-2 bg-gray-100 border text-center">ID</td>
                        <td className="p-2 bg-gray-100 border text-center">Imagem</td>
                        <td className="p-2 bg-gray-100 border text-center">Nome</td>
                        <td className="p-2 bg-gray-100 border text-center">SuperPoder</td>
                        <td className="p-2 bg-gray-100 border text-center">Ações</td>
                    </tr>
                </thead>
                <tbody>
                    { isLoading ?
                    <Fragment>
                        <SkeletonTable />
                        <SkeletonTable />
                        <SkeletonTable />
                        <SkeletonTable />
                    </Fragment>
                    :
                    <Fragment>
                    { heroes.length !== 0 ?
                    <Fragment>
                    { heroes.map((hero) => {
                        return (
                            <tr key={hero.id}>
                                <td className="border p-2 text-center">{hero.id}</td>
                                <td className="border p-2"><div className="flex justify-center"><img src={hero.image} title={hero.name} alt={hero.name} onError={(e) => { e.target.src = "https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png"; }} className="h-48" /></div></td>
                                <td className="border p-2 text-center">{hero.name}</td>
                                <td className="border p-2 text-center">{hero.super_power ? hero.super_power : "N/D"}</td>
                                <td className="border p-2">
                                    <div className="flex justify-center space-x-2">
                                        <button className="bg-red-500 px-4 py-2 rounded text-white text-lg hover:bg-red-600 flex items-center space-x-2" title="Apagar Heroi" type="button" onClick={() => { removeHero(hero.id) }}>
                                            {/* Codigo caso quisesse fazer o disable do btn: disabled={activeUser === api.public ? false : true} */}
                                            <MdDelete className="w-6 h-6 text-white" />
                                            <p>Apagar</p>
                                        </button>
                                        { favoriteHeroes.includes(hero.id) ?
                                        <button className="bg-red-500 px-4 py-2 rounded text-white text-lg hover:bg-red-600 flex items-center space-x-2" title="Remove Favorito" type="submit" onClick={() => { deleteFav(hero.id); }}>
                                            {/* disabled={activeUser === api.public ? false : true} */}
                                            <IoMdRemove className="w-6 h-6 text-white" />
                                            <p>Remover Favorito</p>
                                        </button>
                                        :
                                        <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white text-lg flex items-center space-x-2" title="Adicionar Favorito" type="submit" onClick={() => { addFav(hero.id); }}>
                                            {/* Codigo caso quisesse fazer o disable do btn: disabled={favoriteHeroes.length >= 3 || activeUser !== api.public ? true : false} */}
                                            <IoMdAdd className="w-6 h-6 text-white" />
                                            <p>Marcar Favorito</p>
                                        </button>
                                        }
                                        <button className="bg-yellow-400 px-4 py-2 rounded text-white text-lg hover:bg-yellow-500 flex items-center space-x-2" title="Editar Heroi" onClick={() => { editHero(hero.id); }}>
                                            {/* Codigo caso quisesse fazer o disable do btn: disabled={activeUser === api.public ? false : true} */}
                                            <FaPencil className="w-6 h-6 text-white" />
                                            <p>Editar</p>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    }) }
                    </Fragment> :
                    <tr>
                        <td colSpan={5} className="border p-2 text-center">Os super herois foram salvar alguem! Volta mais tarde.</td>
                    </tr> }
                    </Fragment>
                    }
                </tbody>
            </table>
        </div>
    );
}