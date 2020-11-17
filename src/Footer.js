import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
function Footer()
{
    return (
        <div className= "Footer">
            <ul>
            <li><Link to = "/help">Help</Link></li>
            <li><Link to = "/reference">Reference</Link></li>
            <li><a href= "https://beefrepro.org">Beef Reproduction Task Force Homepage</a></li>
            </ul>
        </div>
    );
}
export default Footer;