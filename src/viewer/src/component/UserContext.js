import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAuthorize, setUserAuthorize] = useState(null);
    const [userRoles, setUserRoles] = useState(null);
    const [state, setState] = useState('old');
    const [orderData, setOrderData] = useState();
    const [productData, serProductData] = useState();
    const [userAuthenticateData, setUserAuthenticateData] = useState();
    const updateOrder = (data) => {
        setOrderData((prevState)=>({
            ...prevState,
            ...data
        }));
    }

    const updateUser = (userData) => {
        setUser(userData);
    }
    const updateProduct = (productData) => {
        serProductData(productData);
    }

    const authorize = (bool) =>{
        setUserAuthorize(bool);
    }

    const setRoles = (roles) => {
        setUserRoles(roles)
    }


    return(
        <UserContext.Provider value = {{ user, updateUser, userAuthorize, authorize, userRoles, setRoles, orderData, updateOrder, state, setState, productData, updateProduct, userAuthenticateData, setUserAuthenticateData }}>
            {children}
        </UserContext.Provider>
    )

}



