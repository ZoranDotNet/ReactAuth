import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser } from "../services/apiAuth";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router";
import google from "/google.png";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { api } from "../lib/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //authorization-Code-flow,
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const url = "/auth/google-login";

        const response = await api.post(url, { code: codeResponse.code });
        const user = response.data.user;
        const accessToken = response.data.accessToken;
        const decodedToken = jwtDecode(accessToken);
        const role = decodedToken.role || "";
        dispatch(setAuth({ user, role, accessToken }));
        toast.success("Logged in!");
        navigate("/");
      } catch (error) {
        console.error("Error during Google login:", error);
        toast.error("Login google failed");
      }
    },
    flow: "auth-code",
    onError: () => toast.error("Login failed"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      const user = response.user;
      const accessToken = response.accessToken;
      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken.role || "";

      console.log("Logg accessToken", accessToken);
      dispatch(setAuth({ user, role, accessToken }));
      toast.success("Login Success");
      navigate("/");
    } catch {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-8 w-full">
      {!isLoading && (
        <Card className="min-w-[19rem] max-w-[30rem] mx-auto pt-4 pb-8 px-6 ">
          <p className="text-center mb-8 text-lg">Login</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-4">
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
                <Button type="submit" className="w-full  mb-4">
                  Login
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  onClick={loginWithGoogle}
                >
                  Login with
                  <img src={google} className="h-20" />
                </Button>
              </div>
              <div className="text-center text-sm mt-4">
                <p>
                  No Account ?
                  <Link to="/register" className="font-semibold underline ml-2">
                    Sign-up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Card>
      )}
      {isLoading && <Spinner />}
    </section>
  );
}

export default Login;
