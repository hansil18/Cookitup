import { Form, Col, Button } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { useState, useContext } from "react";
import { LoginContext } from "../controller/loginstate.jsx";
import { useHistory } from "react-router-dom";
import { authenticateLogin } from "../service/service.js";

const loginInitialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);

  const { account, setAccount } = useContext(LoginContext);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const userLogin = async () => {};
  useState(() => {});

  const clickHandler = async () => {
    let response = await authenticateLogin(login);
    if (!response) {
      alert("invalid login");
      setLogin({ ...login, password: "" });
      return;
    }
    // alert("login successfully");
    setAccount(login.username);
    setLogin(loginInitialValues);
    history.push("/Update");
  };

  return (
    <div
      style={{
        display: "block",
        width: "30%",
        margin: "100px auto",
        borderRadius: "5px",
        background: "rgba(200,200,200,0.3)",
        padding: 30,
      }}
    >
      <h4
        style={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <FiLogIn style={{ color: "black", fontSize: 20 }} className="mr-2" />
        Login
      </h4>
      <Form>
        <Form.Group as={Col}>
          <Form.Label style={{ fontSize: 20, color: "black" }}>
            <span>User Name</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={login.username}
            name="username"
            type="text"
            placeholder="Enter User Name"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label style={{ fontSize: 20, color: "black" }}>
            <span>Password</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            name="password"
            value={login.password}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button
          size="lg"
          variant="success"
          onClick={() => clickHandler()}
          style={{ marginLeft: "40%", marginTop: 20 }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
