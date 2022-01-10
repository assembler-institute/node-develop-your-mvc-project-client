export function saveSession(userData) {
  const oldSession = localStorage.getItem("CurrentUser");

  if (oldSession) localStorage.removeItem("CurrentUser");

  const sessionData = {
    isAuth: true,
    userData: userData,
  };

  localStorage.setItem("CurrentUser", JSON.stringify(sessionData));
}

export function closeSession() {
  const sessionData = {
    isAuth: false,
    userData: null,
  };

  localStorage.setItem("CurrentUser", JSON.stringify(sessionData));
}
