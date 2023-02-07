import React, {useState} from 'react';
import Select from 'react-select'
import Option from 'react-select'

const ProductUpdateForm = ({
                               handleSubmit,
                               setValues,
                               handleChange,
                               values,
                               categories,
                               subOptions,
                               handleCategoryChange,
                               arrayOfSubs,
                               setArrayOfSubs,
                               selectedCategory,


                           }) => {
    const {
        title,
        description,
        price,
        shipping,
        category,
        subs,
        quantity,
        images,
        colors,
        color,
        brands,
        brand
    } = values


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    name='title'
                    className="form-control"
                    value={title}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Description</label>
                <input
                    type="text"
                    name='description'
                    className="form-control"
                    value={description}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    name='price'
                    className="form-control"
                    value={price}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Shipping</label>
                <select className="form-select " name='shipping' value={shipping === 'Yes' ? 'Yes' : 'No'}
                        onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="mb-3">
                <label>Quantity</label>
                <input
                    type="number"
                    name='quantity'
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Color</label>
                <select
                    value={color}
                    className="form-select "
                    name='color'
                    onChange={handleChange}>
                    {colors.map((c, i) => {
                        return <option value={c} key={i}>{c}</option>
                    })}
                </select>
            </div>
            <div className="mb-3">
                <label>Brand</label>
                <select
                    className="form-select "
                    name='brand'
                    value={brand}
                    onChange={handleChange}>
                    {brands.map((c, i) => {
                        return <option value={c} key={i}>{c}</option>
                    })}
                </select>
            </div>
            <div className="mb-3">
                <label>Categories</label>
                <select
                    className="form-select mb-3 mt-3"
                    name='category'
                    value={selectedCategory ? selectedCategory : category._id}
                    onChange={handleCategoryChange}>

                    {categories.length > 0 && categories.map(category => {
                        return <option
                            value={category._id}
                            key={category._id}>{category.name}</option>
                    })}
                </select>
            </div>
            <div className="mb-3">
                <label>Sub Categories</label>
                <Select
                    isMulti
                    name="subs"
                    value={arrayOfSubs}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    options={subOptions.length && subOptions}
                    onChange={(options) => setArrayOfSubs(options)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />


            </div>

            <div className="mb-3">
                <button type="submit" className="btn btn-outline-info">Save</button>
            </div>

        </form>
    );
};

export default ProductUpdateForm;