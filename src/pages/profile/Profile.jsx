import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Profile = () => {
  const { id } = useParams(); // Get the ID from the URL

  const [user, setUser] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [planToReadList, setPlanToReadList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/by_id/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchBookshelf = async (shelfType) => {
      try {
        const response = await fetch(`http://localhost:8080/list/get/${id}/${shelfType}`);
        const bookshelfData = await response.json();

        switch (shelfType) {
          case 0: // Reading List
            setReadingList(bookshelfData);
            break;
          case 1: // Read List
            setReadList(bookshelfData);
            break;
          case 2: // Plan to Read List
            setPlanToReadList(bookshelfData);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching bookshelf:", error);
      }
    };

    fetchUser();
    fetchBookshelf(0); // Fetch Reading List
    fetchBookshelf(1); // Fetch Read List
    fetchBookshelf(2); // Fetch Plan to Read List
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while fetching the user
  }

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span> {/* Display the user's name */}
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
            </div>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
          </div>
        </div>

        <div className="bookshelf">
        <h2>Reading List</h2>
        <div className="bookList">
          {readingList.map((book) => (
            <div key={book.isbn13} className="bookItem">
              <img src={book.thumbnail} alt={book.title} className="bookCover" />
              <div className="bookDetails">
                <div className="bookTitle">{book.title}</div>
                <div className="bookAuthors">{book.authors.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bookshelf">
        <h2>Read List</h2>
        <div className="bookList">
          {readList.map((book) => (
            <div key={book.isbn13} className="bookItem">
              <img src={book.thumbnail} alt={book.title} className="bookCover" />
              <div className="bookDetails">
                <div className="bookTitle">{book.title}</div>
                <div className="bookAuthors">{book.authors.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bookshelf">
        <h2>Plan to Read List</h2>
        <div className="bookList">
          {planToReadList.map((book) => (
            <div key={book.isbn13} className="bookItem">
              <img src={book.thumbnail} alt={book.title} className="bookCover" />
              <div className="bookDetails">
                <div className="bookTitle">{book.title}</div>
                <div className="bookAuthors">{book.authors.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
};

export default Profile;
