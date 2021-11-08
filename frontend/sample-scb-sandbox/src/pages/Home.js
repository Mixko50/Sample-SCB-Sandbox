import axios from "axios";
import React, { useState } from "react";
import "../styles/Home.css";
import { useHistory } from "react-router";

const Home = () => {
    const [rawQr, setRawQr] = useState("");
    const link = useHistory();

    const createQr = async () => {
        await axios.get("https://scb-sandbox-api.mixkoap.com/get-token");
        const getRawQr = await axios.get(
            "https://scb-sandbox-api.mixkoap.com/create-qr"
        );
        setRawQr(getRawQr.data.data.qrRawData);
    };

    const test = setInterval(async () => {
        try {
            const checkStatus = await axios.get(
                "https://scb-sandbox-api.mixkoap.com/status"
            );
            if (checkStatus.data.request.payeeName) {
                link.push("/callback");
                const clearData = await axios.get(
                    "https://scb-sandbox-api.mixkoap.com/clear"
                );
                if (clearData.data.clear === true) {
                    clearInterval(test);
                }
            }
        } catch {}
    }, 1000);

    return (
        <div className="box">
            <div className="button" onClick={createQr}>
                Pay now
            </div>
            {rawQr.length > 1 ? (
                <img
                    src={`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${rawQr}`}
                    alt="QRCODE"
                />
            ) : null}
        </div>
    );
};

export default Home;
