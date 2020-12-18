import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProductById } from '../../actions/product';
import { addToCart } from '../../actions/cart';
import formatDate from '../../utils/formatDate';

const Product = ({
  addToCart,
  getProductById,
  product: { product, loading },
  auth: { isAuthenticated },
  match,
}) => {
  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match.params.id]);

  return (
    <Fragment>
      {product === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="page product-page">
            <section className="clean-block clean-product dark">
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Batukai</h2>
                </div>
                <div className="block-content">
                  <div className="product-info">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="gallery">
                          {/* <div className="sp-wrap">  */}
                          <a href="/assets/img/shoes/DSC_0239.jpg">
                            <img
                              className="img-fluid d-block mx-auto"
                              src="/assets/img/shoes/DSC_0239.jpg"
                            />
                          </a>
                          {/* </div> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="info">
                          <h3>{product.title}</h3>
                          <div className="price">
                            <h3>{product.price} €</h3>
                          </div>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => {
                              isAuthenticated && addToCart(product._id);
                            }}
                          >
                            <i className="icon-basket"></i>Pridėti prekę
                          </button>
                          <div className="summary">
                            <p>{product.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <div>
                      <ul className="nav nav-tabs" id="myTab">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            role="tab"
                            data-toggle="tab"
                            id="reviews-tab"
                            href="#reviews"
                          >
                            Komentarai
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane active fade show"
                          role="tabpanel"
                          id="reviews"
                        >
                          {product.comments.length > 0 &&
                            product.comments.map((comment) => (
                              <Fragment>
                                <div className="reviews">
                                  <div className="review-item">
                                    <h4>{comment.user + ' ' + comment.name}</h4>
                                    <span className="text-muted">
                                      {formatDate(comment.date)}
                                    </span>
                                    <p>{comment.text}</p>
                                  </div>
                                </div>
                              </Fragment>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Product.propTypes = {
  getProductById: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProductById, addToCart })(Product);
