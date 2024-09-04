import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services";
import Swal from "sweetalert2";
import Captcha from "react-canvas-captcha";

const Login = () => {
  const history = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const valid = () => {
    let err = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      err = { ...err, email: true };
    } else if (!emailRegex.test(email)) {
      err = { ...err, email: true, emailInvalid: true };
    }

    if (!password) {
      err = { ...err, password: true };
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

  const onLoginClick = () => {
    if (!valid()) {
      return false;
    }
    const data = {
      email,
      password,
    };
    login(data)
      .then((res) => {
        // localStorage.setItem("useruserName", res?.data?.email);
        localStorage.setItem("user", JSON.stringify(res.data?.email));
        Swal.fire({
          title: "Login Success",
          icon: "success",
        });
        history("/");
      })
      .catch((e) => {
        const message = "Invalid Credential";
        // typeof e?.response?.data?.message === "string"
        //   ? e?.response?.data?.message
        //   : e?.response?.data?.message;
        Swal.fire("Error!", message, "error");
      });
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
    if (!val) {
      setErrors({ ...errors, password: true });
    } else {
      setErrors({ ...errors, password: false });
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
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  email
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
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
              <div className="d-flex justify-content-center mt-2 col-12">
                <button className="btn btn-primary" onClick={onLoginClick}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
