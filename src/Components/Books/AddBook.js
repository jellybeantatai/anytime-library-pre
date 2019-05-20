import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestore } from "firebase";

class AddBook extends Component {
  state = {
    title: "",
    author: "",
    genre: "",
    description: "",
    issuedTo: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newBook = this.state;

    const { firestore } = this.props;

    firestore
      .add({ collection: "books" }, newBook)
      .then(() => this.props.history.push("/"));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Book</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                  onChange={this.onChange}
                  value={this.state.author}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  name="genre"
                  onChange={this.onChange}
                  value={this.state.genre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddBook.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddBook);
