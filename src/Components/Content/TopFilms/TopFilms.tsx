import cn from "./TopFilms.module.css"
import Top250Films from "./Top250Films/Top250Films";
import Premier from "./Premier/Premier";
import Top100PopularFilms from "./Top100PopularFilms/Top100PopularFilms";
import ExpectedFilms from "./ExpectedFilms/ExpectedFilms";
const TopFilms: React.FC = () => {
    return (
        <div className={cn.TopFilmsContainer}>
            <Premier />
            <div className={cn.Category}>
            <h2 style={{fontSize: 30}}>Категории</h2>
            <Top250Films/>
            <Top100PopularFilms/>
            <ExpectedFilms/>
        </div>
        </div>
    )
}
export default TopFilms
