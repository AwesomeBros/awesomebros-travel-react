// lib/api/config/axios.ts
import axios from "axios";
import { SERVER_URL } from "../../constants";

interface FailedRequestQueueItem {
  resolve: (value?: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

// ✅ 리다이렉트 제거하고 세션만 초기화
const logoutUser = async () => {
  try {
    await axios.post(`${SERVER_URL}/auth/logout`);
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);
  }

  // ✅ 세션 스토어 초기화 (리다이렉트 안함)
  try {
    const { resetSession, setIsAuthenticated } = await import(
      "../../stores"
    ).then((m) => m.useSessionStore.getState());
    resetSession();
    setIsAuthenticated(false);
    console.log("✅ 세션 정보 초기화 완료");
  } catch (storeError) {
    console.error("❌ 세션 초기화 실패:", storeError);
  }
};

export const apiPublic = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  withCredentials: true,
});

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];
let refreshAttempts = 0; // ✅ 재시도 횟수 추가
const MAX_REFRESH_ATTEMPTS = 1; // ✅ 최대 1번만 시도

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom: FailedRequestQueueItem) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    // ✅ 성공 시 재시도 횟수 초기화
    refreshAttempts = 0;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      if (error.response.status !== 403) {
        throw new Error(error.response.data.message);
      }
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ✅ 재시도 횟수 체크 (무한 루프 방지)
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        console.log("🚫 최대 토큰 재발급 시도 횟수 초과");
        refreshAttempts = 0;
        logoutUser(); // 세션만 초기화
        return Promise.reject(error);
      }

      // ✅ 더 많은 엔드포인트를 재발급 시도하지 않는 목록에 추가
      const noRefreshEndpoints = [
        "/users/profile",
        "/posts",
        "/auth",
        "/api/posts", // 추가
        "/api/users/profile", // 추가
      ];
      const isNoRefreshEndpoint = noRefreshEndpoints.some((endpoint) =>
        originalRequest.url?.includes(endpoint)
      );

      if (isNoRefreshEndpoint) {
        console.log(
          "🔍 토큰 재발급 시도하지 않는 엔드포인트:",
          originalRequest.url
        );
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      refreshAttempts++; // ✅ 재시도 횟수 증가

      try {
        console.log(
          `🔄 토큰 재발급 시도 (${refreshAttempts}/${MAX_REFRESH_ATTEMPTS})`
        );
        await axios.post(`${SERVER_URL}/users/refresh-token`, null, {
          withCredentials: true,
        });
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ 토큰 재발급 실패:", refreshError);
        processQueue(refreshError);
        logoutUser(); // ✅ 세션만 초기화 (리다이렉트 안함)
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
