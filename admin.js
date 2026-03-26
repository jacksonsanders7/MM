const SESSION_KEY = "mentorMooseSession";
const STUDENT_STORAGE_KEY = "mentorMooseStudents";
const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const adminState = document.getElementById("adminState");
const studentList = document.getElementById("studentAccountList");
const tutorList = document.getElementById("tutorAccountList");

function loadAccounts(key) {
  try {
    const accounts = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

function renderList(listEl, items, mapper, emptyText) {
  listEl.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = emptyText;
    listEl.append(li);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = mapper(item);
    listEl.append(li);
  });
}

function showAdminData() {
  const students = loadAccounts(STUDENT_STORAGE_KEY);
  const tutors = loadAccounts(TUTOR_STORAGE_KEY);

  renderList(studentList, students, (s) => `${s.name} • ${s.email} • ${s.grade}`, "No student accounts.");
  renderList(
    tutorList,
    tutors,
    (t) => `${t.name} • ${t.email} • ${t.subjects.join(", ")} • $${t.rate}/hr`,
    "No tutor accounts."
  );
}

function init() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

  if (!session || session.role !== "admin") {
    adminState.textContent = "Admin access required. Login as admin first (username: admin).";
    adminState.style.color = "#9e1f35";
    renderList(studentList, [], () => "", "Login required.");
    renderList(tutorList, [], () => "", "Login required.");
    return;
  }

  adminState.textContent = `Logged in as admin (${session.identifier}).`;
  adminState.style.color = "#17663d";
  showAdminData();
}

init();
