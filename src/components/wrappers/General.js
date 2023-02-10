import React, {useEffect, useState} from 'react';
import {Link, useLocation, useOutletContext} from "react-router-dom";


const General = ({children, cardFooterContent, title, cardBody, showCard, cardHeaderContent}) => {
    const {open} = useOutletContext();
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState('');


    useEffect(() => {
        let linkPath = location.pathname.split('/');
        linkPath.shift()
        let last = location.pathname.substring(1).replaceAll(/-/g, ' ')

        if (linkPath.length > 0) {
            last = linkPath[linkPath.length - 1].replace(/-/g, ' ')
        }
        setBreadcrumbs(last);

    }, [location])


    return (

           <div className='container'>
                <div className='row'>
                {showCard && <div className={open ? 'd-none' : 'col-md-3 '}>
                <div className={`card mb-3 ${!open ? 'mt-0' : ''}`}>
                    {cardHeaderContent && <div className='card-header'>
                        {cardHeaderContent}

                    </div>}
                    {cardBody && <div className="card-body">

                        {cardBody}
                    </div>}
                    {cardFooterContent && <div className='card-footer'>
                        {cardFooterContent}
                    </div>}
                </div>
            </div>}
            <div className={open || !showCard ? 'col-md-12' : 'col-md-9'}>
                <div className={'container-fluid'}>
                    {open && (
                        <div className="pagetitle">
                            <h1>{title}</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">{breadcrumbs}</li>
                                </ol>
                            </nav>
                        </div>
                    )
                    }

                    {children}
                </div>
            </div>
        </div>

           </div>

    );
};

export default General;