
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import  "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import NavBar from "./component/NavBar.tsx";
import Home from "./page/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShowPokemon from "./page/ShowPokemon.tsx";
import "./App.css"
import Generation from "./page/Generation.tsx";
import SearchPokemon from "./page/SearchPokemon.tsx";
import SearchAdvancedPokemon from "./page/SearchAdvancedPokemon.tsx";
function App() {
    return (
    <div className={"overflow-x-hidden"} style={{background:"#353535" , width:"100%" , minHeight:"100vh"}}>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/pokemon/:name"} element={<ShowPokemon key={0} pokemon={null} />}/>
                    <Route path={"/pokemon/gen"} element={<Generation/>}/>
                    <Route path={"/pokemon/search"} element={<SearchPokemon/>}/>
                    <Route path={"/pokemon/advancedSearch"} element={<SearchAdvancedPokemon/>}/>
                </Routes>
            </BrowserRouter>
    </div>
  )
}

export default App
