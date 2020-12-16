import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProductById } from '../../actions/product';

const Product = ({ product: { product, loading }, getProductById, match }) => {
  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match.params.id]);

  return (
    <Fragment>
      <section class="page product-page">
        <section class="clean-block clean-product dark">
          <div class="container">
            <div class="block-heading">
              <h2 class="text-info">Product Page</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                quam urna, dignissim nec auctor in, mattis vitae leo.
              </p>
            </div>
            <div class="block-content">
              <div class="product-info">
                <div class="row">
                  <div class="col-md-6">
                    <div class="gallery">
                      {/* <div class="sp-wrap">  */}
                      <a href="/assets/img/shoes/DSC_0239.jpg">
                        <img
                          class="img-fluid d-block mx-auto"
                          src="/assets/img/shoes/DSC_0239.jpg"
                        />
                      </a>
                      {/* </div> */}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info">
                      <h3>Lorem Ipsum</h3>
                      <div class="price">
                        <h3>$300.00</h3>
                      </div>
                      <button class="btn btn-primary" type="button">
                        <i class="icon-basket"></i>Add to Cart
                      </button>
                      <div class="summary">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec augue nunc, pretium at augue at, convallis
                          pellentesque ipsum. Vestibulum diam risus, sagittis at
                          fringilla at, pulvinar vel risus. Vestibulum dignissim
                          eu nulla eu imperdiet. Morbi mollis tellus a nunc
                          vestibulum consequat. Quisque tristique elit et nibh
                          dapibus sodales. Nam sollicitudin a urna sed iaculis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-info">
                <div>
                  <ul class="nav nav-tabs" id="myTab">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        role="tab"
                        data-toggle="tab"
                        id="reviews-tab"
                        href="#reviews"
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane active fade show"
                      role="tabpanel"
                      id="reviews"
                    >
                      <div class="reviews">
                        <div class="review-item">
                          <h4>Incredible product</h4>
                          <span class="text-muted">
                            <a href="#">John Smith</a>, 20 Jan 2018
                          </span>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec augue nunc, pretium at augue at,
                            convallis pellentesque ipsum. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit.
                          </p>
                        </div>
                      </div>
                      <div class="reviews">
                        <div class="review-item">
                          <h4>Incredible product</h4>
                          <span class="text-muted">
                            <a href="#">John Smith</a>, 20 Jan 2018
                          </span>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec augue nunc, pretium at augue at,
                            convallis pellentesque ipsum. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit.
                          </p>
                        </div>
                      </div>
                      <div class="reviews">
                        <div class="review-item">
                          <h4>Incredible product</h4>
                          <span class="text-muted">
                            <a href="#">John Smith</a>, 20 Jan 2018
                          </span>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec augue nunc, pretium at augue at,
                            convallis pellentesque ipsum. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

Product.propTypes = {
  getProductById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProductById })(Product);
