import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/offer.css";

const port = process.env.REACT_APP_URL;

function Offer() {
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`${port}/getoffer`);
                if (response.data.length > 0) {
                    setOffer(response.data[0]); 
                }
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
    
        fetchOffer();
    }, []);

    return (
        <div>
            {offer ? (
                <div className="offer-section">
                    <div className="offer-container">
                        <h2>{offer.heading_1}</h2>
                        <p>{offer.heading_2}</p>

                        <div className="offer-image">
                            <img src={`./uploads/${offer.img}`} alt="Offer"/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading-container">
                    <p>Loading offers</p>
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Offer;


