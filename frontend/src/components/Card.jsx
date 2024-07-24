import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import toast from "react-hot-toast";

const Card = ({ item }) => {
  const { _id, name, options, img } = item;
  const priceOptions = options[0]; // Assuming options is an array with a single object

  const dispatch = useDispatchCart();
  const data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();

  const handleAddToCart = async () => {
    const price = parseInt(priceOptions[size]);
    const existingItem = data.find((item) => item.id === _id && item.size === size);

    if (existingItem) {
      if (quantity === 1) {
        toast.error("Item already in cart. Update the quantity instead.");
        return;
      }

      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > 6) {
        toast.error("Cannot add more than 6 items.");
        return;
      }
      await dispatch({
        type: "UPDATE",
        id: _id,
        size: size,
        quantity: newQuantity - existingItem.quantity,
        price: price * (newQuantity - existingItem.quantity),
      });
      toast.success("Cart updated");
    } else {
      await dispatch({
        type: "ADD",
        id: _id,
        name: name,
        size: size,
        quantity: quantity,
        price: price * quantity,
        img: img,
      });
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const totalPrice = quantity * parseInt(priceOptions[size] || 0);

  return (
    <div className="my-3" style={{ maxWidth: "18rem", width: "100%" }}>
      <div className="card h-100">
        <img src={img} className="card-img-top" alt={name} style={{ height: "180px", objectFit: "cover" }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100 mt-auto">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity}>
              {Array.from(Array(6), (e, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {Object.keys(priceOptions).map((element) => (
                <option value={element} key={element}>
                  {element}
                </option>
              ))}
            </select>
            <br />
            <div className="d-inline h-100 fs-5">Total price: Rs.{totalPrice}/-</div>
            <hr />
            <button className="btn bg-success" onClick={handleAddToCart} type="button">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
