import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilms } from "../../../redux/films-reducer";
import { AppState } from "../../../redux/store-redux";
import cn from './Films.module.css'
import { ZoomInOutlined } from '@ant-design/icons';
const Films:React.FC = () =>{
    const dispatch = useDispatch()
    const Category = window.location.href.split('/').slice(-1)[0]
    const Films = useSelector((state: AppState) => state.films.Films)
    const [page, setPage] = useState(1)
    let SelectedCategory = ''
    if(Category === 'top250') SelectedCategory = 'TOP_250_BEST_FILMS'
    else if(Category === 'popular') SelectedCategory = 'TOP_100_POPULAR_FILMS'
    else if(Category === 'expected') SelectedCategory = 'TOP_AWAIT_FILMS'
    useEffect(() => {
        //@ts-ignore
        dispatch(addFilms(page, SelectedCategory, 'topFilms'))
    }, [SelectedCategory, page])
    console.log(page);
    let pagesCount = 13
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = page;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);
    return(
        <div className={cn.FilmsPage}>
            {Films?.length !== undefined ? Films?.map((film: any,index: number) => {
                let filmHours = Number(film.filmLength.split('')[1])
                let filmMinutesString = Number(film.filmLength.split(':')[1])
                let filmMinutes = filmHours * 60 + filmMinutesString
                return(
                    <div className={cn.Film} key={film.filmId}>
                        <div className={cn.filmNumber}>{index + 1 + (page * 20) - 20}</div>
                        <img style={{height: 108, width: 72}} src={film.posterUrlPreview}/>
                        <div className={cn.FilmInfo}>
                            <span className={cn.FilmName}>{film.nameRu}</span>
                            <span style={{fontWeight: '500'}} className={cn.FilmAccurateInfo}>{film.nameEn !== null ? film.nameEn + "," : ""} </span>
                            <span className={cn.FilmAccurateInfo}>{film.year}г, {filmMinutes + ' мин.'} </span>
                            <span className={cn.FilmCountry}>{film.countries[0].country} • {film.genres[0].genre}</span>
                        </div>
                        <div>
                            <span className={cn.rating}>
                                ⚡
                                {film.rating}
                                ⚡
                            </span>
                            <span className={cn.ratingVoteCount}>
                                {film.ratingVoteCount}
                            </span>
                        </div>
                        <button className={cn.knowMore}><ZoomInOutlined /> Узнать больше</button>
                    </div>
                ) 
            }) : ""}

            {page > 1 ? <button onClick={()=>  setPage(page-1)}>←</button> : <></>}
            <>{slicedPages.map(p => {
                return(
                    <span key={p} onClick={() => setPage(p)} className={page === p ? cn.activeNum : cn.noactiveNum}>
                        {p}
                    </span>
                )
            })}</>
            {page <= 12 ? <button onClick={()=>  setPage(page+1)}>→</button>  : <></>}
            
        </div>
    )
}


export default Films