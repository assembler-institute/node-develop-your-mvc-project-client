export function saveSession(userData) {
  const oldSession = localStorage.getItem("CurrentUser");

  if (oldSession) localStorage.removeItem("CurrentUser");

  const sessionData = {
    isAuth: true,
    userData: userData.user,
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

export function checkSession() {
  const { isAuth } = JSON.parse(localStorage.getItem("CurrentUser"));

  if (isAuth) return true;
  return false;
}

export function getCurrentUser() {
  const { isAuth, userData } = JSON.parse(localStorage.getItem("CurrentUser"));

  if (isAuth) return userData;
  return null;
}

//TODO function saveProducts(){}
