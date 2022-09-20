import { Layout } from "antd";
import cn from './SideBar.module.css'
import { ShopOutlined, PauseCircleOutlined } from '@ant-design/icons';
import SideBarLink from "./SideBarLink/SideBarLink";
const { Sider } = Layout;

const SideBarLinks = [
    {to: '/topFilms', icon: <ShopOutlined className={cn.LinkIcon}/>, text: 'Главная', id: 1},
    {to: '/global-search', icon: <PauseCircleOutlined className={cn.LinkIcon}/>, text: 'Search', id: 2},
    {to: '/search/film', icon: <PauseCircleOutlined className={cn.LinkIcon}/>, text: 'Фильмы', id: 3}
]

const SideBar:React.FC = () => {
    return(
        <>
            {window.innerWidth > 1250 
            ? 
            <Sider className={cn.SideBar}>
                {SideBarLinks.map((link)=> <SideBarLink link={link}/>)}
            </Sider>
            : <></>}
        </>
    )
}



export default SideBar