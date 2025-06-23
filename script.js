// Load posts from localStorage
window.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});

const form = document.getElementById("submission-form");
const entry = document.getElementById("entry");
const postsContainer = document.getElementById("posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = entry.value.trim();
  if (text) {
    addPost(text);
    savePost(text);
    entry.value = "";
  }
});

function addPost(text) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.innerText = text;
  postsContainer.prepend(postDiv);
}

function savePost(text) {
  let posts = JSON.parse(localStorage.getItem("psychPosts")) || [];
  posts.push(text);
  localStorage.setItem("psychPosts", JSON.stringify(posts));
}

function loadPosts() {
  let posts = JSON.parse(localStorage.getItem("psychPosts")) || [];
  posts.reverse().forEach(addPost);
}

const calendar = document.getElementById("calendar");
const eventDetails = document.getElementById("event-details");

// Sample event data
const events = {
  "2025-06-25": "Podcast with Dr. Balliett",
  "2025-06-30": "Submission Deadline: Summer Research Proposals"
};

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = "";

  // Add blank days before start
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendar.appendChild(blank);
  }

  // Add days
  for (let day = 1; day <= lastDate; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.innerText = day;

    if (events[dateStr]) {
      dayDiv.classList.add("event-day");
    }

    dayDiv.addEventListener("click", () => {
      const event = events[dateStr];
      eventDetails.innerText = event ? `📌 ${event}` : "No events for this date.";
    });

    calendar.appendChild(dayDiv);
  }
}

renderCalendar();
