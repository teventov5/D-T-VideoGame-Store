import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login(props: { loggedIn: Function; userDetail: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loggedIn, userDetail } = { ...props };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail((document.querySelector("#email") as HTMLInputElement).value);
    setPassword(
      (document.querySelector("#password") as HTMLInputElement).value
    );
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      const axiosGet = async () => {
        try {
          const response = await axios(
            `https://localhost:7210/api/App_users/checkUser/${email}&${password}`
          );
          if (response.status === 200) {
            console.log(response.data);
            userDetail(response.data[0]);

            loggedIn(true);
            navigate(`/home`);
          }
        } catch (error) {
          alert("Wrong Login Details. error= " + error);
        }
      };

      axiosGet();
    }
  }, [email, password]);

  return (
    <div className="minHeightClass">
      <h1 className="title">Login</h1>
      <form className="loginForm">
        <div className="container">
          <label>Username</label>
          <input
            type="email"
            placeholder="Enter Username"
            name="email"
            id="email"
            required
          ></input>

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
          ></input>

          <button type="submit" onClick={submit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
