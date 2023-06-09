import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./pages/admin/AdminPanel";
import Login from "./pages/login/Login"
import Home from "./pages/search/SearchPage"
import BookInfoPage from "./pages/book/BookInfoPage" // Import the BookInfoPage component
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Routes>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />{" "}
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/book/:isbn13" element={<BookInfoPage />} /> {/* Add this route */}
            </Routes>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Layout />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

