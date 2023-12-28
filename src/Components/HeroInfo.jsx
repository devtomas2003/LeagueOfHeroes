import { Fragment } from "react";

export default function HeroInfo(props){
    return (
        <Fragment>
            { props.heroData ?
            <div className="p-4 border flex flex-col items-center">
                <img src={props.heroData.image} title={props.heroData.name} alt={props.heroData.name} onError={(e) => { e.target.src = "https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png"; }} className="h-80" />
                <p className="mt-2 text-zinc-800 text-xl">{props.heroData.name}</p>
            </div> : null }
        </Fragment>
    );
}