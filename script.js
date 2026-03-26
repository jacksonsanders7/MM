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

const grid = document.getElementById("tutors");
const filterForm = document.getElementById("filterForm");
const subjectFilter = document.getElementById("subjectFilter");
const rateFilter = document.getElementById("rateFilter");
const searchFilter = document.getElementById("searchFilter");

function populateSubjects() {
  const subjects = [...new Set(tutors.flatMap((tutor) => tutor.subjects))].sort();

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.append(option);
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

populateSubjects();
renderTutors(tutors);
