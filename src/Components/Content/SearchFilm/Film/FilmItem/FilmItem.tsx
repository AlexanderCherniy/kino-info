import { NavLink } from "react-router-dom";
import SliderCn from '../../../../Slider/Slider.module.css'
import cn from './FilmItem.module.css'

type Props = {
    SimilarsCounter: number
    setSimilarsCounter: any
    setLinePosition: any
    film: any
}

const FilmItem:React.FC<Props> = (props)=>{
    const NavLinkFunction = () =>{
        props.setLinePosition(0);
        props.setSimilarsCounter(props.SimilarsCounter + 1);
        window.scrollTo(0, -200)
    }
    return(
        <div className={SliderCn.SliderItem} key={props.film.filmId}>
            <NavLink style={{height: 200}} onClick={()=> NavLinkFunction()} to={`/film/${props.film.filmId}`}>
                <img className={SliderCn.SliderPreview} src={props.film.posterUrlPreview}/>
            </NavLink>
        </div>
    )
}


export default FilmItem