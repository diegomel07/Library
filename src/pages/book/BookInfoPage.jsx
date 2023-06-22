import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './bookInfoPage.scss';

const BookInfoPage = () => {
  const { isbn13 } = useParams();
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/book/search/isbn/${isbn13}`);
        const data = await response.json();
        setBookInfo(data);
      } catch (error) {
        console.error('Error fetching book information:', error);
      }
    };

    fetchBookInfo();
  }, [isbn13]);

  return (
    <div className="bookInfoPage">
      {bookInfo ? (
        <>
          <div className="bookCoverContainer">
            <img src={bookInfo.thumbnail} alt={bookInfo.title} className="bookCover" />
          </div>
          <div className="bookDetailsContainer">
            <h1 className="bookTitle">{bookInfo.title}</h1>
            <div className="bookInfo">
              <div className="bookDetail">
                <span className="detailLabel">ISBN-13:</span> {bookInfo.isbn13}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">ISBN-10:</span> {bookInfo.isbn10}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">SubTitle:</span> {bookInfo.subTitle}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Authors:</span> {bookInfo.authors.join(', ')}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Categories:</span> {bookInfo.categories.join(', ')}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Description:</span> {bookInfo.description}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Published Year:</span> {bookInfo.publishedYear}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Average Rating:</span> {bookInfo.averageRating}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Copies:</span> {bookInfo.copies}
              </div>
              <div className="bookDetail">
                <span className="detailLabel">Item Status:</span> {bookInfo.ItemStatus}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BookInfoPage;
