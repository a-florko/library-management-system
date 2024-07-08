import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const LogIn: React.FC = () => {
    const [credentials, setCredentials] = useState({ login: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const { logIn } = useAuth();

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (credentials.login === "" || credentials.password === "") setError("The fields must be filled in");
        else {
            try {
                await logIn(credentials, rememberMe);
                navigate("/");
            } catch {
                setError("Invalid login or password")
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column border rounded px-5 bg-light">
                <div className="d-flex flex-column align-items-center">
                    <h1 className="pt-2">Welcome!</h1>
                    <h2>To start working, please log in</h2>
                </div>
                <hr />
                {error && <h4 className="text-danger">{error}</h4>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 mx-0 px-0 ">
                        <Form.Control type="text"
                            placeholder="Login"
                            name="login"
                            value={credentials.login}
                            onChange={e => setCredentials({...credentials,  login: e.target.value
                            })}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3 mx-0 px-0 ">
                        <Form.Control type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={e => setCredentials({...credentials,  password: e.target.value
                            })}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Check className="my-3 h5"
                        type="switch"
                        label="Remember Me"
                        onChange={e => setRememberMe(e.target.checked)}
                    />
                    <div className="flex-column d-flex align-items-center">
                        <Button type="submit" className="w-25 mb-3 h-1" variant="btn btn-outline-dark" size="lg">Log In</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default LogIn;