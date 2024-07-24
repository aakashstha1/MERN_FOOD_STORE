import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadedData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/food/foodData",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setFoodCategory(response.data.foodCategory);
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(() => {
    loadedData();
  }, []);

  return (
    <>
      {/************************************* CAROUSEL  *************************************/}

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important", objectPosition: "top !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex" role="search">
              {/* search bar  */}
              <input
                className="form-control me-2"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="carousel-item active">
            <img src="/pizza1.jpg" style={{ filter: "brightness(60%)" }} className="d-block w-100 h-100" alt="Random Pizza 1" />
          </div>
          <div className="carousel-item">
            <img src="/pizza2.jpg" style={{ filter: "brightness(60%)" }} className="d-block w-100 h-100" alt="Random Pizza 2" />
          </div>
          <div className="carousel-item">
            <img src="/pizza3.jpg" style={{ filter: "brightness(60%)" }} className="d-block w-100 h-100" alt="Random Pizza 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/********************************************** CARD  **********************************************/}

      <div className="container mt-4">
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <React.Fragment key={category._id}>
              <h2 className="my-4">{category.CategoryName}</h2>
              <hr />
              <div className="row">
                {foodItems.length > 0 ? (
                  foodItems
                    .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-4">
                        <Card item={filteredItem} />
                      </div>
                    ))
                ) : (
                  <div>No items found</div>
                )}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
    </>
  );
};

export default Home;
