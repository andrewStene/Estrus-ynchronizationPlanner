import React from 'react';
import cow from'./brtf_full-color.png';
import './Header.css';
import {Link} from 'react-router-dom';


function Header()
{
    return (
        <div style={{backgroundColor: "#eeeeee"}}>
            <Link to = "/">
            <img src= {cow} alt="moo"/>
            </Link>
        </div>
    );
}

export default Header;