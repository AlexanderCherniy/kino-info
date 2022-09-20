import { Dropdown, Menu, Space } from "antd"
import { AppstoreOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";


const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <NavLink to={'/topFilms'} >
              Главная
            </NavLink>
          ),
        },
        {
          key: '2',
          label: (
            <NavLink to={'/global-search'} >
              Search
            </NavLink>
          ),
        },
      ]}
    />
  );

const DropDownMenu:React.FC = () =>{
    return(
        <>
            {window.innerWidth <= 1250
            ?
            <Dropdown overlay={menu} trigger={['click']}>
              <Space>
                <AppstoreOutlined style={{ color: 'white', fontSize: 30 }} />
              </Space>
            </Dropdown> : <></>}
        </>
    )
}


export default DropDownMenu