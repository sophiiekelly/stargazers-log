const fallbackRepositories = [
  {
    name: "octocat/hello-world",
    description: "A friendly starter project for learning GitHub workflows.",
    language: "HTML",
    stars: 128,
    url: "https://github.com/octocat/hello-world"
  }
];

function renderRepositories(repositories) {
  const list = document.getElementById("repositories-list");

  if (!list) {
    return;
  }

  if (!repositories.length) {
    list.innerHTML = '<li class="error">No starred repositories found yet.</li>';
    return;
  }

  list.innerHTML = repositories
    .map((repository) => {
      const stars = repository.stars?.toLocaleString() ?? "0";
      return `
        <li class="repo-card">
          <a href="${repository.url}" target="_blank" rel="noreferrer">${repository.name}</a>
          <p>${repository.description}</p>
          <div class="repo-meta">
            <span>⭐ ${stars}</span>
            <span>${repository.language || "Unknown"}</span>
          </div>
        </li>
      `;
    })
    .join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    console.error(error);
    renderRepositories(fallbackRepositories);
  }
}

document.addEventListener("DOMContentLoaded", loadRepositories);
