import {useEffect, useState} from "react";

export default function useKenya() {
    const [country, setCountries] = useState([{
        counties: [],
        constituencies: []

    }])
    const {constituencies, counties} = country
    useEffect(() => {
        import('kenya').then(mod => {
            setCountries(state => ({...state, constituencies: mod.constituencies, counties: mod.counties}));
        });
    }, []);


    return {counties, constituencies};
}

