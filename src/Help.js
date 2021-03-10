/**
 *  Help.js
 *  Copyright (C) 2021  Andrew Stene, Ben Amos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *   
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'

/**
 * React component that implements the help page
 */
class Help extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            prevPage: props.link
        }
          
        
    }
    render(){
        return(
            <div>
                <h1>How to use</h1>
                <br></br>
                <p> Space, the final frontier. 
                    These are the voyages of the Starship Enterprise. 
                    Its continuing mission to explore strange new worlds, to seek out new life and new civilization, 
                    to boldly go where no one has gone before…
                </p>
                <Button 
                    className = "sidebysidebutton" 
                    component = { Link } 
                    to        = {this.state.prevPage} 
                    color     = "defualt" 
                    variant   = "contained" 
                    size      = "small" 
                >
                    Return
                </Button>
            </div>
        );
    }
    
} /* Help() */
export default Help;