import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import toast from "react-hot-toast";
import axios from "axios";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = () => {
    let response = axios.post("http://localhost:4000/api/v1/order/orderdata", { withCredentials: true, headers: { "Content-Type": "application/json" } });
    res
    if(response.statusCode === 200) {
        dispatch(({trpe:"DROP"}))
    }
    toast.success("Order placed successfully");
    
  };

  let totalPrice = data.reduce((total, food) => total + food.price * food.quantity, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price * food.quantity}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <FaTrashAlt
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: Rs.{totalPrice}/-</h1>
        </div>
        <div>
          <button type="button" className="btn bg-success mt-5" onClick={handleCheckOut}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
