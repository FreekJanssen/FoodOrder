import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { adminLogin } from "../store/admin/actions";
import { selectAdminToken } from "../store/admin/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminToken = useSelector(selectAdminToken);
  const history = useHistory();

  useEffect(() => {
    if (adminToken !== null) {
      history.push("/");
    }
  }, [adminToken, history]);

  function submit(e) {
    dispatch(adminLogin(username, password));

    setUsername("");
    setPassword("");
  }

  return (
    <Container>
      <Form validated as={Col} md={{ span: 4, offset: 4 }}>
        <h1 className="mt-5 mb-5">Login</h1>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={event => setUsername(event.target.value)}
            type="text"
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submit}>
            Log in
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}