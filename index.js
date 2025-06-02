import {
  bio,
  skills,
  education,
  experience,
  research,
  footer,
  youtubeVideos
} from "./user-data/data.js";

import { URLs } from "./user-data/urls.js";

const { gitConnected, gitRepo } = URLs;

async function fetchReposFromGit(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const repos = await response.json();
    // Sort repositories by stars in descending order
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Transform the GitHub API response to the format expected by populateRepo
    const formattedRepos = repos.map(repo => ({
      name: repo.name,
      description: repo.description || "No description available",
      author: repo.owner.login,
      language: repo.language || "Not specified",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }));
    
    populateRepo(formattedRepos, "repos");
  } catch (error) {
    console.error(`Error fetching repositories: ${error}`);
    
    // Display error message in the repos section
    const reposElement = document.getElementById("repos");
    if (reposElement) {
      reposElement.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #666;">
          <p>Could not load repositories. Please check your GitHub username and connection.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    }
  }
}

function populateYouTubeVideos(videos, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  videos.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-md-6 animate-box";

    const card = document.createElement("div");
    card.className = "video-card";
    card.style = `
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      transition: transform 0.3s ease-in-out;
    `;

    card.onmouseover = () => card.style.transform = "translateY(-5px)";
    card.onmouseout = () => card.style.transform = "translateY(0)";

    const thumbnail = document.createElement("img");
    thumbnail.src = video.thumbnail;
    thumbnail.alt = video.title;
    thumbnail.style = "width: 100%; height: auto;";

    const caption = document.createElement("div");
    caption.style = "padding: 15px;";
    caption.innerHTML = `<h4 style="margin: 0;">${video.title}</h4>`;

    const link = document.createElement("a");
    link.href = video.url;
    link.target = "_blank";
    link.style = "text-decoration: none; color: inherit;";
    link.appendChild(thumbnail);
    link.appendChild(caption);

    card.appendChild(link);
    col.appendChild(card);
    container.appendChild(col);
  });
}


async function fetchReposWithFallback() {
  try {
    // First try the direct GitHub API
    await fetchReposFromGit(gitRepo);
  } catch (error) {
    console.error("GitHub API request failed, trying local backup:", error);
    
    // If that fails, try to load from a local repos.json file
    try {
      const response = await fetch('./user-data/repos.json');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const items = await response.json();
      populateRepo(items, "repos");
    } catch (fallbackError) {
      console.error("Local repository backup also failed:", fallbackError);
      
      // Show error message in the repos section
      const reposElement = document.getElementById("repos");
      if (reposElement) {
        reposElement.innerHTML = `
          <div style="padding: 20px; text-align: center; color: #666;">
            <p>Could not load repositories. GitHub API may be rate limited.</p>
            <p>Create a local repos.json file in your user-data directory as a backup.</p>
          </div>
        `;
      }
    }
  }
}

async function fetchGitConnectedData(url) {
  try {
    const response = await fetch(url);
    const { basics } = await response.json();
    mapBasicResponse(basics);
  } catch (error) {
    console.error(`Error in fetching data from git connected: ${error}`);
  }
}

function mapBasicResponse(basics) {
  // Add page title from user data
  if (basics && basics.name) {
    window.parent.document.title = basics.name;
  }
}

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  if (!bioTag) return;
  
  // Clear existing content
  bioTag.innerHTML = '';
  
  items.forEach((bioItem) => {
    const p = getElement("p", null);
    p.innerHTML = bioItem;
    bioTag.append(p);
  });
}

function populateSkills(items, id) {
  const skillsTag = document.getElementById(id);
  if (!skillsTag) return;
  
  // Clear existing content
  skillsTag.innerHTML = '';
  
  items.forEach((item) => {
    const h3 = getElement("li", null);
    h3.innerHTML = item;

    const divProgressWrap = getElement("div", "progress-wrap");
    divProgressWrap.append(h3);

    const divAnimateBox = getElement("div", "col-md-12 animate-box");
    divAnimateBox.append(divProgressWrap);

    skillsTag.append(divAnimateBox);
  });
}

