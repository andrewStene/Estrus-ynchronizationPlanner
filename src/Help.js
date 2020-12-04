import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core'

function Help()
{
    return(

        <div>
            <h1>How to use</h1>
            <br></br>
            <p> Space, the final frontier. 
                These are the voyages of the Starship Enterprise. 
                Its continuing mission to explore strange new worlds, to seek out new life and new civilization, to boldly go where no one has gone before…</p>
            <Button className = "sidebysidebutton" component={Link} to="/" color="defualt" variant="contained" size = "small" >Return</Button>

        </div>

    );


}
export default Help;