/**
 *  HomePage.js
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
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CalSquare from './components/cal/CalSquare';

/**
 * The class that represents the react component that is the first page
 * that a user sees when accessing the application
 */
class HomePage extends React.Component
{
    /**
     * Render function for the class
     */
    render()
    {
        return (
            <div>
                <h1>Welcome to the Estrus Synchronization Planner</h1>
                <h1>To continue select the 'Get Started' button below</h1>
                <Button 
                    component = { Link } 
                    to        = "/namepage" 
                    color     = "defualt" 
                    variant   = "contained" 
                    size      = "large"
                >
                    Get Started
                </Button>
                
                <CalSquare/>
            </div>
        );
    } /* render() */
} /* end HomePage */
export default HomePage;