function populateRepo(items, id) {
  const projectdesign = document.getElementById(id);
  if (!projectdesign) return;
  
  // Clear existing content
  projectdesign.innerHTML = '';
  
  // If no repos were found
  if (!items || items.length === 0) {
    projectdesign.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666;">
        <p>No repositories found. Make sure your GitHub username is correct.</p>
      </div>
    `;
    return;
  }
  
  const count = Math.min(4, items.length); // Show up to 4 repos
  
  // Set up a wrapper div to hold repo cards in rows of 2
  const rowWrapper = document.createElement("div");
  rowWrapper.style =
    "display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;";
  projectdesign.appendChild(rowWrapper);

  for (let i = 0; i < count; i++) {
    // Create elements for each repo card
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";
    repoCard.style = `
          flex: 1 0 48%;  /* Two cards in one row */
          min-width: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          background: linear-gradient(135deg, #ADE069, #009C58);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
          cursor: pointer;
      `;

    // Make the card clickable by wrapping the content inside an anchor tag
    const repoLink = document.createElement("a");
    repoLink.href = items[i].url || `https://github.com/${items[i].author}/${items[i].name}`;
    repoLink.target = "_blank";
    repoLink.style =
      "text-decoration: none; color: black; display: block; height: 100%;";

    repoCard.appendChild(repoLink);

    // Repository name
    const repoName = document.createElement("h4");
    repoName.className = "repo-heading";
    repoName.innerHTML = items[i].name;
    repoName.style = "margin: 0; font-size: 18px; font-weight: bold;";
    repoLink.appendChild(repoName);

    // Repository description
    const repoDescription = document.createElement("p");
    repoDescription.className = "repo-description";
    repoDescription.innerHTML = items[i].description || "No description available";
    repoDescription.style = "margin-top: 8px; font-size: 12px; color: #555;";
    repoLink.appendChild(repoDescription);

    // Stats row (Language, Stars, Forks)
    const statsRow = document.createElement("div");
    statsRow.style = `
          display: flex; 
          align-items: center; 
          gap: 16px; 
          margin-top: 12px; 
          font-size: 12px; 
          color: #666;
      `;

    // Language
    const languageDiv = document.createElement("div");
    languageDiv.style = "display: flex; align-items: center; gap: 4px;";
    languageDiv.innerHTML = `
          <span style="width: 8px; height: 8px; background-color: #666; border-radius: 50%; display: inline-block;"></span>
          ${items[i].language || "N/A"}
      `;
    statsRow.appendChild(languageDiv);

    // Stars
    const starsDiv = document.createElement("div");
    starsDiv.style = "display: flex; align-items: center; gap: 4px;";
    starsDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/star--v1.png" alt="Stars">
          ${items[i].stars || 0}
      `;
    statsRow.appendChild(starsDiv);

    // Forks
    const forksDiv = document.createElement("div");
    forksDiv.style = "display: flex; align-items: center; gap: 4px;";
    forksDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/code-fork.png" alt="Forks">
          ${items[i].forks || 0}
      `;
    statsRow.appendChild(forksDiv);

    repoLink.appendChild(statsRow);

    // Add the repo card to the row wrapper
    rowWrapper.appendChild(repoCard);
  }
}

function populateExp_Edu(items, id) {
  let mainContainer = document.getElementById(id);
  if (!mainContainer) return;
  
  // Clear existing content
  mainContainer.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    let spanTimelineSublabel = document.createElement("span");
    spanTimelineSublabel.className = "timeline-sublabel";
    spanTimelineSublabel.innerHTML = items[i].subtitle;

    let spanh2 = document.createElement("span");
    spanh2.innerHTML = items[i].duration;

    let h2TimelineLabel = document.createElement("h2");
    h2TimelineLabel.innerHTML = items[i].title;
    h2TimelineLabel.append(spanh2);

    let divTimelineLabel = document.createElement("div");
    divTimelineLabel.className = "timeline-label";
    divTimelineLabel.append(h2TimelineLabel);
    divTimelineLabel.append(spanTimelineSublabel);

    for (let j = 0; j < items[i].details.length; j++) {
      let pTimelineText = document.createElement("p");
      pTimelineText.className = "timeline-text";
      pTimelineText.innerHTML = "&blacksquare; " + items[i].details[j];
      divTimelineLabel.append(pTimelineText);
    }

    let divTags = document.createElement("div");
    for (let j = 0; j < items[i].tags.length; j++) {
      let spanTags = document.createElement("span");
      spanTags.className = "badge";
      spanTags.innerHTML = items[i].tags[j];
      divTags.append(spanTags);
    }
    divTimelineLabel.append(divTags);

    let iFa = document.createElement("i");
    iFa.className = "fa fa-" + items[i].icon;

    let divTimelineIcon = document.createElement("div");
    divTimelineIcon.className = "timeline-icon color-2";
    divTimelineIcon.append(iFa);

    let divTimelineEntryInner = document.createElement("div");
    divTimelineEntryInner.className = "timeline-entry-inner";
    divTimelineEntryInner.append(divTimelineIcon);
    divTimelineEntryInner.append(divTimelineLabel);

    let article = document.createElement("article");
    article.className = "timeline-entry animate-box";
    article.append(divTimelineEntryInner);

    mainContainer.append(article);
  }

  let divTimelineIcon = document.createElement("div");
  divTimelineIcon.className = "timeline-icon color-2";

  let divTimelineEntryInner = document.createElement("div");
  divTimelineEntryInner.className = "timeline-entry-inner";
  divTimelineEntryInner.append(divTimelineIcon);

  let article = document.createElement("article");
  article.className = "timeline-entry begin animate-box";
  article.append(divTimelineEntryInner);

  mainContainer.append(article);
}

