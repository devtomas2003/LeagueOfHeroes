import { Fragment, useEffect } from "react";
import HeroInfo from "../Components/HeroInfo";
import Skeleton from "../Components/Skeleton";
import { Link } from "react-router-dom";
import { useUtils } from "../Contexts/Utils";

export default function Home(){
    const { loadHeroes, heroes, favoriteHeroes, isLoading } = useUtils();

    useEffect(() => {
        loadHeroes();
    }, []);

    function findHeroById(heroId) {
        return heroes.find((hero) => { return (hero.id === heroId); })
    }

    return (
        <div className="flex flex-col items-center flex-auto">
            <h1 className="mt-8 text-3xl text-zinc-800">Top-3 Heróis</h1>
            { isLoading ?
            <div className="flex space-x-4 mt-6">
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div> :
            <div className="flex space-x-4 mt-6">
                { favoriteHeroes.length !== 0 ?
                <Fragment>
                    { favoriteHeroes.map((hero) => {
                        return (<HeroInfo key={hero} heroData={findHeroById(hero)} />);
                    }) }
                </Fragment> :
                <div className="mt-6 flex flex-col items-center">
                    <img src="/notfound.svg" title="Falta de herois assola o mundo!" alt="Falta de herois assola o mundo!" className="w-[40rem]" />
                    <p className="text-zinc-800 text-4xl mt-6">A falta de herois assola o mundo!</p>
                    <p className="text-zinc-800 text-lg mt-3">Vai ao <Link to="/dashboard" className="underline">Dashboard</Link> e adiciona os teus herois favoritos!</p>
                </div>
                }
            </div> }
        </div>
    );
}