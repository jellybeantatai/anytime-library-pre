import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Layout/Spinner";

class Books extends Component {
  state = {
    search: ""
  };

  onReturnClick = () => {
    const { books, auth, firestore } = this.props;

    const updBookReturn = {
      issuedTo: ""
    };

    firestore.update(
      {
        collection: "books",
        doc: books.filter(book => book.issuedTo === auth.email)[0].id
      },
      updBookReturn
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { books, auth } = this.props;

    if (books) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> List of Books
              </h2>
            </div>
            <div className="col-md-6">
              <h6 className="text-right text-secondary">
                Current Issued Book:{" "}
                <span className="text-info">
                  {books.filter(book => book.issuedTo === auth.email)[0]
                    ? books.filter(book => book.issuedTo === auth.email)[0]
                        .title
                    : "None"}
                </span>
                {books.filter(book => book.issuedTo === auth.email)[0] ? (
                  <div
                    className="btn btn-warning btn-sm mx-3 my-3"
                    onClick={this.onReturnClick}
                  >
                    {" "}
                    Return this book
                  </div>
                ) : null}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input
                class="form-control form-control-lg my-4"
                type="text"
                placeholder="Search By Title🔎"
                name="search"
                onChange={this.onChange}
                value={this.state.search}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Availability</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {books
                .filter(book =>
                  book.title
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                )
                .map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    {book.issuedTo ? (
                      <td className="text-danger">Not Available</td>
                    ) : (
                      <td className="text-success">Available</td>
                    )}
                    <td>
                      <Link
                        to={`/book/${book.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Books.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "books" }]),
  connect((state, props) => ({
    books: state.firestore.ordered.books,
    auth: state.firebase.auth
  }))
)(Books);
