import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../../redux/store-redux';
import cn from './HeaderSearch.module.css'

type Props = {
    keyword: string
    setKeyword: any
}

const HeaderSearch: React.FC<Props> = ({keyword, setKeyword}) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    let timeoutId = setTimeout(() => setKeyword(keyword), 1000)
    const Films = useSelector((state:AppState)=> state.filmSearch.Films)
    return (
        <>
            <input className={cn.SearchFilmInput} ref={inputRef} onChange={() => {
                //@ts-ignore
                let text = inputRef.current.value
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setKeyword(text), 1000)
            }} autoComplete='off' name='keyword' placeholder="Введите Название Фильма" defaultValue={keyword} />
            {keyword !== '' ? <NavLink to='/search/film'>Найти</NavLink> : <></>}
        </>
    )
}



export default HeaderSearch