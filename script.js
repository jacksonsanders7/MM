const TUTOR_STORAGE_KEY = "mentorMooseTutorAccounts";

const defaultTutors = [
  { name: "Aaliyah R.", grade: "11th Grade", subjects: ["Algebra", "Geometry"], rate: 25, bio: "Math club captain." },
  { name: "Mateo S.", grade: "College Sophomore", subjects: ["Chemistry", "Biology"], rate: 32, bio: "Pre-med tutor." },
  { name: "Jamie L.", grade: "12th Grade", subjects: ["Essay Writing", "History"], rate: 22, bio: "Writing coach." },
];

function loadTutors() {
  try {
    const stored = JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) {
      return [];
    }

    return stored
      .map((tutor) => {
        if (!tutor || typeof tutor !== "object") {
          return null;
        }

        const subjects = Array.isArray(tutor.subjects)
          ? tutor.subjects.filter(Boolean)
          : typeof tutor.subjects === "string"
            ? tutor.subjects.split(",").map((subject) => subject.trim()).filter(Boolean)
            : [];

        const rate = Number(tutor.rate);

        if (typeof tutor.name !== "string" || !subjects.length || Number.isNaN(rate)) {
          return null;
        }

        return {
          ...tutor,
          subjects,
          rate,
          bio: tutor.bio || "Student tutor profile.",
          grade: tutor.grade || "Student Tutor",
        };
      })
      .filter(Boolean);
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
  tutor.subjects.forEach((subject) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = subject;
    tags.append(tag);
  });

  card.append(name, meta, bio, tags);
  return card;
}

function renderTutors(list) {
  grid.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "card";
    empty.textContent = "No tutors found for these filters.";
    grid.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach((tutor) => fragment.append(createTutorCard(tutor)));
  grid.append(fragment);
}

function showRecentlyCreatedTutor() {
  const params = new URLSearchParams(window.location.search);
  const tutorId = params.get("newTutor");

  if (!tutorId) {
    return;
  }

  const match = tutors.find((tutor) => tutor.id === tutorId);
  if (!match) {
    return;
  }

  subjectFilter.value = "all";
  rateFilter.value = "200";
  searchFilter.value = "";
  renderTutors([match, ...tutors.filter((tutor) => tutor.id !== tutorId)]);
  window.history.replaceState({}, document.title, window.location.pathname);
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
    return subjectMatch && rateMatch && queryMatch;
  });

  renderTutors(filtered);
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

populateSubjects();
renderTutors(tutors);
showRecentlyCreatedTutor();
