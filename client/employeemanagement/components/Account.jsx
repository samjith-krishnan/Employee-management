import React, { useEffect, useState } from "react";
import { userget } from "../api/allApi";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Account.css";
import Header from "./Header";
import { Link } from "react-router-dom";

function Account() {
    const [user, setUser] = useState(null);
    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const res = await userget(token);
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, [token]);

    if (!user) {
        return (
            <div className="account-loading">
                <h2>Loading Account Details...</h2>
            </div>
        );
    }

    return (
        <><Header/>
        <div className="account-section d-flex justify-content-center mt-5">
            <Card style={{ width: "22rem" }} className="shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Account Details</Card.Title>
                    <Card.Text>
                        <strong>Username:</strong> {user.username}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {user.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Place:</strong> {user.place}
                    </Card.Text>
                    <Card.Text>
                        <strong>Company:</strong> {user.company}
                    </Card.Text>
                    <Card.Text>
                        <strong>Phone:</strong> {user.phone}
                    </Card.Text>
                    <Link to='/password-change' className="btn btn-outline-dark">change password</Link>
                </Card.Body>
            </Card>
        </div>
        </>
    );
}

export default Account;
