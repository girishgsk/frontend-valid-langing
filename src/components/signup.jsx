import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services";
import Swal from "sweetalert2";

import Captcha from "react-canvas-captcha";

const Signup = () => {
  const history = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const valid = () => {
    let err = {};

    if (!firstName) {
      err = { ...err, firstName: true };
    }
    if (!lastName) {
      err = { ...err, lastName: true };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      err = { ...err, email: true };
    } else if (!emailRegex.test(email)) {
      err = { ...err, email: true, emailInvalid: true };
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])(?=.*\d)[A-Za-z\d@#$%]{8,}$/;

    if (!password) {
      err = { ...err, password: true };
    } else if (!passwordRegex.test(password)) {
      err = { ...err, password: true, passwordInvalid: true };
    }
    if (!captcha) {
      err = { ...err, captcha: true, captchaNotMatching: false };
    } else if (captcha.toLowerCase() !== generatedCaptcha) {
      err = { ...err, captcha: false, captchaNotMatching: true };
    }

    setErrors(err);
    const result = Object.values(err)?.some((val) => val === true);
    if (result) {
      return false;
    }
    return true;
  };

  const postData = async () => {
    if (!valid()) {
      return false;
    }
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    signup(data)
      .then((res) => {
        localStorage.setItem("useremail", res?.data?.data?.email);
        Swal.fire({
          title: "Signup Success",
          icon: "success",
        });
        history("/");
      })
      .catch((e) => {
        const message =
          typeof e?.response?.data?.message === "string"
            ? e?.response?.data?.message
            : e?.response?.data?.message?.join("<br/>");
        Swal.fire("Error!", message, "error");
      });
  };

  const firstNameChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, firstName: true });
    } else {
      setErrors({ ...errors, firstName: false });
    }
    setFirstName(val);
  };
  const lastNameChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, lastName: true });
    } else {
      setErrors({ ...errors, lastName: false });
    }
    setLastName(val);
  };
  const userNameChange = (e) => {
    const val = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      setErrors({ ...errors, email: true, emailInvalid: false });
    } else if (!emailRegex.test(val)) {
      setErrors({ ...errors, email: false, emailInvalid: true });
    } else {
      setErrors({ ...errors, email: false, emailInvalid: false });
    }
    setEmail(val);
  };
  const passwordChange = (e) => {
    const val = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])(?=.*\d)[A-Za-z\d@#$%]{8,}$/;

    if (!val) {
      setErrors({ ...errors, password: true, passwordInvalid: false });
    } else if (!passwordRegex.test(val)) {
      setErrors({ ...errors, password: false, passwordInvalid: true });
    } else {
      setErrors({ ...errors, password: false, passwordInvalid: false });
    }
    setPassword(val);
  };
  const captchaChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, captcha: true });
    } else {
      setErrors({ ...errors, captcha: false });
    }
    setCaptcha(val);
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "80vw", margin: "auto" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="card">
          <div className="card-header">
            <h3>Signup</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={
                    errors?.firstName
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter firstName"
                  onChange={firstNameChange}
                  value={firstName}
                />
                {errors?.firstName && (
                  <span className="text-danger">Please enter firstName</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={
                    errors?.lastName
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter lastName"
                  onChange={lastNameChange}
                  value={lastName}
                />
                {errors?.lastName && (
                  <span className="text-danger">Please enter lastName</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={
                    errors?.email
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter email"
                  onChange={userNameChange}
                  value={email}
                />
                {errors?.email && (
                  <span className="text-danger">Please enter email</span>
                )}
                {errors?.emailInvalid && (
                  <span className="text-danger">
                    Please enter a valid email address
                  </span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors?.password
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter password"
                  onChange={passwordChange}
                  value={password}
                />
                {errors?.password && (
                  <span className="text-danger">Please enter password</span>
                )}
                {errors?.passwordInvalid && (
                  <span className="text-danger">
                    Password must contain at least 8 characters, including
                    uppercase, lowercase, number, and special character (@, #,
                    $, %).
                  </span>
                )}
              </div>
              <div className="mt-2 form-group">
                <Captcha
                  boxHeight={50}
                  boxWidth={120}
                  refreshButton
                  caseType="uppercase"
                  captchaConfig={{
                    numberOfChars: 4,
                    font: "bold 30px Arial",
                    textStartingX: 5,
                    textStartingY: 10,
                  }}
                  setCode={(captchaCode) => setGeneratedCaptcha(captchaCode)}
                />
                <label htmlFor="captcha" className="form-label">
                  Captcha
                </label>

                <input
                  type="text"
                  name="captchaCode"
                  id="captchaCode"
                  className={
                    errors?.captcha
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter captcha"
                  onChange={captchaChange}
                  value={captcha}
                />
                {errors?.captcha && (
                  <span className="text-danger">Please enter captcha</span>
                )}
                {errors?.captchaNotMatching && (
                  <span className="text-danger">
                    Please enter correct captcha
                  </span>
                )}
              </div>
              <p>
                Already have account ? <Link to="/">Login</Link>
              </p>
              <div className="d-flex justify-content-center mt-2 col-12">
                <button className="btn btn-primary" onClick={postData}>
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
