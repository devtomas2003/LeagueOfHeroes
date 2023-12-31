import React, { createContext, useContext, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {

    const [heroes, setHeroes] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(api.public);
    const [favoriteHeroes, setFavoriteHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function loadHeroes(){
        if(heroes.length === 0){
            try {
                const heroesData = await api.request.get('/users/' + activeUser);
                setHeroes(heroesData.data);
                const favoritesData = await api.request.get('/users/' + activeUser + '/top');
                setFavoriteHeroes(favoritesData.data);
                const usersData = await api.request.get('/users');
                setUsers(usersData.data);
                setIsLoading(false);
            }catch(e){
                navigate('/api-error');
            }
        }        
    }

    async function updateSelectedUser(userSelected) {
        try{
            setIsLoading(true);
            setActiveUser(userSelected);
            const heroesData = await api.request.get('/users/' + userSelected);
            if(heroesData.data){
                const heroesResult = heroesData.data.map((hero) => { hero.id = parseInt(hero.id); return hero; });
                setHeroes(heroesResult);
            }else{
                setHeroes([]);
            }
            const favoritesData = await api.request.get('/users/' + userSelected + '/top');
            if(favoritesData.data){
                const favsResult = favoritesData.data.map((hero) => { hero = parseInt(hero); return hero; });
                setFavoriteHeroes(favsResult);
            }else{
                setFavoriteHeroes([]);
            }
            setIsLoading(false);
        }catch(e){
            navigate('/api-error');
        }
    }

    return (
        <ApiContext.Provider value={{
            heroes,
            setHeroes,
            favoriteHeroes,
            setFavoriteHeroes,
            loadHeroes,
            isLoading,
            users,
            updateSelectedUser,
            activeUser,
            setActiveUser,
            setIsLoading
        }}>
            { children }
        </ApiContext.Provider>
    );
};

export function useApi(){
    const context = useContext(ApiContext);
    return context;
}