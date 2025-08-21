import axios from "axios";
import { SERVER_URL } from "../../constants";

interface FailedRequestQueueItem {
  resolve: (value?: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

const logoutUser = async () => {
  try {
    await api.post("/auth/logout", null);
    const { resetSession, setIsAuthenticated } = await import(
      "../../stores"
    ).then((m) => m.useSessionStore.getState());
    resetSession();
    setIsAuthenticated(false);
    // console.log("세션 정보 초기화 완료");
  } catch (storeError) {
    console.error("세션 초기화 실패:", storeError);
  }
};

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 1;

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
    refreshAttempts = 0;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      if (error.response.status !== 401) {
        throw new Error(error.response.data.message);
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        // console.log("최대 토큰 재발급 시도 횟수 초과");
        refreshAttempts = 0;
        logoutUser();
        return Promise.reject(error);
      }

      const noRefreshEndpoints = ["/users/profile"];
      const isNoRefreshEndpoint = noRefreshEndpoints.some((endpoint) =>
        originalRequest.url?.includes(endpoint)
      );

      if (isNoRefreshEndpoint) {
        // console.log(
        //   " 토큰 재발급 시도하지 않는 엔드포인트:",
        //   originalRequest.url
        // );
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
      refreshAttempts++;

      try {
        // console.log(
        //   ` 토큰 재발급 시도 (${refreshAttempts}/${MAX_REFRESH_ATTEMPTS})`
        // );
        await axios.post(`${SERVER_URL}/auth/refresh-token`, null, {
          withCredentials: true,
        });
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        // console.error("토큰 재발급 실패:", refreshError);
        processQueue(refreshError);
        logoutUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
