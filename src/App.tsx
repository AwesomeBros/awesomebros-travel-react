import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import Container from "./components/shared";
import { useSessionStore } from "./lib/stores/session";
import { Home, Login, Register } from "./pages";
import { ProtectedRoute, PublicRoute } from "./routes";

function App() {
  const { setSession, resetSession, setLoading } = useSessionStore();
  const [cookies] = useCookies();

  useEffect(() => {
    setLoading(true);
    if (!cookies.userInfo) {
      resetSession();
      return;
    } else {
      try {
        const userInfo =
          typeof cookies.userInfo === "string"
            ? JSON.parse(cookies.userInfo)
            : cookies.userInfo;
        setSession(userInfo);
      } catch (error) {
        resetSession();
      }
    }
  }, [cookies.userInfo, setSession, resetSession, setLoading]);

  return (
    <Routes>
      <Route element={<Container />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
