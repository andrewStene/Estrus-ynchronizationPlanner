import React from 'react';
import cow from'./brtf_full-color.png';

import './Header.css';

function Header()
{
    return (
        <div style={{backgroundColor: "#eeeeee"}}>
            <img src= {cow} alt="moo" />
        </div>
    );
}

export default Header;