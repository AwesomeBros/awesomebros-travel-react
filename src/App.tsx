import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/shared";
import { useAuthenticated } from "./lib/query";
import { useSessionStore } from "./lib/stores";
import { Home, Login, PostDetails, PostRedirect, Register } from "./pages";
import { ProtectedRoute, PublicRoute } from "./routes";

function App() {
  const { setSession, resetSession, setIsAuthenticated, isAuthenticated } =
    useSessionStore();
  const { data: user, isError, checkAuth } = useAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth()
        .then((result) => {
          setSession(result.data);
          setIsAuthenticated(!!result.data);
        })
        .catch(() => {
          resetSession();
          setIsAuthenticated(false);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && !isError) {
      setSession(user);
      setIsAuthenticated(true);
    } else if (isError) {
      resetSession();
      setIsAuthenticated(false);
    }
  }, [user, isError]);

  return (
    <Routes>
      <Route element={<Container />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostRedirect />} />
          <Route path="/posts/:id/:slug" element={<PostDetails />} />
        </Route>

        <Route element={<ProtectedRoute />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
