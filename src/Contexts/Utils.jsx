import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const UtilsContext = createContext({});

export const UtilsProvider = ({ children }) => {

    const [heroes, setHeroes] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(api.public);
    const [favoriteHeroes, setFavoriteHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function loadHeroes(){
        if(heroes.length === 0){
            const heroesData = await api.api.get('/users/' + activeUser);
            setHeroes(heroesData.data);
            const favoritesData = await api.api.get('/users/' + activeUser + '/top');
            setFavoriteHeroes(favoritesData.data);
            const usersData = await api.api.get('/users/');
            setUsers(usersData.data);
            setIsLoading(false);
        }        
    }

    async function updateSelectedUser(userSelected) {
        setIsLoading(true);
        setActiveUser(userSelected);
        const heroesData = await api.api.get('/users/' + userSelected);
        setHeroes(heroesData.data);
        const favoritesData = await api.api.get('/users/' + userSelected + '/top');
        setFavoriteHeroes(favoritesData.data);
        setIsLoading(false);
    }

    return (
        <UtilsContext.Provider value={{
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
        </UtilsContext.Provider>
    );
};

export function useUtils(){
    const context = useContext(UtilsContext);
    return context;
}