import { fetchJSON, renderProjects, fetchGithubData } from '../global.js';

// const projects = await fetchJSON('../lib/projects.json');
// const latestProjects = projects.slice(0, 3);

// const projectsContainer = document.querySelector('.projects');

// renderProjects(latestProjects, projectsContainer, 'h2');

(async () => {
    try {
        const projects = await fetchJSON('./lib/projects.json');

        const latestProjects = projects.slice(0, 3);

        const projectsContainer = document.querySelector('.projects');

        if (latestProjects && latestProjects.length > 0) {
            latestProjects.forEach((project) => renderProjects(project, projectsContainer, 'h3'));
        } else {
            projectsContainer.innerHTML = '<p>No projects available to display.</p>';
        }
    } catch (error) {
        console.error('Error fetching or rendering projects:', error);
    }
})();

///////////////////////////

// import { fetchGitHubData } from '../global.js';

// (async () => {
//   const username = 'AndresRiera'; // Replace with your GitHub username
//   const profileStats = document.querySelector('#profile-stats');

//   if (!profileStats) {
//     console.error('#profile-stats container not found in HTML.');
//     return;
//   }

//   try {
//     const githubData = await fetchGitHubData(username);

//     if (githubData) {
//       profileStats.innerHTML = `
//         <dl>
//           <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
//           <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
//           <dt>Followers:</dt><dd>${githubData.followers}</dd>
//           <dt>Following:</dt><dd>${githubData.following}</dd>
//         </dl>
//       `;
//     } else {
//       profileStats.innerHTML = '<p>Unable to fetch GitHub data.</p>';
//     }
//   } catch (error) {
//     console.error('Error rendering GitHub data:', error);
//     profileStats.innerHTML = '<p>Failed to load GitHub stats.</p>';
//   }
// })();

//---------------------------

import { fetchGitHubData } from '../global.js';

(async () => {
  const username = 'AndresRiera'; // Replace with your GitHub username
  const profileStats = document.querySelector('#profile-stats');

  if (!profileStats) {
    console.error('#profile-stats container not found in HTML.');
    return;
  }

  try {
    const githubData = await fetchGitHubData(username);
    console.log('Fetched GitHub Data:', githubData);

    if (githubData) {
      const {
        public_repos = 'N/A',
        public_gists = 'N/A',
        followers = 'N/A',
        following = 'N/A',
      } = githubData;

      profileStats.innerHTML = `
        <dl>
          <dt>Public Repos:</dt><dd>${public_repos}</dd>
          <dt>Public Gists:</dt><dd>${public_gists}</dd>
          <dt>Followers:</dt><dd>${followers}</dd>
          <dt>Following:</dt><dd>${following}</dd>
        </dl>
      `;
    } else {
      profileStats.innerHTML = '<p>Unable to fetch GitHub data.</p>';
    }
  } catch (error) {
    console.error('Error rendering GitHub data:', error);
    profileStats.innerHTML = '<p>Failed to load GitHub stats.</p>';
  }
})();
