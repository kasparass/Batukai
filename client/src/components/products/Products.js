import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProducts } from '../../actions/product';
import ProductItem from './ProductItem';

const Products = ({ getProducts, product: { products, loading } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="page catalog-page">
            <section className="clean-block clean-catalog dark ">
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Batukai </h2>
                  <p>Čia galite išsirinkti jums patinkančius batukus</p>
                </div>
                <div className="content">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="products">
                        <div className="row no-gutters">
                          {products.length > 0 ? (
                            products.map((product) => (
                              <ProductItem
                                key={product._id}
                                product={product}
                              />
                            ))
                          ) : (
                            <h4>No products found...</h4>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(Products);
