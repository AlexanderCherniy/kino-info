import { useDispatch } from 'react-redux'
import cn from './Header.module.css'
import React, { useEffect, useState } from 'react';
import { setSearchValue } from '../../redux/header-reducer';
import { addFilm } from '../../redux/film-search-reducer';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import DropDownMenu from './DropDownMenu/DropDownMenu';


const Header: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if(keyword !== ''){
      //@ts-ignore
      dispatch(addFilm(keyword))
      //@ts-ignore
      dispatch(setSearchValue(keyword))
    }
  }, [keyword])
  return (
    <div>
      <div className={cn.Header}>
        <div></div>
        <div className={cn.Header__Content}>
          <DropDownMenu/>
          <span className={cn.Header__Title}>KINO-INFO</span>
          <HeaderSearch keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div></div>
      </div>
    </div>
  )
}


export default Header