import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../components/contexts/categories.context';
import './category.styles.scss';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';


const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState([categoriesMap[category]])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (

        <Fragment className='category-container'>
            <h3 className='title'>{category}</h3>
            {
                products &&
                products.map((product) =>
                    <ProductCard key={product.id}
                        product={product} />)}
        </Fragment>
    );
};

export default Category;


// user = {
//     id: 100, name: 'David', role: 'Admin'
// }

// user = {...user, user.role: "Customer"}