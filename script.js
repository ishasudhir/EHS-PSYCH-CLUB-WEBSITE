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
