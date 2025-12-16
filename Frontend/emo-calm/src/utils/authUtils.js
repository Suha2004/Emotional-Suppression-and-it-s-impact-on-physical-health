const API_URL = "http://localhost:8001";

export const saveAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const authenticatedFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error("Session expired");
  }

  return response;
};

export const saveAssessment = async (assessmentData) => {
  try {
    const res = await authenticatedFetch("/assessment-history", {
      method: "POST",
      body: JSON.stringify(assessmentData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error saving assessment:", error);
    throw error;
  }
};

export const getAssessmentHistory = async () => {
  try {
    const res = await authenticatedFetch("/assessment-history");
    return await res.json();
  } catch (error) {
    console.error("Error fetching assessment history:", error);
    throw error;
  }
};

export const saveChatMessage = async (message, response) => {
  try {
    const res = await authenticatedFetch("/chat-history", {
      method: "POST",
      body: JSON.stringify({ message, response }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error saving chat:", error);
    throw error;
  }
};

export const getChatHistory = async () => {
  try {
    const res = await authenticatedFetch("/chat-history");
    return await res.json();
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};
