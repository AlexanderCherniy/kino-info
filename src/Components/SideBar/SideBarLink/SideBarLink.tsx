import { NavLink } from "react-router-dom"
import cn from './SideBarLink.module.css'




type LinkType = {
    to: string
    text: string
    icon: any
}
type Props = {
    link: LinkType
}

const SideBarLink:React.FC<Props> = ({link}) => {
    return(
        <NavLink className={link => link.isActive ? cn.SideBar__Active_Link : cn.SideBar__Link} to={link.to}>{link.icon} {link.text}</NavLink>
    )
}



export default SideBarLink