const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "mentor-moose-admin";
const SESSION_KEY = "mentorMooseSession";
const STUDENT_STORAGE_KEY = "mentorMooseStudents";
const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

function loadAccounts(key) {
  try {
    const accounts = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

function setSession(role, identifier) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ role, identifier, loggedInAt: new Date().toISOString() }));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const role = document.getElementById("role").value;
  const identifier = document.getElementById("identifier").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (role === "admin") {
    if (identifier === ADMIN_USER && password === ADMIN_PASSWORD) {
      setSession(role, identifier);
      message.textContent = "Admin login successful. Go to Admin page.";
      message.style.color = "#17663d";
      return;
    }
    message.textContent = "Invalid admin credentials.";
    message.style.color = "#9e1f35";
    return;
  }

  const accounts = role === "student" ? loadAccounts(STUDENT_STORAGE_KEY) : loadAccounts(TUTOR_STORAGE_KEY);
  const match = accounts.find((account) => account.email === identifier && account.password === password);

  if (!match) {
    message.textContent = `Invalid ${role} credentials.`;
    message.style.color = "#9e1f35";
    return;
  }

  setSession(role, identifier);
  message.textContent = `${role[0].toUpperCase() + role.slice(1)} login successful.`;
  message.style.color = "#17663d";
});
