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
        activeUser
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
            await api.request.post('/users/' + api.secret + "/top", favoriteHeroes.filter(item => item !== heroId));
            setFavoriteHeroes(favoriteHeroes.filter(item => item !== heroId));
            await api.request.post('/users/' + api.secret, heroes.filter(item => item.id !== heroId));
            setHeroes(heroes.filter(item => item.id !== heroId));
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
            setFavoriteHeroes(prevArray => [...prevArray, heroId]);
            await api.request.post('/users/' + api.secret + '/top', [...favoriteHeroes, heroId]);
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
            setFavoriteHeroes(favoriteHeroes.filter(item => item !== heroId));
            await api.request.post('/users/' + api.secret + '/top', favoriteHeroes.filter(item => item !== heroId));
        }
    }

    function editHero(heroId){
        if(api.public !== activeUser){
            showNotification("Só podes editar herois teus!", 0);
            return;
        }

        navigate("/dashboard/edit/" + heroId);
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
                                return (<option key={user}>{user}</option>);
                            }) }
                        </select>
                    </div> }
                </div>
                <button className={`bg-emerald-500 px-5 py-2 rounded text-white text-lg flex items-center space-x-2 hover:bg-emerald-600 ${activeUser !== api.public ? "cursor-not-allowed" : "cursor-pointer"}`} title={activeUser !== api.public ? "Não é possivel editar este utilizador, seleciona o teu!" : null} disabled={activeUser === api.public ? false : true} type="button" onClick={() => { navigate("/dashboard/add"); }}>
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
                                        <button className="bg-emerald-500 px-4 py-2 rounded text-white text-lg flex items-center space-x-2" title="Adicionar Favorito" type="submit" onClick={() => { addFav(hero.id); }}>
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