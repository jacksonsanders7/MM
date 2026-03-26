const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const defaultTutors = [
  { name: "Aaliyah R.", grade: "11th Grade", subjects: ["Algebra", "Geometry"], rate: 25, bio: "Math club captain." },
  { name: "Mateo S.", grade: "College Sophomore", subjects: ["Chemistry", "Biology"], rate: 32, bio: "Pre-med tutor." },
  { name: "Jamie L.", grade: "12th Grade", subjects: ["Essay Writing", "History"], rate: 22, bio: "Writing coach." },
];

function loadTutors() {
  try {
    const stored = JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
const defaultTutors = [
const tutors = [
  {
    name: "Aaliyah R.",
    grade: "11th Grade",
    subjects: ["Algebra", "Geometry"],
    rate: 25,
    bio: "Math club captain who makes equations feel less scary.",
  },
  {
    name: "Mateo S.",
    grade: "College Sophomore",
    subjects: ["Chemistry", "Biology"],
    rate: 32,
    bio: "Pre-med student with AP science tutoring experience.",
  },
  {
    name: "Jamie L.",
    grade: "12th Grade",
    subjects: ["Essay Writing", "History"],
    rate: 22,
    bio: "Helps with thesis statements, outlining, and revision.",
  },
  {
    name: "Noah K.",
    grade: "College Freshman",
    subjects: ["JavaScript", "Computer Science"],
    rate: 35,
    bio: "CS major focused on beginner-friendly coding sessions.",
  },
  {
    name: "Priya D.",
    grade: "10th Grade",
    subjects: ["Spanish", "Study Skills"],
    rate: 18,
    bio: "Peer mentor for language learners and organization habits.",
  },
  {
    name: "Jordan T.",
    grade: "12th Grade",
    subjects: ["Calculus", "Physics"],
    rate: 40,
    bio: "STEM tutor specializing in AP Calc and mechanics.",
  },
];

const STUDENT_STORAGE_KEY = "mentorMooseStudents";
const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const grid = document.getElementById("tutors");
const filterForm = document.getElementById("filterForm");
const subjectFilter = document.getElementById("subjectFilter");
const rateFilter = document.getElementById("rateFilter");
const searchFilter = document.getElementById("searchFilter");
const studentAccountForm = document.getElementById("studentAccountForm");
const tutorAccountForm = document.getElementById("tutorAccountForm");
const accountMessage = document.getElementById("accountMessage");
const studentAccountList = document.getElementById("studentAccountList");
const tutorAccountList = document.getElementById("tutorAccountList");

function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadFromStorage(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const tutors = [...defaultTutors, ...loadTutors()];

const grid = document.getElementById("tutors");
const filterForm = document.getElementById("filterForm");
const subjectFilter = document.getElementById("subjectFilter");
const rateFilter = document.getElementById("rateFilter");
const searchFilter = document.getElementById("searchFilter");

function populateSubjects() {
  subjectFilter.innerHTML = '<option value="all">All subjects</option>';
  const subjects = [...new Set(tutors.flatMap((t) => t.subjects))].sort();
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const studentAccounts = loadFromStorage(STUDENT_STORAGE_KEY);
const tutorAccounts = loadFromStorage(TUTOR_STORAGE_KEY);
const tutors = [...defaultTutors, ...tutorAccounts];

function showAccountMessage(message, isError = false) {
  accountMessage.textContent = message;
  accountMessage.style.color = isError ? "#9e1f35" : "#17663d";

  window.setTimeout(() => {
    if (accountMessage.textContent === message) {
      accountMessage.textContent = "";
    }
  }, 3500);
}

function normalizeSubjects(value) {
  return value
    .split(",")
    .map((subject) => subject.trim())
    .filter(Boolean);
}

function populateSubjects() {
  subjectFilter.innerHTML = '<option value="all">All subjects</option>';

function populateSubjects() {
  const subjects = [...new Set(tutors.flatMap((tutor) => tutor.subjects))].sort();

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.append(option);
  });
}

function createTutorCard(tutor) {
  const card = document.createElement("article");
  card.className = "card tutor-card";

  const name = document.createElement("h3");
  name.textContent = tutor.name;
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${tutor.grade || "Student Tutor"} • $${tutor.rate}/hr`;
  const bio = document.createElement("p");
  bio.textContent = tutor.bio || "Student tutor profile.";

  const tags = document.createElement("div");
  tags.className = "tags";
  const article = document.createElement("article");
  article.className = "card tutor-card";

  const name = document.createElement("h3");
  name.textContent = tutor.name;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${tutor.grade} • $${tutor.rate}/hr`;

  const bio = document.createElement("p");
  bio.textContent = tutor.bio;

  const tags = document.createElement("div");
  tags.className = "tags";

  tutor.subjects.forEach((subject) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = subject;
    tags.append(tag);
  });

  card.append(name, meta, bio, tags);
  return card;
  article.append(name, meta, bio, tags);
  return article;
}

function renderTutors(list) {
  grid.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "card";
    empty.textContent = "No tutors found for these filters.";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "card";
    empty.textContent = "No tutors match those filters yet. Try broadening your search.";
    grid.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach((tutor) => fragment.append(createTutorCard(tutor)));
  grid.append(fragment);
}

function applyFilters() {
  const subject = subjectFilter.value;
  const maxRate = Number(rateFilter.value) || 999;
  const query = searchFilter.value.trim().toLowerCase();

  const filtered = tutors.filter((tutor) => {
    const subjectMatch = subject === "all" || tutor.subjects.includes(subject);
    const rateMatch = Number(tutor.rate) <= maxRate;
    const text = `${tutor.name} ${tutor.subjects.join(" ")} ${tutor.bio || ""}`.toLowerCase();
    const queryMatch = !query || text.includes(query);
function renderAccountLists() {
  studentAccountList.innerHTML = "";
  tutorAccountList.innerHTML = "";

  if (!studentAccounts.length) {
    const emptyStudent = document.createElement("li");
    emptyStudent.textContent = "No student accounts yet.";
    studentAccountList.append(emptyStudent);
  } else {
    studentAccounts.forEach((account) => {
      const item = document.createElement("li");
      item.textContent = `${account.name} (${account.grade})`;
      studentAccountList.append(item);
    });
  }

  if (!tutorAccounts.length) {
    const emptyTutor = document.createElement("li");
    emptyTutor.textContent = "No tutor accounts yet.";
    tutorAccountList.append(emptyTutor);
  } else {
    tutorAccounts.forEach((account) => {
      const item = document.createElement("li");
      item.textContent = `${account.name} — ${account.subjects.join(", ")} ($${account.rate}/hr)`;
      tutorAccountList.append(item);
    });
  }
function renderTutors(list) {
  if (!list.length) {
    grid.innerHTML = '<p class="card">No tutors match those filters yet. Try broadening your search.</p>';
    return;
  }

  grid.innerHTML = list
    .map(
      (tutor) => `
      <article class="card tutor-card">
        <h3>${tutor.name}</h3>
        <p class="meta">${tutor.grade} • $${tutor.rate}/hr</p>
        <p>${tutor.bio}</p>
        <div class="tags">
          ${tutor.subjects.map((subject) => `<span class="tag">${subject}</span>`).join("")}
        </div>
      </article>
    `
    )
    .join("");
}

function applyFilters() {
  const selectedSubject = subjectFilter.value;
  const maxRate = Number(rateFilter.value) || 100;
  const query = searchFilter.value.trim().toLowerCase();

  const filtered = tutors.filter((tutor) => {
    const subjectMatch = selectedSubject === "all" || tutor.subjects.includes(selectedSubject);
    const rateMatch = tutor.rate <= maxRate;
    const text = `${tutor.name} ${tutor.subjects.join(" ")} ${tutor.bio}`.toLowerCase();
    const queryMatch = !query || text.includes(query);
    const subjectMatch =
      selectedSubject === "all" || tutor.subjects.includes(selectedSubject);
    const rateMatch = tutor.rate <= maxRate;
    const text = `${tutor.name} ${tutor.subjects.join(" ")} ${tutor.bio}`.toLowerCase();
    const queryMatch = !query || text.includes(query);

    return subjectMatch && rateMatch && queryMatch;
  });

  renderTutors(filtered);
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

studentAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim().toLowerCase();
  const grade = document.getElementById("studentGrade").value.trim();

  const duplicate = studentAccounts.some((account) => account.email === email);
  if (duplicate) {
    showAccountMessage("A student account with that email already exists.", true);
    return;
  }

  const account = {
    id: generateId(),
    role: "student",
    name,
    email,
    grade,
    createdAt: new Date().toISOString(),
  };

  studentAccounts.push(account);
  const saved = saveToStorage(STUDENT_STORAGE_KEY, studentAccounts);

  if (!saved) {
    showAccountMessage("Unable to save student account in this browser.", true);
    studentAccounts.pop();
    return;
  }

  studentAccountForm.reset();
  renderAccountLists();
  showAccountMessage(`Student account created for ${name}.`);
});

tutorAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("tutorName").value.trim();
  const email = document.getElementById("tutorEmail").value.trim().toLowerCase();
  const subjects = normalizeSubjects(document.getElementById("tutorSubjects").value);
  const rate = Number(document.getElementById("tutorRate").value);

  if (!subjects.length) {
    showAccountMessage("Please provide at least one tutor subject.", true);
    return;
  }

  const duplicate = tutorAccounts.some((account) => account.email === email);
  if (duplicate) {
    showAccountMessage("A tutor account with that email already exists.", true);
    return;
  }

  const account = {
    id: generateId(),
    role: "tutor",
    name,
    email,
    grade: "Student Tutor",
    subjects,
    rate,
    bio: "New mentor on Mentor Moose.",
    createdAt: new Date().toISOString(),
  };

  tutorAccounts.push(account);
  const saved = saveToStorage(TUTOR_STORAGE_KEY, tutorAccounts);

  if (!saved) {
    showAccountMessage("Unable to save tutor account in this browser.", true);
    tutorAccounts.pop();
    return;
  }

  tutors.push(account);
  populateSubjects();
  applyFilters();
  tutorAccountForm.reset();
  renderAccountLists();
  showAccountMessage(`Tutor account created for ${name}.`);
});

populateSubjects();
renderTutors(tutors);
renderAccountLists();
populateSubjects();
renderTutors(tutors);
