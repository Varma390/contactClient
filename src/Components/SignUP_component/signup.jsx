import {React} from "react";
import { useContext } from "react";
import { context } from "../Context/Context";
import { useState } from "react";
import "./signup.css"

const SignUp = () => {
    const [user, setUser] = useState({});
    const { signUpUser } = useContext(context);
     const registration = () => {
        if (user.Email && user.Password && user.confirmPassword) {
            if (user.Password === user.confirmPassword) {
                signUpUser(user);
            }
            else { alert("Password and ConfirmPassword are not same !") }
        }
        else {
            alert("Input field shouldn't be blank !")
        }

     }

    return (
        <div id="sign-up-container">
            <section id="top-section">
                <div  className="image-box1">
                    <img  src={require("./Ellipse-31.png")} alt=""/>
                </div>
                <div className="image-box2">
                 <img id="elp1" src={require("./Group-695.png")}  alt=""/>
                </div>
            </section>

            <section id="middle">
                <h1>Logo</h1>
                <p>Create New Account</p>
                <div>
                    <input className="input" type="email" placeholder="Email-ID" onChange={(e) => { setUser({ ...user, Email: e.target.value }) }} name="userEmail" />
                </div>
                <div>
                    <input className="input" type="password" placeholder="password" onChange={(e) => { setUser({ ...user, Password: e.target.value }) }} name="password" />
                </div>
                <div>
                    <input className="input" type="password" placeholder=" confirm -password" onChange={(e) => { setUser({ ...user, confirmPassword: e.target.value }) }} name="confirm password" />
                </div>
                <div>
                    <button onClick={registration}> SignUp</button>
                </div>
            </section>

            <section id="bottom-section">
                <div id="elp2" className="image-box2"><img src={require("./Group-695.png")}  alt=""/></div>
                <div id="elp22" className="image-box1"><img  src={require("./Ellipse-32.png")} alt=""/></div>
            </section>
        </div>
    )
}
export default SignUp