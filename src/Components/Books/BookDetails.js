import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Layout/Spinner";
import classnames from "classnames";

class BookDetails extends Component {
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onIssueClick = () => {
    const { book, auth, firestore } = this.props;

    const updBookIssue = {
      issuedTo: auth.email
    };

    firestore
      .update(
        {
          collection: "books",
          doc: book.id
        },
        updBookIssue
      )
      .then(() => this.props.history.push("/"));
  };

  onDeleteClick = () => {
    const { book, firestore } = this.props;
    firestore
      .delete({ collection: "books", doc: book.id })
      .then(() => this.props.history.push("/"));
  };

  render() {
    const { book, auth, books } = this.props;

    if (book) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back to Dashboard
              </Link>
            </div>
            {auth.email === "admin@admin.com" ? (
              <div className="col-md-6">
                <div className="btn-group float-right">
                  <Link to={`/book/edit/${book.id}`} className="btn btn-dark">
                    Edit
                  </Link>
                  <button
                    onClick={this.onDeleteClick}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {book.title}
              <a
                href="#!"
                className={classnames({
                  "btn btn-info btn-lg float-right": !book.issuedTo,
                  "btn btn-info btn-lg float-right disabled": book.issuedTo,
                  "btn btn-danger btn-lg float-right disabled": books.filter(
                    book => book.issuedTo === auth.email
                  )[0]
                })}
                onClick={this.onIssueClick}
              >
                Issue this book
              </a>
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h5>Author: </h5>
                  <span className="text-secondary">{book.author}</span>
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">Genre: {book.genre}</li>
                <li className="list-group-item">
                  About the book: {book.description}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

BookDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "books", storeAs: "book", doc: props.match.params.id }
  ]),

  // connect(({ firestore: { ordered } }, props) => ({
  //   book: ordered.book && ordered.book[0]          ----> Shortcut
  // }))

  connect((state, props) => ({
    book: state.firestore.ordered.book && state.firestore.ordered.book[0],
    books: state.firestore.ordered.books,
    auth: state.firebase.auth
  }))
)(BookDetails);
