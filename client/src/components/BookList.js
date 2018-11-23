import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

class BookList extends Component {
  render() {
    const getBooks = () => {
      const data = this.props.data
      if (data.loading) {
        return <div>Loading books...</div>
      } else {
        return (
          data.books &&
          data.books.map(book => (
            <li key={book.id} value={book.id}>
              {book.name}
            </li>
          ))
        )
      }
    }
    // console.log(this.props)
    return (
      <div>
        <ul id="book-list">{getBooks()}</ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
