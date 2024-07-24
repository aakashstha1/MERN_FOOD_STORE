import toast from "react-hot-toast";
import { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          quantity: action.quantity,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArray = [...state];
      newArray.splice(action.index, 1);
      return newArray;
    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          const newQuantity = food.quantity + action.quantity;
          if (newQuantity > 6) {
            toast.error("Cannot add more than 6 items.");
            return food;
          }
          return {
            ...food,
            quantity: newQuantity,
            price: food.price + action.price,
          };
        }
        return food;
      });
    default:
      console.log("Error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
