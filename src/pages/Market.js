import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import React, {useEffect, useState} from "react";
import {fetchProductsByFilter, getProductsByCount, minMax} from "../redux/services/product.service";
import General from "../components/wrappers/General";
import Slider from "../components/range/Slider";
import {setText} from "../redux/slices/search";
import Accordion2 from "../components/accordion/Accordion";
import {getCategories} from "../redux/services/categories";
import {getSubs} from "../redux/services/sub.service";
import {MDBCheckbox} from "mdb-react-ui-kit";
import Star from "../components/star/Star";



const Market = ({open}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {search} = useSelector((state) => ({...state}));
    const [price, setPrice] = useState([0, 0])
    const [ok, setOkay] = useState(false)
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')
    const [categoryIds, setCategoryIds] = useState([])
    const [shipping, setShipping] = useState('')
    const [star, setStar] = useState('')
    const [toggleState, setToggleState] = useState({
        activeObj: null, objects: [
            {id: 5, number: 5},
            {id: 4, number: 4},
            {id: 3, number: 3},
            {id: 2, number: 2},
            {id: 1, number: 1},
        ]
    })
    const dispatch = useDispatch()

    //load max and min prices from db
    useEffect(() => {
        minMax().then(r => {
            setPrice([r.data.lowestPriced, r.data.highestPriced])

            setMax(r.data.highestPriced);
            setMin(r.data.lowestPriced)
        })
    }, [])

    //Load all products, cats and subs on page load
    function loadAllProducts() {
        setLoading(true)
        getProductsByCount(12).then(r => {
            setProducts(r.data)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })

    }

    function loadCategories() {
        getCategories()
            .then(r => {
                setCategories(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }

    function loadSubs() {
        getSubs()
            .then(r => {
                setSubs(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }


    useEffect(() => {
        loadAllProducts()
        loadCategories()
        loadSubs()
    }, [])

    // console.log('Top',!categoryIds.length)

    // useEffect(() => {
    //     if ((categoryIds.length <= 0) || (price === [min, max])) {
    //         loadAllProducts()
    //
    //
    //     }
    // }, [categoryIds.length, max, min, price])


    const {text} = search
    // 2 .load products based on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetch({query: text})
            if (!text) {
                // loadAllProducts()
            }
        }, 300)

        return () => clearTimeout(delayed)
    }, [text])


    // 3 .load products based on price range
    const fetch = (inf) => {
        fetchProductsByFilter(inf).then(r => {
            setProducts(r.data)
        }).catch(e => {
            console.log(e)
        })


    }

    useEffect(() => {
        if (ok) {
            fetch({price})
        }
    }, [ok, price])

    const handleSlider = (val) => {
        setPrice(val)
        dispatch(setText(''))
        setCategoryIds([])
        setStar('')
        setToggleState({...toggleState, activeObj: null})
        setSub('')
        setShipping('')
        setTimeout(() => {
            setOkay(!ok)
        }, 300)

    }

    // load products based on categories


    const handleCheck = e => {
        dispatch(setText(''))
        setToggleState({...toggleState, activeObj: null})
        setPrice([min, max])
        setSub('')

        let inTheState = [...categoryIds]
        const justClicked = e.target.value
        const ifFoundInTheState = inTheState.indexOf(justClicked)
        if (ifFoundInTheState === -1) {
            inTheState.push(justClicked)
        } else {
            inTheState.splice(ifFoundInTheState, 1)
        }
        setCategoryIds(inTheState)
        fetch({category: inTheState})

    };

    function showCats() {
        return categories && categories.map(c => {

            let checked = false
            if (categoryIds.includes(c._id)) {
                checked = true
            }
            return <MDBCheckbox
                key={c._id}
                name='category'
                className='mycb'
                value={c._id}
                id={c._id}
                checked={checked}
                onChange={handleCheck}
                label={c.name}/>

        })

    }

// based on rating
    function handleStarClick(i, num) {
        setToggleState({...toggleState, activeObj: toggleState.objects[i]})
        dispatch(setText(''))
        setPrice([0, 0])
        setCategoryIds([])
        setStar(num)
        setSub('')
        setShipping('')
        fetch({stars: num})

    }

    const showStars = () => (
        <>
            {toggleState.objects.map((el, i) => {
                return <Star
                    key={i}
                    checked={toggleState.objects[i] === toggleState.activeObj}
                    starClick={() => handleStarClick(i, el.number)}
                    numberOfStar={el.number}/>
            })}
        </>
    )
    // based on subs

    const handleSubClick = (id) => {
        setSub(id)
        fetch({sub: id})
        dispatch(setText(''))
        setPrice([0, 0])
        setCategoryIds([])
        setStar('')
        setShipping('')
        setToggleState({...toggleState, activeObj: null})

    }

    function showSubs() {
        return subs.map(s => {
            return <div
                className="badge rounded-pill badge-primary m-1 p-2"
                key={s._id}
                onClick={() => handleSubClick(s._id)}
                style={{cursor: 'pointer'}}>{s.name}
            </div>

        })
    }

    //shipping
    function handleShippingChange(e) {
        dispatch(setText(''))
        setPrice([0, 0])
        setCategoryIds([])
        setStar('')
        setToggleState({...toggleState, activeObj: null})
        setShipping(e.target.value)
        fetch({shipping: e.target.value})

    }

    function showShipping() {
        return <div className='bg-white  d-flex  align-items-center'>
            <div style={{marginRight: '20px'}}>
                <MDBCheckbox
                    name='yes'
                    className=''
                    value='Yes'
                    onChange={handleShippingChange}
                    id='Yes'
                    checked={shipping === 'Yes'}
                    label='Yes'/>
            </div>
            <div>
                <MDBCheckbox
                    name='No'
                    value='No'
                    checked={shipping === 'No'}
                    onChange={handleShippingChange}
                    id='No'
                    label='No'/>
            </div>

        </div>
    }


    function showCardBody() {

        return <>
            <Accordion2
                title='Price (Ksh)'
                eventKey='0'>
                <div className='px-3'>
                    {max && min && <Slider handleChange={handleSlider} value={price} min={min} max={max}/>}
                </div>
            </Accordion2>
            <Accordion2 title='Categories' eventKey='1'>
                <div className='px-3'>
                    {showCats()}
                </div>
            </Accordion2>
            <Accordion2 title='Rating' eventKey='2'>
                <div className='px-3'>
                    {showStars()}
                </div>
            </Accordion2>
            {subs.length > 0 && <Accordion2 title='Sub Categories' eventKey='3'>
                <div className='px-3'>
                    {showSubs()}
                </div>
            </Accordion2>}
            <Accordion2 title='Shipping' eventKey='4'>
                <div className='px-3'>
                    {showShipping()}
                </div>
            </Accordion2>


        </>
    }


    return (
        <General title={loading ? <p>Loading...</p> :
            <div><h4>{products.length} </h4></div>}
                 showCard={true}
                 cardHeaderContent='Search and Filter'
                 cardBody={showCardBody()}>
            <div className="card">
                <div className="card-header">
                    <h5 className='card-title'>
                        {products.length === 1 && `${products.length} product found`}
                        {products.length <= 0 && `No product found`}
                        {products.length > 1 && `${products.length} products found`}

                    </h5>
                </div>
                <div className="row g-3">
                    {
                        products.map(product => <div className='col-lg-4 col-md-6 mb-3' key={product._id}>
                                <ProductCard
                                    product={product}
                                    market={true}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </General>

    );
};

export default Market;