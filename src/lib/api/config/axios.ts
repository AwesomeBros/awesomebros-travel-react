import axios from "axios";
import { SERVER_URL } from "../../constants";

interface FailedRequestQueueItem {
  resolve: (value?: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

const logoutUser = async () => {
  try {
    await axios.post(`${SERVER_URL}/auth/logout`);
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);
  } finally {
    window.location.href = "/login";
  }
};

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];

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

// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      if (error.response.status !== 403) {
        throw new Error(error.response.data.message);
      }
    }

    // ✅ 403 에러 처리 개선
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const noRefreshEndpoints = ["/users/profile"];
      const isNoRefreshEndpoint = noRefreshEndpoints.some((endpoint) =>
        originalRequest.url?.includes(endpoint)
      );

      if (isNoRefreshEndpoint) {
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

      try {
        await axios.post(`${SERVER_URL}/users/refresh-token`, null, {
          withCredentials: true,
        });
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
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
