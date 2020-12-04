import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import bp from './bp.png';
import hp from './hp.png';

function Reference()
{
    return(
        <div>
            <h1>Reference Information</h1>
            <img src= {bp} alt="bp" />
            <img src= {hp} alt="hp" />
            <br/>
            <Button className = "sidebysidebutton" component={Link} to="/" color="defualt" variant="contained" size = "small" >Home</Button>            
        </div>
    );
}

export default Reference;