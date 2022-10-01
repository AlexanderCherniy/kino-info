import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../../../redux/store-redux'
import cn from './Premier.module.css'



const Premier: React.FC = () => {
    const showerFilm = useSelector((state: AppState) => state.premieres.showerFilm)
    const staff = useSelector((state: AppState) => state.premieres.staff)
    return (
        <div className={window.innerWidth <= 970 ? cn.PremierContainerLowWidth : cn.PremierContainer}>
            <div className={window.innerWidth <= 970 ? cn.TopFilmsLowWidth : cn.TopFilms}>
                <div >
                    {showerFilm.logoUrl === null ? <h2>{showerFilm.nameRu}</h2> : <img className={cn.PremierTitle} src={showerFilm.logoUrl} />}
                </div>
                <div style={{
                    overflow: 'hidden', WebkitLineClamp: 2,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical'
                }}>
                    {showerFilm.shortDescription === null ? showerFilm.description : showerFilm.shortDescription}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 7 }}>
                    <div style={{ opacity: .6 }}>Актер:</div>
                    <div>
                        {staff.length !== undefined ? staff.filter((obj: any) => obj.professionText === 'Актеры').map((obj: any, index: number) => index < 3 ? index === 2 ? obj.nameRu : obj.nameRu + ", " : "") : ""}
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 7 }}>
                    <div style={{ opacity: .6 }}>Режиссер:</div>
                    <div>
                        {staff.length !== undefined ? staff.filter((obj: any) => obj.professionText === 'Режиссеры').map((obj: any, index: number) => index < 2 ? index === 1 ? obj.nameRu : obj.nameRu + ", " : "") : ""}
                    </div>
                </div>
            </div>
            <div className={cn.PremierImgContainer}>
                <NavLink to={`/film/${showerFilm.kinopoiskId}`}>
                    <img className={cn.PremierImg} src={showerFilm.coverUrl === null ? showerFilm.posterUrl : showerFilm.coverUrl} />
                    <div className={window.innerWidth > 970 ? cn.PremierImgBackground : ""}></div>
                </NavLink>
            </div>
        </div>
    )
}



export default Premier