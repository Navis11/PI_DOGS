import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

//Cambiar los nombres de las clases
export default function LandingPage () {
    return (
        <div className = 'LandingBackground'> 
            <h1 className = 'LandingTitle'>Welcome to Dogs' App 🐾</h1>
            <Link to="/home">
                <button className = 'LandingButton'>Let's get started!</button>
            </Link> 
        </div>
    )
}