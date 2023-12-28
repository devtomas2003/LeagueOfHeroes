import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {

    const [heroes, setHeroes] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(api.public);
    const [favoriteHeroes, setFavoriteHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function loadHeroes(){
        if(heroes.length === 0){
            const heroesData = await api.request.get('/users/' + activeUser);
            const heroesResult = heroesData.data.map((hero) => { hero.id = parseInt(hero.id); return hero; });
            setHeroes(heroesResult);
            const favoritesData = await api.request.get('/users/' + activeUser + '/top');
            const favsResult = favoritesData.data.map((hero) => { hero = parseInt(hero); return hero; });
            setFavoriteHeroes(favsResult);
            const usersData = await api.request.get('/users');
            setUsers(usersData.data);
            setIsLoading(false);
        }        
    }

    async function updateSelectedUser(userSelected) {
        setIsLoading(true);
        setActiveUser(userSelected);
        const heroesData = await api.request.get('/users/' + userSelected);
        const heroesResult = heroesData.data.map((hero) => { hero.id = parseInt(hero.id); return hero; });
        setHeroes(heroesResult);
        const favoritesData = await api.request.get('/users/' + userSelected + '/top');
        const favsResult = favoritesData.data.map((hero) => { hero = parseInt(hero); return hero; });
        setFavoriteHeroes(favsResult);
        setIsLoading(false);
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
            setActiveUser
        }}>
            { children }
        </ApiContext.Provider>
    );
};

export function useApi(){
    const context = useContext(ApiContext);
    return context;
}