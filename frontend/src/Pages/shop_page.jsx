import { Item } from "../Componenst/shopping/Counter"
import {useNavigate} from "react-router-dom"
import { useContext, useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();


export default function ShopPage(){


    const navigate = useNavigate();
    const login = () => {
        navigate("/login");
    }

    const [dark ,setDark] = useState(true)

    function handleClick () {
        setDark(prevdark => !prevdark);
    }

    
    return(
        <ThemeContext.Provider value = {dark}>
        <div>
            <h1>Shop Page</h1>

            <button className="btn btn-success" onClick={login}>
                go to login
            </button>
            <button onClick={handleClick}>change color  = {dark}</button>

            <Themechange/>

            
            <Item/>
            <Item/>


           
            <div>
            </div>

        </div>
        </ThemeContext.Provider>
    )
}

function Themechange(){

    const darktheme = useContext(ThemeContext)

    const themestyles = {
        backgroundColor : darktheme ? '#333'  : '#CCC',
        margin: '2rem',
    }

    return(
        <div style={themestyles} >
            color changing theme
        </div>
    )

}