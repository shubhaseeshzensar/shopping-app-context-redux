import React, { Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useContext } from 'react';
import { CategoriesContext } from '../../components/contexts/categories.context';

const CategoriesPreview = () => {
  
    const { categoriesMap } = useContext(CategoriesContext);


    return (
      <Fragment>
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return <CategoryPreview
            key={title}
            title={title}
            products={products} />
        })}
      </Fragment>
    );
  };

export default CategoriesPreview;