const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const form = document.getElementById("tutorForm");
const message = document.getElementById("tutorMessage");

function loadTutors() {
  try {
    const tutors = JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY) || "[]");
    return Array.isArray(tutors) ? tutors : [];
  } catch {
    return [];
  }
}

function saveTutors(tutors) {
  localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(tutors));
}

function normalizeSubjects(value) {
  return value.split(",").map((x) => x.trim()).filter(Boolean);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const tutors = loadTutors();
  const name = document.getElementById("tutorName").value.trim();
  const email = document.getElementById("tutorEmail").value.trim().toLowerCase();
  const subjects = normalizeSubjects(document.getElementById("tutorSubjects").value);
  const rate = Number(document.getElementById("tutorRate").value);
  const password = document.getElementById("tutorPassword").value;

  if (!subjects.length) {
    message.textContent = "Add at least one subject.";
    message.style.color = "#9e1f35";
    return;
  }

  if (tutors.some((tutor) => tutor.email === email)) {
    message.textContent = "Tutor email already exists.";
    message.style.color = "#9e1f35";
    return;
  }

  tutors.push({
    id: `t-${Date.now()}`,
    role: "tutor",
    name,
    email,
    subjects,
    rate,
    grade: "Student Tutor",
    bio: "New mentor on Mentor Moose.",
    password,
  });

  saveTutors(tutors);
  form.reset();
  message.textContent = `Tutor account created for ${name}.`;
  message.style.color = "#17663d";
});
