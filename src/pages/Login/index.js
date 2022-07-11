import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginService } from "../../service";

function Login() {

    let navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.appReducer);
    const dispatch = useDispatch()

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        // if (!password.match(/^[a-zA-Z0-9_.-]{8,22}$/)) {
        //     formIsValid = false;
        //     setpasswordError(
        //         "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
        //     );
        //     return false;
        // } else {
        //     setpasswordError("");
        //     formIsValid = true;
        // }

        return formIsValid;
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADING', payload: true })
        if (handleValidation()) {
            console.log(handleValidation())
            try {
                const {data} = await LoginService.getToken(email, password);
                localStorage.setItem("token", data.access_token);
                navigate("providers", { replace: true });
            } catch (error) {
                console.log("error while fetching data");
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false })
                console.log('finally ',);
            }
        }
    };

    return (
        <div className="login">
            <div className="form">
                <form className="login-form" onSubmit={loginSubmit}>
                    <span className="material-icons">lock</span>
                    <input
                        type="email"
                        id="EmailInput"
                        name="EmailInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                    </small>
                    <input
                        type="password"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                        {passwordError}
                    </small>
                    <Button type="submit" disabled={isLoading}>Login</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;