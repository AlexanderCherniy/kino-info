import FilmsByKeyword from '../FilmsByKeyword/FilmsByKeyword'
import FindParticipantsFilm from './FindParticipantsFilms/FindParticipantsFilms'
import cn from './Search.module.css'

const Search:React.FC = () =>{
    return(
        <div>
            <div>Это поисковая страница, форма для поиска фильмов, слева для поиска актеров</div>
            <div className={cn.BlocksContainer}>
                <div style={{borderRight: '1px rgba(31,31,31,.1) solid'}}>
                    <FilmsByKeyword />
                </div>
                <div>
                    <FindParticipantsFilm />
                </div>
            </div>
        </div>
    )
}



export default Search