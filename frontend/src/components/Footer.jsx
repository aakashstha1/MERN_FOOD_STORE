import React from "react";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center bg-body-tertiary">
      <div className="container">
        <section className="">
          <Link
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body fs-4"
            to="#!"
            role="button"
            id="facebook-logo"
          >
            <FaSquareFacebook />
          </Link>

          <Link
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body fs-4"
            to="#!"
            role="button"
            id="instagram-logo"
          >
            <FaInstagramSquare />
          </Link>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright: FooDelivery
      </div>
    </footer>
  );
};

export default Footer;
