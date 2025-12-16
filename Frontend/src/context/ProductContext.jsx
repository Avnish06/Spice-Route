import { createContext, useEffect } from "react";

const productContext = createContext({})

export const productContextProvider = ({children})=> {

    // Load user from localStorage when app first loads
      const [quantity, setQuantity] = useState(() => {
        const storedQuantity = localStorage.getItem("quantity");
        return storedQuantity ? JSON.parse(storedQuantity) : "";

})


      







export const contextProvider = productContext.Provider




