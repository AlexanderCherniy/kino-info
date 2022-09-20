import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import Film from "./Components/Content/SearchFilm/Film/Film";
import FilmsByKeyword from "./Components/Content/FilmsByKeyword/FilmsByKeyword";
import Name from "./Components/Content/Name/Name";
import Search from "./Components/Content/Search/Search";
import TopFilms from "./Components/Content/TopFilms/TopFilms";
import HeaderComponent from './Components/Header/Header'
import SideBar from "./Components/SideBar/SideBar";
import SearchFilm from "./Components/Content/SearchFilm/SearchFilm";


const { Header, Footer, Content } = Layout;
const App: React.FC = () => {
  
  return (
    <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',height: '100%', backgroundColor: '#f4f4f4' }}>
      <Header><HeaderComponent /></Header>
      <Layout style={{paddingTop: 65}}>
        <Layout style={window.innerWidth > 1250 ? {display: 'grid', gridTemplateColumns: '1.1fr 1.8fr 10fr 1.1fr'} : {display: 'grid', gridTemplateColumns: '1.1fr 10fr 1.1fr'}}>
          <div></div>
          <SideBar />
          <Layout>
            <Content style={{ flex: '1 0 auto', padding: '10px 30px', backgroundColor: 'white', minHeight: '80vh' }}>
              <Routes>
                <Route path='/topFilms' element={<TopFilms />} />
                <Route path='/filmsByKeyword' element={<FilmsByKeyword />} />
                <Route path='/global-search' element={<Search />} />
                <Route path='/search/film' element={<SearchFilm />} />
                <Route path='/film/*' element={<Film />} />
                <Route path='/name/*' element={<Name />} />
                <Route path="/" element={<Navigate to="/topFilms" />} />
              </Routes>
            </Content>
          </Layout>
          <div></div>
        </Layout>
      </Layout>
      <Footer style={{ backgroundColor: 'gray', flex: '0 0 auto' }}>Footer</Footer>
    </Layout>
  );
}

export default App;
