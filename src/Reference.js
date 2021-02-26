/**
 *  Reference.js
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
import { Button } from '@material-ui/core';
import bp from './bp.png';
import hp from './hp.png';

/**
 * React component that represents a refernce type page
 */
function Reference()
{
    return(
        <div>
            <h1>Reference Information</h1>
            <img src = { bp } alt = "bp" />
            <img src = { hp } alt = "hp" />
            <br/>
            <Button 
                className = "sidebysidebutton" 
                component = { Link } 
                to        = "/" 
                color     = "defualt" 
                variant   = "contained" 
                size      = "small" 
            >
                Home
            </Button>            
        </div>
    );
}/* Reference() */
export default Reference;