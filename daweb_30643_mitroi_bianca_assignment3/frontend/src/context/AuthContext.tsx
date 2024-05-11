import { createContext, useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);

export default AuthContext;

const loginUser = async (e: any) => {
  e.preventDefault();
  let response = await fetch("http://127.0.0.1:8000/api/v1/auth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    }),
  });
  console.log(
    JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    }),
  );
  let data = await response.json();
  console.log(data);
  console.log(response);
  if (response.ok) {
    localStorage.setItem("tokens", JSON.stringify(data));
    window.location.pathname = "/Destinations";
    return data;
  } else {
    console.log("error");
    return null;
  }
};

const registerUser = async (e: any) => {
  e.preventDefault();
  let response = await fetch("http://127.0.0.1:8000/api/v1/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    }),
  });
  console.log(
    JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    }),
  );
  let data = await response.json();
  console.log(data);
  console.log(response);
  if (response.ok) {
    window.location.pathname = "/login";
  } else {
    console.log("error");
  }
};

export const AuthProvider = ({
  children,
  e,
}: {
  children: React.ReactNode;
  e: any;
}) => {
  let [authTokens, setAuthTokens] = useState<{
    access: string;
    refresh: string;
  } | null>(null);
  let [user, setUser] = useState<JwtPayload | null>(null);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let tokens: { access: string; refresh: string } = {
      access: "",
      refresh: "",
    };
    let decodedTokens: JwtPayload | null;

    if (localStorage.getItem("tokens")) {
      tokens = JSON.parse(localStorage.getItem("tokens")!);
      console.log(tokens);
      decodedTokens = jwtDecode(tokens.access);
      setUser(decodedTokens);
      console.log(user);
      setAuthTokens(tokens);
      user
        ? window.location.pathname === "/Destinations"
        : window.location.pathname === "/Login";
      logout;
    } else {
      if (window.location.pathname === "/Destinations") {
        navigate("/login");
        window.location.reload();
      }
      loginUser(e).then((tokens) => {
        decodedTokens = jwtDecode(tokens.access);
        setUser(decodedTokens);
      });
    }
  }, [e, navigate]);

  const logout = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("tokens");
  };

  const updateToken = async (e: any) => {
    console.log("updateToken");
    let response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      },
    );
    let data = await response.json();
    console.log(data);
    console.log(response);
    let decodedTokens: JwtPayload | null; // Declare the variable 'decodedTokens'
    let tokens = data; // Declare the variable 'tokens' and assign it the value of 'data'
    if (response.ok) {
      localStorage.setItem("tokens", JSON.stringify(data));
      decodedTokens = jwtDecode(tokens.access);
      setUser(decodedTokens);
      console.log(user);
      setAuthTokens(tokens);
    } else {
      console.log("error");
      setUser(null);
      setAuthTokens(null);
      localStorage.removeItem("tokens");
    }
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logout: logout,
    registerUser: registerUser,
    authTokens: authTokens,
  };

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(
        () => {
          updateToken(e);
        },
        1000 * 60 * 5,
      );
      return () => clearInterval(interval);
    }
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
