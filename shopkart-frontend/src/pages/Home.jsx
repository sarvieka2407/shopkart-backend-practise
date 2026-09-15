import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const response = await api.get("/customers/me");
        setCustomer(response.data.customer);
      } catch (error) {
        console.error("Failed to fetch customer profile:", error);
        // If /customers/me returns 401 Unauthorized or any auth error, redirect to /login
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="home-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-container">
        <div className="welcome-banner">
          <h1>Welcome, {customer?.fullName}!</h1>
          <p>You have successfully logged in to your ShopKart account.</p>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {customer?.fullName ? customer.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2>{customer?.fullName}</h2>
              <span className="badge">Customer Account</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{customer?.fullName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{customer?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{customer?.phone}</span>
            </div>
            {customer?.id && (
              <div className="detail-item">
                <span className="detail-label">Customer ID</span>
                <span className="detail-value code-font">{customer.id}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
