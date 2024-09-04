import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Our Website</h1>
      <div style={styles.buttonContainer}>
        <div>
          <Link to="/login" id="btn" style={styles.button}>
            Login <i className="fa-solid fa-square-arrow-up-right"></i>
          </Link>
        </div>
        <div>
          <Link to="/signup" id="btn" style={styles.button}>
            Signup <i className="fa-solid fa-square-arrow-up-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "linear-gradient(180deg, #cfcfe5, #323fb7)",
  },
  title: {
    fontSize: "2.5em",
    marginBottom: "40px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "2px solid black",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default LandingPage;
