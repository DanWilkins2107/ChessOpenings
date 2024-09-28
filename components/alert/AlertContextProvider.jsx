import { createContext, useState, useRef, useEffect } from "react";

const initialState = {
    text: "",
    color: "",
    totalAlerts: 0,
};

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [text, setText] = useState(initialState.text);
    const [color, setColor] = useState(initialState.color);
    const [alertNo, setAlertNo] = useState(initialState.totalAlerts);
    const alertRef = useRef(alertNo);

    useEffect(() => {
        alertRef.current = alertNo;
    }, [alertNo]);

    const setAlert = (text, color) => {
        setText(text);
        setColor(color);
        setAlertNo((alertNo) => alertNo + 1);

        setTimeout(() => {
            if (alertRef.current - 1 === alertNo) {
                setText(initialState.text);
                setColor(initialState.color);
            }
        }, 3000);
    };

    const resetAlert = () => {
        setText(initialState.text);
        setColor(initialState.color);
    };

    return (
        <AlertContext.Provider value={{ text, color, setAlert, resetAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
