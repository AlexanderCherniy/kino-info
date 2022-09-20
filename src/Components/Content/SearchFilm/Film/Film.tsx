import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFilm, getFilmImages, getSimilars } from "../../../../redux/film-reducer";
import { AppState } from "../../../../redux/store-redux";
import cn from './Film.module.css'
import cnSimilars from './Similars.module.css'

const Film: React.FC = () => {
    const FilmInfo = useSelector((state: AppState) => state.film.FilmInfo)
    const Similars = useSelector((state: AppState) => state.film.Similars)
    const Images = useSelector((state: AppState) => state.film.Images)
    const [counter, setCounter] = useState<number>(0)
    const [SimilarsCounter, setSimilarsCounter] = useState<number>(0)
    const filmId = window.location.href.split('/').slice(-1)[0]
    
    const dispatch = useDispatch()
    if (counter === 0) {
        setCounter(1)
        //@ts-ignore
        dispatch(addFilm(filmId))
        //@ts-ignore
        dispatch(getSimilars(filmId))
        //@ts-ignore
        dispatch(getFilmImages(filmId))
    }
    useEffect(()=>{
        //@ts-ignore
        dispatch(addFilm(filmId))
        //@ts-ignore
        dispatch(getSimilars(filmId))
        //@ts-ignore
        dispatch(getFilmImages(filmId))
    }, [SimilarsCounter])
    return (
        <>
            <div className={cn.Film}>
                <div className={cn.PosterContainer}>
                    <img className={cn.Poster} src={FilmInfo.posterUrl} />
                    <div className={cn.Description}>
                        {FilmInfo?.shortDescription}
                    </div>
                </div>
                <div>
                    <div><b className={cn.name}>{FilmInfo?.nameOriginal}</b></div>
                    {FilmInfo?.logoUrl === null ? <div><b className={cn.name}> FilmInfo.nameRu </b></div> : <img className={cn.ImgLogo} src={FilmInfo.logoUrl} />}
                    <div>
                        <h2>О Фильме:</h2>
                        <div>Год Выпуска: <span>{FilmInfo?.year}</span></div>
                        <div>Длительность: <span>{FilmInfo?.filmLength}m</span></div>
                        <div>Слоган: <span>"{FilmInfo?.slogan}"</span></div>
                        <div>Жанры: <span>{FilmInfo?.genres?.map((genre: any, index: number) => <span key={index}>{ index + 1 !== FilmInfo?.genres?.length ? genre.genre + ", " : genre.genre}</span>)} </span></div>
                        <div>Страны в фильме: <span>{FilmInfo?.countries?.map((country: any, index: number) => <span key={index}>{ index + 1 !== FilmInfo?.countries?.length ? country.country + ', ' : country.country}</span>)} </span></div>
                        <div>Можно смотреть с: <span>{FilmInfo?.ratingAgeLimits} Лет</span></div>
                        <div>В 3D: <span>{FilmInfo?.has3D === true ? 'Да' : 'Нет'}</span></div>
                        <div>
                            {Images.length !== 0 ? <img src={Images?.items[0].previewUrl}/> : <></>}
                            {Images.length !== 0 ? <img src={Images?.items[1].previewUrl}/> : <></>}
                            {Images.length !== 0 ? <img src={Images?.items[2].previewUrl}/> : <></>}
                        </div>
                </div>
                </div>
            </div>
            <div>
                <h2>Найдено похожих фильмов: {Similars.total}</h2>
                Сделай слайдер свайпер ю ной броу и вставляй его куданибудь где много объектов
                <div style={{display: 'flex', flexWrap: 'wrap'}}>{Similars?.items?.map((film: any, key: number)=> <div key={film.filmId}> <NavLink onClick={()=> {setSimilarsCounter(SimilarsCounter + 1); window.scrollTo(0, -200)}} to={`/film/${film.filmId}`}><img className={cnSimilars.FilmPreview} src={film.posterUrlPreview}/></NavLink> </div>)}</div>
            </div>
        </>
    )
}

export default Film