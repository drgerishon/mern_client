import React from 'react';
import './progress.css'
const Progress = ({page}) => {
    return (
        <div className="progress">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%"}}
                aria-valuemin="0" aria-valuemax="100"/>
        </div>
    );
};

export default Progress;