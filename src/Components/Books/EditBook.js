import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Layout/Spinner";

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.authorInput = React.createRef();
    this.genreInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.issuedToInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { book, firestore } = this.props;

    const updClient = {
      title: this.titleInput.current.value,
      author: this.authorInput.current.value,
      genre: this.genreInput.current.value,
      description: this.descriptionInput.current.value,
      issuedTo: this.issuedToInput.current.value
    };

    firestore
      .update({ collection: "books", doc: book.id }, updClient)
      .then(this.props.history.push("/"));
  };

  render() {
    const { book } = this.props;

    if (book) {
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
            <div className="card-header">Edit Book Details</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    minLength="2"
                    required
                    ref={this.titleInput}
                    defaultValue={book.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    minLength="2"
                    required
                    ref={this.authorInput}
                    defaultValue={book.author}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genre">Genre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="genre"
                    ref={this.genreInput}
                    defaultValue={book.genre}
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
                    ref={this.descriptionInput}
                    defaultValue={book.description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="issuedTo">Issued To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="issuedTo"
                    ref={this.issuedToInput}
                    defaultValue={book.issuedTo}
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
    } else {
      return <Spinner />;
    }
  }
}

EditBook.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "books", storeAs: "book", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    book: ordered.book && ordered.book[0]
  }))
)(EditBook);
