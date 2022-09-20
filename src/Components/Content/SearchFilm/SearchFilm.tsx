import cn from './SearchFilm.module.css'
import { useEffect, useState } from "react"
import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../../redux/store-redux"
import { useDispatch } from "react-redux"
import { addFilm } from "../../../redux/film-search-reducer"
const SearchFilm: React.FC = () => {
    const SearchValueHeader = useSelector((state:AppState)=> state.header.SearchValue)
    const [keyword, setKeyword] = useState(SearchValueHeader !== '' ? SearchValueHeader : 'Казуал')
    let timeoutId = setTimeout(()=> setKeyword(keyword), 1000)
    const Films = useSelector((state:AppState)=> state.filmSearch.Films)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        //@ts-ignore
        dispatch(addFilm(keyword))
    }, [keyword])
    return( 
    <div>
        <div>
            <div className={cn.SearchContainer}>
                <div className={cn.SearchFilmFlexContainer}>
                    <input  ref={inputRef} onChange={()=> {
                        //@ts-ignore
                        let text = inputRef.current.value
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(()=> setKeyword(text), 1000)
                        }} autoComplete='off' name='keyword' className={cn.Search} placeholder="Введите Название Фильма" defaultValue={keyword}/>
                </div>
            </div>
            {/* {Films.length !== 0 ? Films.map((film: any)=> <div key={film.filmId}><img src={film.posterUrlPreview}/></div>) : <></>} */}
            {Films.length !== 0 ? 
            <div className={cn.Film}>
                {/* @ts-ignore */}
                <img className={cn.Preview} src={Films[0]?.posterUrlPreview}/>
                {/* @ts-ignore */}
                <span className={cn.Description}>{Films[0]?.description}</span>
            </div> : <></>}
        </div>
    </div>
    )
}


export default SearchFilm