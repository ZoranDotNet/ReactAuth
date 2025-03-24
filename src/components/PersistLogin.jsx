import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Spinner from "./Spinner";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../slices/authSlice";
import axios from "axios";

const newAxios = axios.create({
  baseURL: "https://localhost:7000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let isMounted = true;

    if (user) {
      setIsLoading(false);
      return;
    }

    async function verifyRefreshToken() {
      try {
        const url = "/auth/refresh";
        const response = await newAxios.post(url);
        const { user, accessToken } = response.data;

        const decodedToken = jwtDecode(accessToken);
        const role = decodedToken.role || "";

        dispatch(setAuth({ user, role, accessToken }));
      } catch (error) {
        console.error("TokenRefresh failed", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    if (!user) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
      return;
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? <Spinner /> : <Outlet />;
}

export default PersistLogin;
