import React from "react";
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <div id="container">
            <div className="content">
                <h2>404</h2>
                <h4>Opps! Page Not Found</h4>
                <p>
                    The page you were looking for doesn't exist. You may have mistyped the address or the 
                    page may have moved
                </p>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound