import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
import toast from "react-hot-toast";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  let data = useCart();

  const [cartView, setCartView] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred.");
      }
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="">
            FooDelivery
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="mx-auto navbar-nav fs-4">
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active fw-semibold" aria-current="page" to="">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active fw-semibold" aria-current="page" to="">
                      My Orders
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav fs-5">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/signup">
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span type="button" className="nav-link active fw-semibold bg-success" aria-current="page" onClick={() => setCartView(true)}>
                      My Cart{" "}
                      <Badge pill bg="danger">
                        {data.length}
                      </Badge>
                    </span>
                    {cartView ? (
                      <Modal onClose={() => setCartView(false)}>
                        <Cart />
                      </Modal>
                    ) : null}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
