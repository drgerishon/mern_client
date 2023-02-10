import React from 'react';
import {setText, setTouched} from "../../redux/slices/search";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useHistory, useLocation} from "react-router-dom";
import {Icon} from '@iconify/react';
import {MDBInput} from "mdb-react-ui-kit";


const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {search} = useSelector((state) => state);
    const {text} = search
    const location = useLocation();

    function handleChange(e) {
        e.preventDefault()
        dispatch(setText(e.target.value))

    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/market?${text}`)

    }



    return (

        <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
            <input
                onChange={handleChange}

                type="text"
                autoFocus={location.pathname === '/market'}
                value={text}
                placeholder="Search"
                title="Enter search keyword"/>
            <button type="submit" title="Search">
                <Icon icon="bi:search" onClick={handleSubmit} style={{cursor: 'pointer'}} className="icon"
                      fontSize={20}/>
            </button>
        </form>
    );
};

export default Search;