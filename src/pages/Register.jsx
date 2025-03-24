import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import google from "/google.png";
import { registerUser } from "../services/apiAuth";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { api } from "../lib/axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //authorization-flow,
  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("response register", codeResponse);
      try {
        const url = "/auth/google-register";
        const response = await api.post(url, { code: codeResponse.code });
        console.log("logg res", response);
        const user = response.data.user;
        const accessToken = response.data.accessToken;
        dispatch(setAuth({ user, accessToken }));

        toast.success("Account Created");
        navigate("/");
      } catch {
        toast.error("Sign-up failed, do you already have an account?");
      }
    },
    flow: "auth-code",
    onError: () => toast.error("Sign-up failed"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(firstName, lastName, email, password);
      const user = response.user;
      const accessToken = response.accessToken;
      const role = "";
      dispatch(setAuth({ user, role, accessToken }));

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section className="mt-8 w-full">
      <Card className="min-w-[19rem] max-w-[30rem] mx-auto pt-4 pb-8 px-6 ">
        <p className="text-center mb-8 text-lg">Sign-up</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
              <Input
                type="text"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-6">
              <Button type="submit" className="w-full mb-4">
                Sign-up
              </Button>
              <Button
                type="button"
                className="w-full"
                onClick={registerWithGoogle}
              >
                Sign-up with
                <img src={google} className="h-20" />
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              <p>
                Already have an Account ?
                <Link to="/login" className="font-semibold underline ml-2">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
}

export default Register;
