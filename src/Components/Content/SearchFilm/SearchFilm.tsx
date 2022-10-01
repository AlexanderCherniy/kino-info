import cn from './SearchFilm.module.css'
import { useEffect, useState } from "react"
import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../../redux/store-redux"
import { useDispatch } from "react-redux"
import { addFilm } from "../../../redux/film-search-reducer"
import { NavLink } from 'react-router-dom'
const SearchFilm: React.FC = () => {
    const SearchValueHeader = useSelector((state: AppState) => state.header.SearchValue)
    const [keyword, setKeyword] = useState(SearchValueHeader !== '' ? SearchValueHeader : 'Казуал')
    let timeoutId = setTimeout(() => setKeyword(keyword), 1000)
    const Films = useSelector((state: AppState) => state.filmSearch.Films)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(addFilm(keyword))
    }, [keyword])

    return (
        <div>
            <div>
                <div className={cn.SearchContainer}>
                    <div className={cn.SearchFilmFlexContainer}>
                        <input ref={inputRef} onChange={() => {
                            //@ts-ignore
                            let text = inputRef.current.value
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(() => setKeyword(text), 1000)
                        }} autoComplete='off' name='keyword' className={cn.Search} placeholder="Введите Название Фильма" defaultValue={keyword} />
                    </div>
                </div>
                {/* {Films.length !== 0 ? Films.map((film: any)=> <div key={film.filmId}><img src={film.posterUrlPreview}/></div>) : <></>} */}
                {Films.length !== 0 ?
                    <div className={cn.Film}>
                        <NavLink to={`/film/${Films[0]?.filmId}`}>
                            <img className={cn.Preview} src={Films[0]?.posterUrlPreview} />
                        </NavLink>
                        <div>
                            <h2 className={cn.Name}>{Films[0]?.nameRu !== null ? Films[0]?.nameRu : Films[0]?.nameEn}</h2>
                            <div>Жанры: {Films[0]?.genres.map((obj: any, index: number, massive: any)=> massive.length === 1 ? <span key={index} >{obj.genre} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.genre} </span> : <span key={index}>{obj.genre}, </span> : <div key={index}></div>)}</div>
                            <div>Снято в: {Films[0]?.countries.map((obj: any, index: number, massive: any)=> massive.length === 1 ? <span key={index} >{obj.country} </span> : index < 2 ? index === 1 ? <span key={index}>{obj.country} </span> : <span key={index}>{obj.country}, </span> : <div key={index}></div>)}</div>
                            <span className={cn.Description}>{Films[0]?.description}</span>
                        </div>
                    </div> : <></>}
            </div>
        </div>
    )
}


export default SearchFilm