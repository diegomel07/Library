import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './searchPage.scss';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fictionBooks, setFictionBooks] = useState([]);
  const [mysteryBooks, setMysteryBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooksByGenre = async (genre, setBooks) => {
      try {
        const response = await fetch(`http://localhost:8080/book/search/genre/${genre}`);
        const data = await response.json();
        const shuffledBooks = shuffleArray(data);
        const selectedBooks = shuffledBooks.slice(0, 6);
        setBooks(selectedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchAllBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/book/search/title/${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching books by title:', error);
      }
    };

    const fetchBooks = async () => {
      if (searchTerm) {
        fetchAllBooks();
        setFictionBooks([]);
        setMysteryBooks([]);
        setRomanceBooks([]);
      } else {
        await fetchBooksByGenre('Fiction', setFictionBooks);
        await fetchBooksByGenre('Mystery', setMysteryBooks);
        await fetchBooksByGenre('Romance', setRomanceBooks);
        setSearchResults([]);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="homePage">
      <h1>Book Search</h1>
      <input
        type="text"
        className="searchInput"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!searchTerm && (
        <div>
          <div className="bookshelf">
            <h2>Fiction Books</h2>
            <div className="bookList">
              {fictionBooks.map((book) => (
                <Link to={`/book/${book.isbn13}`} key={book.isbn13} className="bookItem">
                  <img src={book.thumbnail} alt={book.title} className="bookCover" />
                  <div className="bookDetails">
                    <div className="bookTitle">{book.title}</div>
                    <div className="bookAuthors">{book.authors.join(', ')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bookshelf">
            <h2>Mystery Books</h2>
            <div className="bookList">
              {mysteryBooks.map((book) => (
                <Link to={`/book/${book.isbn13}`} key={book.isbn13} className="bookItem">
                  <img src={book.thumbnail} alt={book.title} className="bookCover" />
                  <div className="bookDetails">
                    <div className="bookTitle">{book.title}</div>
                    <div className="bookAuthors">{book.authors.join(', ')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bookshelf">
            <h2>Romance Books</h2>
            <div className="bookList">
              {romanceBooks.map((book) => (
                <Link to={`/book/${book.isbn13}`} key={book.isbn13} className="bookItem">
                  <img src={book.thumbnail} alt={book.title} className="bookCover" />
                  <div className="bookDetails">
                    <div className="bookTitle">{book.title}</div>
                    <div className="bookAuthors">{book.authors.join(', ')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {searchTerm && (
        <div className="bookshelf">
          <h2>Search Results</h2>
          <div className="bookList">
            {searchResults.map((book) => (
              <Link to={`/book/${book.isbn13}`} key={book.isbn13} className="bookItem">
                <img src={book.thumbnail} alt={book.title} className="bookCover" />
                <div className="bookDetails">
                  <div className="bookTitle">{book.title}</div>
                  <div className="bookAuthors">{book.authors.join(', ')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

