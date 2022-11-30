import { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addConcreteInfoPartipicant, FilmByPerson } from "../../../redux/participants-reducer";
import { AppState } from "../../../redux/store-redux";
import cn from './Name.module.css'
import RandomFilm from './RandomFilm.module.css'
import SliderCn from '../../Slider/Slider.module.css'
import TopFilm from "../TopFilms/Film/Film";
import React from "react";

const randomNumberFunc = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumber = randomNumberFunc(0, 5)


const Name: React.FC = () => {
    const InfoPartipicant = useSelector((state: AppState) => state.participants.ConcreteInfoPartipicants)
    const RandomNumber = useSelector((state: AppState) => state.participants.RandomNumberFilmByPerson)
    const ImagesFilm = useSelector((state: AppState) => state.participants.ImagesByRandomFilm)
    const Film = useSelector((state: AppState) => state.participants.FilmByPerson)
    const Similars = useSelector((state: AppState) => state.participants.SimilarsByRandomFilm)
    const nameId = window.location.href.split('/').slice(-1)[0]
    const [counter, setCounter] = useState(0)
    const [linePosition, setLinePosition] = useState(0)
    const dispatch = useDispatch()
    if (InfoPartipicant.length === 0) {
        //@ts-ignore
        dispatch(addConcreteInfoPartipicant(nameId))
    }
    useEffect(() => {
        //@ts-ignore
        if (RandomNumber !== null) dispatch(FilmByPerson(InfoPartipicant[0]?.films[RandomNumber].filmId))
    }, [RandomNumber])
    const SliderLineRef = useRef<any>();
    useEffect(()=>{
        console.log(SliderLineRef !== null ? SliderLineRef?.current?.getBoundingClientRect() : "");
    }, [ImagesFilm])
    console.log(SliderLineRef !== null ? SliderLineRef?.current?.getBoundingClientRect() : "");
    return (
        <div className={cn.Person}>
            <div className={cn.PhotoContainer}>
                <img className={cn.Photo} src={InfoPartipicant[0]?.posterUrl} />
                <div className={cn.Fact}>
                    <span className={cn.FactTitle}>Один из фактов: </span>
                    Сделай чтобы было не ровно 5 максимум рандомного числа, а типа длина массива - 1
                    <span className={cn.FactResponse}>{InfoPartipicant[0]?.facts[randomNumber]}</span></div>
            </div>
            <div style={{ paddingTop: 20 }}>
                <div><b className={cn.nameRu}>{InfoPartipicant[0]?.nameRu}</b></div>
                <div className={cn.nameEn}>{InfoPartipicant[0]?.nameEn}</div>
                <div>
                    <h2>О Персоне</h2>
                    <div className={cn.InfoBlock}>
                        <div className={cn.TitleBlock}>
                            <div>Рост: </div>
                            <div>Профессии: </div>
                            <div>Место рождения: </div>
                            <div>Дата рождения: </div>
                            <div>Супруга: </div>
                        </div>
                        <div className={cn.ResponseBlock}>
                            <div>{InfoPartipicant[0]?.growth}</div>
                            <div>{InfoPartipicant[0]?.profession}</div>
                            <div>{InfoPartipicant[0]?.birthplace}</div>
                            <div>{InfoPartipicant[0]?.birthday} • {InfoPartipicant[0]?.age} лет</div>
                            <div>{InfoPartipicant[0]?.spouses.map((spous: any, index: number) => <div key={index}>{spous.name} • Детей {spous.children} {spous.divorced === true ? '• Развод' : ""}</div>)} </div>
                        </div>
                        {InfoPartipicant[0]?.death !== null ? <div>Умер в {InfoPartipicant[0]?.death}, был похоронен в {InfoPartipicant[0]?.deathplace} </div> : <></>}
                    </div>
                    <div  style={{ display: 'flex' }}>
                        <div >
                            <NavLink to={`/film/${Film?.kinopoiskId}`}><img className={RandomFilm.Poster} src={Film?.posterUrlPreview} /></NavLink>
                            <div>{Film?.nameRu !== null ? Film?.nameRu : Film?.nameOriginal}</div>
                        </div>
                        {ImagesFilm?.items !== undefined && ImagesFilm?.items.length !== 0 ?
                            <div  style={{minWidth: 500, marginLeft: 30}} className={SliderCn.SliderContainer}>
                                {linePosition !== 0 ? <div className={SliderCn.ScrollMinus} onClick={() => setLinePosition(linePosition + 190)}>
                                    <LeftOutlined style={{ fontSize: 35, color: '#141414' }} />
                                </div> : <></>}
                                <div  className={SliderCn.Slider}>
                                    <div ref={SliderLineRef} style={{ left: linePosition }} className={SliderCn.SliderLine}>
                                        {ImagesFilm?.items?.map((image: any) => <img style={{maxHeight: 288}} src={image.imageUrl}/>)}
                                    </div>
                                </div>
                                <div className={SliderCn.ScrollPlus} onClick={() => {
                                    setCounter(counter + 1)
                                    setLinePosition(linePosition - 190)
                                }}><RightOutlined style={{ fontSize: 35, color: '#141414' }} /></div>
                            </div>
                            : <></>}
                    </div>
                    <div>{Similars?.items?.map((film: any) => <NavLink key={film.filmId} to={`/film/${film.filmId}`}><img style={{ maxHeight: 288 }} src={film.posterUrlPreview} /></NavLink>)}</div>
                </div>
            </div>
        </div>
    )
}

export default Name