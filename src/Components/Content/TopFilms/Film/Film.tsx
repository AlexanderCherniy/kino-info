import { NavLink } from "react-router-dom"

type genresObjectType = {genre: string}
type countryType = {country: string}

type Props = {
    year: string
    filmId: string
    posterUrl: string
    nameRu: string
    nameEn: string
    genres: Array<genresObjectType>
    countries: Array<countryType>
}
const TopFilm:React.FC<Props> = (props)=>{
    return(
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.3fr', width: 185, maxHeight: 300}}>
            <NavLink style={{height: 290}} to={`/film/${props.filmId}`}><img style={{borderRadius: 8, height: 290, width: 185}} alt={props.nameRu} src={props.posterUrl}/></NavLink>
            <b>{props.nameRu}</b>
            <div style={{fontSize: 14}}>
            <div >
                {props.genres.map((obj, index, massive)=> massive.length === 1 ? <span key={index} >{obj.genre} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.genre} </span> : <span key={index}>{obj.genre}, </span> : <div key={index}></div>)}
            </div>
            <div>
                <span>{props.year}, </span> 
                {props.countries.map((obj, index, massive)=> massive.length === 1 ? <span key={index} >{obj.country} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.country} </span> : <span key={index}>{obj.country}, </span> : <div key={index}></div>)}
            </div>
            </div>
        </div>
    )
}
export default TopFilm