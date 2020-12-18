import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createProfile,
  getCurrentProfile,
  deleteProfile,
} from '../../actions/profile';

const Profile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  deleteProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    surname: '',
    lastname: '',
    city: '',
    address: '',
    phone: '',
  });

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      loading || !profile.surname ? setEdit(false) : setEdit(true);
      setFormData({
        surname: loading || !profile.surname ? '' : profile.surname,
        lastname: loading || !profile.lastname ? '' : profile.lastname,
        city: loading || !profile.city ? '' : profile.city,
        address: loading || !profile.address ? '' : profile.address,
        phone: loading || !profile.phone ? '' : profile.phone,
      });
    }
  }, [loading, getCurrentProfile, profile]);

  const { surname, lastname, city, address, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, edit);
  };

  return (
    <Fragment>
      <section className="page login-page">
        <div className="clean-block clean-form dark">
          <div className="container pb-login">
            <div className="block-heading">
              <h2 className="text-info">Profilis</h2>
            </div>
            <form>
              <div className="form-group">
                <label>Vardas</label>
                <input
                  className="form-control item"
                  type="text"
                  name="surname"
                  value={surname}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Pavardė</label>
                <input
                  className="form-control item"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Miestas</label>
                <input
                  className="form-control item"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Adresas</label>
                <input
                  className="form-control item"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Telefono numeris</label>
                <input
                  className="form-control item"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Išsaugoti profilį
              </button>
              {/* <button
                className="btn btn-danger btn-block mt-5"
                type="submit"
                // onClick={(e) => {
                //   {
                //     setActionType(true);
                //     onSubmit(e);
                //   }
                // }}
              >
                Ištrinti profilį
              </button> */}
              <button
                type="button"
                class="btn btn-danger btn-block mt-5"
                data-toggle="modal"
                data-target="#myModal"
              >
                Ištrinti profilį
              </button>
              <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <p>Ar tikrai norite pašalinti profilį?</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={(e) => deleteProfile(history)}
                        data-dismiss="modal"
                      >
                        Ištrinti
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Uždaryti
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteProfile,
})(Profile);
