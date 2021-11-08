import React from "react";
import { useHistory } from "react-router";
import "../styles/Home.css";

const Callback = () => {
    const link = useHistory();

    return (
        <div className="box">
            <h1>Successfully</h1>
            <div
                className="button"
                onClick={() => {
                    link.push("/");
                }}
            >
                Go back
            </div>
        </div>
    );
};

export default Callback;
