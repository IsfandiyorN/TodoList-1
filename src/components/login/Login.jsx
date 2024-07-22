import { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import logInImg from "../../../public/Rectangle 1.png"

function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function login() {
    setError(null);
    setLoading();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      if (!response.ok) {
        throw new Error(error);
      }

      const user = await response.json();
      setUser(user);
      saveUser(user);
      navigate("/"); 
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className={styles.login}>
      <div className="container"
      style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
      <div>
        <img src={logInImg} alt="logInImg"
        style={{
          width: "100%",
        }}
        />
        </div>
      <div className="signIn"
      style={{
        width: "450px",
        marginTop: "150px"
      }}
      >
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-control"]}>
          <label htmlFor='userName'></label>
          <input
          placeholder="Username"
            type='text'
            value={userName}
            id='userName'
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles["form-control"]}>
          <label htmlFor='password'></label>
          <input
          placeholder="Password"
            type='password'
            value={password}
            id='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>Error: {error.message}</p>}
        <div>
          <button type='Sign In' disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}