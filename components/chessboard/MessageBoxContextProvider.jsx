import { createContext, useState, useRef, useEffect } from "react";
import { Colors } from "../../styling";

const initialState = {
    message: "",
    backgroundColor: Colors.card1,
    textColor: Colors.text,
};

export const MessageBoxContext = createContext();

export const MessageBoxProvider = ({ children }) => {
    const [permMessage, setPermMessage] = useState({ ...initialState });
    const [temp, setTemp] = useState({ ...initialState });
    const [id, setId] = useState(0);
    const tempRef = useRef(id);

    useEffect(() => {
        tempRef.current = id;
    }, [id]);

    const setTempMessage = (tempObj) => {
        setTemp(tempObj);
        setId((id) => id + 1);
        setTimeout(() => {
            if (tempRef.current - 1 === id) {
                setTemp({ ...initialState });
            }
        }, 1000);
    };

    return (
        <MessageBoxContext.Provider value={{ permMessage, temp, setPermMessage, setTempMessage }}>
            {children}
        </MessageBoxContext.Provider>
    );
};