function populateLinks(items, id) {
  let footer = document.getElementById(id);
  if (!footer) return;
  
  // Clear existing content
  footer.innerHTML = '';

  items.forEach(function (item) {
    if (item.label !== "copyright-text") {
      let span = document.createElement("span");
      span.className = "col";

      let p = document.createElement("p");
      p.className = "col-title";
      p.innerHTML = item.label;
      span.append(p);

      let nav = document.createElement("nav");
      nav.className = "col-list";

      let ul = document.createElement("ul");
      item.data.forEach(function (data) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (data.link) {
          a.href = data.link;
          a.target = "_blank";
        }
        if (data.func) {
          a.setAttribute("onclick", data.func);
        }
        a.innerHTML = data.text;

        li.append(a);
        ul.append(li);
      });
      nav.append(ul);
      span.append(nav);
      footer.append(span);
    }

    if (item.label === "copyright-text") {
      let div = document.createElement("div");
      div.className = "copyright-text no-print";
      item.data.forEach(function (copyright) {
        let p = document.createElement("p");
        p.innerHTML = copyright;
        div.append(p);
      });
      footer.append(div);
    }
  });
}

function getElement(tagName, className) {
  let item = document.createElement(tagName);
  if (className) {
    item.className = className;
  }
  return item;
}

function populateResearch(projects, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // If no projects were found
  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666;">
        <p>No research projects found. Add your projects to the research array in data.js file.</p>
      </div>
    `;
    return;
  }
  
  // Create a card for each research project
  projects.forEach(project => {
    // Create the main card div
    const card = document.createElement('div');
    card.className = 'research-card';
    
    // Create the card header with image and icon
    const cardHeader = document.createElement('div');
    cardHeader.className = 'research-card-header';
    
    // Add the image if provided
    if (project.image) {
      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.title;
      cardHeader.appendChild(img);
    }
    
    // Add the icon
    const icon = document.createElement('div');
    icon.className = 'research-icon';
    icon.innerHTML = `<i class="fa fa-${project.icon}"></i>`;
    cardHeader.appendChild(icon);
    
    // Create the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'research-card-body';
    
    // Add the title
    const title = document.createElement('h3');
    title.className = 'research-card-title';
    title.textContent = project.title;
    cardBody.appendChild(title);
    
    // Add the date
    const date = document.createElement('div');
    date.className = 'research-card-date';
    date.textContent = project.date;
    cardBody.appendChild(date);
    
    // Add the description
    const description = document.createElement('p');
    description.className = 'research-card-description';
    description.textContent = project.description;
    cardBody.appendChild(description);
    
    // Add tags if provided
    if (project.tags && project.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'research-card-tags';
      
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'research-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
      
      cardBody.appendChild(tagsContainer);
    }
    
    // Add links if provided
    if (project.links && project.links.length > 0) {
      const linksContainer = document.createElement('div');
      linksContainer.className = 'research-card-links';
      
      project.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.className = 'research-card-link';
        linkElement.href = link.url;
        linkElement.textContent = link.text;
        linkElement.target = '_blank';
        linksContainer.appendChild(linkElement);
      });
      
      cardBody.appendChild(linksContainer);
    }
    
    // Assemble the card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    
    // Add the card to the container
    container.appendChild(card);
  });
}

// Initialize the page content
populateBio(bio, "bio");
populateSkills(skills, "skills");
populateExp_Edu(experience, "experience");
populateExp_Edu(education, "education");
populateResearch(research, "research-cards");
populateLinks(footer, "footer");
populateYouTubeVideos(youtubeVideos, "youtube-videos");

// Fetch external data - using the fallback approach for more reliability
fetchReposWithFallback();
fetchGitConnectedData(gitConnected);