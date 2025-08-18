import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/shared";
import { useAuthenticated } from "./lib/query";
import { useSessionStore } from "./lib/stores";
import {
  Home,
  Login,
  Mypage,
  PostDetails,
  PostRedirect,
  Register,
} from "./pages";
import { ProtectedRoute, PublicRoute } from "./routes";

function App() {
  const {
    setSession,
    resetSession,
    setIsAuthenticated,
    isAuthenticated,
    setIsLoading,
  } = useSessionStore();
  const { data: user, checkAuth } = useAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(true);

      checkAuth()
        .then((result) => {
          if (result.data) {
            setSession(result.data);
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.warn("인증 체크 실패:", error?.message);
          resetSession();
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setSession(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [user]);

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

        <Route element={<ProtectedRoute />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
