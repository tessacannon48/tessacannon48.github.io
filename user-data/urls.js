// user-data/urls.js
const githubUsername = "tessacannon48";

// Export the URLs directly
export const URLs = {
  // Standard GitHub API endpoint for repositories
  gitRepo: `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`,
  
  // GitConnected profile information
  gitConnected: `https://gitconnected.com/v1/portfolio/${githubUsername}`
};