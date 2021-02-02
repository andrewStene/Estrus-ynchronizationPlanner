/**
 * HomePage.js
 */
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

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
                <Button component={Link} to="/namepage" color="defualt" variant="contained" size = "large">Get Started</Button>
            
            </div>
            );
    }
}


export default HomePage;