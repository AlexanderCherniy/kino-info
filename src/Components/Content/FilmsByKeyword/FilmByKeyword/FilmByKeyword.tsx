import { NavLink } from "react-router-dom"

type genresObjectType = {genre: string}
type countryType = {country: string}

type Props = {
    index: number
    array: any
    year: string
    filmId: string
    posterUrl: string
    nameRu: string
    nameEn: string
    genres: Array<genresObjectType>
    countries: Array<countryType>
}
const FilmByKeyword:React.FC<Props> = (props)=>{
    
    
    return(
        <div style={{ maxWidth: 200}}>
            <img style={{height: 290, borderRadius: 8}} alt={props.nameRu} src={props.posterUrl}/> 
            <b>{props.nameRu}</b>
            <div style={{fontSize: 14}}>
            <div >
                {props.genres.map((obj, index, massive)=> massive.length === 1 ? <span key={index} >{obj.genre} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.genre} </span> : <span key={index}>{obj.genre}, </span> : <div key={index}></div>)}
            </div>
            <div>
                <span>{props.year}, </span> 
                {props.countries.map((obj, index, massive)=> massive.length === 1 ? <span key={index} >{obj.country} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.country} </span> : <span key={index}>{obj.country}, </span> : <div key={index}></div>)}
                <NavLink to={`/film/${props.filmId}`}>Узнать больше</NavLink>
            </div>
            </div>
        </div>
    )
}
export default FilmByKeyword