import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({ query: query.trim() })
      BooksAPI.search(query, 20).then((response) => {
        if (!response.error) {
          this.setState({ results: response })
        }
      })
    } else {
      this.setState({ query: '', results: [] })
    }
  }

  render () {
    const {bookMap, updateBook} = this.props
    const results = this.state.results
    results.forEach((book) => {
      if (bookMap[book.id]) {
        const shelf = this.props.bookMap[book.id].shelf
        if (shelf) book.shelf = shelf
      }
    })
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {results.map((book) =>
            <li key={book.id}>
              <Book book={book} updateBook={updateBook}/>
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
