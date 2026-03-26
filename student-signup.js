const STUDENT_STORAGE_KEY = "mentorMooseStudents";

const form = document.getElementById("studentForm");
const message = document.getElementById("studentMessage");

function loadStudents() {
  try {
    const students = JSON.parse(localStorage.getItem(STUDENT_STORAGE_KEY) || "[]");
    return Array.isArray(students) ? students : [];
  } catch {
    return [];
  }
}

function saveStudents(students) {
  localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(students));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const students = loadStudents();
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim().toLowerCase();
  const grade = document.getElementById("studentGrade").value.trim();
  const password = document.getElementById("studentPassword").value;

  if (students.some((student) => student.email === email)) {
    message.textContent = "Student email already exists.";
    message.style.color = "#9e1f35";
    return;
  }

  students.push({ id: `s-${Date.now()}`, role: "student", name, email, grade, password });
  saveStudents(students);

  form.reset();
  message.textContent = `Student account created for ${name}.`;
  message.style.color = "#17663d";
});
