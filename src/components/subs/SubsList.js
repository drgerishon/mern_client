import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getSubs} from '../../redux/services/sub.service';

const SubsList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs()
            .then((response) => {
                setSubs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const showSubs = () => {
        return subs.map((sub) => {
            return (
                <div className="col-md-3 mb-3" key={sub._id}>
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <Link to={`/sub/${sub.slug}`} className="card-link">
                                <h5 className="card-title mb-0">{sub.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Shop by Subcategories</h2>
            <div className="row">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    showSubs()
                )}
            </div>
        </div>
    );
};

export default SubsList;
