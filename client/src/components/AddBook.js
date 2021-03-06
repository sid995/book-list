import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries'

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery
    // console.log(this.props)
    if (data.loading) {
      return <option disabled>Loading Authors...</option>
    } else {
      return (
        data.authors &&
        data.authors.map(author => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))
      )
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleChange = this.handleChange.bind(this)

  handleSubmit(e) {
    e.preventDefault()
    // console.log(this.state)
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name of book"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            placeholder="Genre of book"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={this.handleChange}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
