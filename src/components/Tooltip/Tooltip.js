import React from 'react';
import classes from './styles.module.css'

const Tooltip = ({show, children,text}) => {



    return (
        <>
            <div className={classes.wrapper}>
                <div className={`${classes.content} ${show && classes.show}`}>
                    {text}
                </div>
                {children}
            </div>

        </>
    )
}


export default Tooltip;