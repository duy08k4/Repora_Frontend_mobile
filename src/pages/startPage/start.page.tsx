import React from "react"

// Import spinner
import { MoonLoader } from "react-spinners"

// Import image
import ReporaLogo from "../../assets/Repora_Logo.png"

// Import css
import "./start.page.css"

const StartPage: React.FC = () => {
    return (
        <div className="startPage">
            <div className="startPage__section">
                <img src={ReporaLogo} alt="Repora Logo" />
                <h2 className="startPage__section--content">Repora</h2>
            </div>

            <div className="startPage__spinner">
                <MoonLoader size={40} />
            </div>
        </div>
    )
}

export default StartPage