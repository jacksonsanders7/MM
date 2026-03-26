const defaultTutors = [
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

const studentAccounts = JSON.parse(localStorage.getItem(STUDENT_STORAGE_KEY) || "[]");
const tutorAccounts = JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY) || "[]");

const tutors = [...defaultTutors, ...tutorAccounts];

const grid = document.getElementById("tutors");
const filterForm = document.getElementById("filterForm");
const subjectFilter = document.getElementById("subjectFilter");
const rateFilter = document.getElementById("rateFilter");
const searchFilter = document.getElementById("searchFilter");
const studentAccountForm = document.getElementById("studentAccountForm");
const tutorAccountForm = document.getElementById("tutorAccountForm");
const accountMessage = document.getElementById("accountMessage");

function populateSubjects() {
  subjectFilter.innerHTML = '<option value="all">All subjects</option>';
  const subjects = [...new Set(tutors.flatMap((tutor) => tutor.subjects))].sort();

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.append(option);
  });
}

function showAccountMessage(message) {
  accountMessage.textContent = message;
  window.setTimeout(() => {
    if (accountMessage.textContent === message) {
      accountMessage.textContent = "";
    }
  }, 3500);
}

function saveStudentAccount(account) {
  studentAccounts.push(account);
  localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(studentAccounts));
}

function saveTutorAccount(account) {
  tutorAccounts.push(account);
  localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(tutorAccounts));
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
  const email = document.getElementById("studentEmail").value.trim();
  const grade = document.getElementById("studentGrade").value.trim();

  const account = {
    id: crypto.randomUUID(),
    role: "student",
    name,
    email,
    grade,
    createdAt: new Date().toISOString(),
  };

  saveStudentAccount(account);
  studentAccountForm.reset();
  showAccountMessage(`Student account created for ${name}.`);
});

tutorAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("tutorName").value.trim();
  const email = document.getElementById("tutorEmail").value.trim();
  const subjects = document
    .getElementById("tutorSubjects")
    .value.split(",")
    .map((subject) => subject.trim())
    .filter(Boolean);
  const rate = Number(document.getElementById("tutorRate").value);

  const account = {
    id: crypto.randomUUID(),
    role: "tutor",
    name,
    email,
    grade: "Student Tutor",
    subjects,
    rate,
    bio: "New mentor on Mentor Moose.",
    createdAt: new Date().toISOString(),
  };

  saveTutorAccount(account);
  tutors.push(account);
  populateSubjects();
  applyFilters();
  tutorAccountForm.reset();
  showAccountMessage(`Tutor account created for ${name}.`);
});

populateSubjects();
renderTutors(tutors);
