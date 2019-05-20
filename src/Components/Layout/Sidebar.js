import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class Sidebar extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        {auth.email === "admin@admin.com" ? (
          <Link to="/book/add" className="btn btn-success btn-block">
            <i className="fas fa-plus-circle" /> Add New book
          </Link>
        ) : null}
      </div>
    );
  }
}

Sidebar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Sidebar);
