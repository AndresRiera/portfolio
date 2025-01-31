// import { fetchJSON, renderProjects, fetchGithubData } from '../global.js';


// (async () => {
//     try {
//         const projects = await fetchJSON('./lib/projects.json');

//         const latestProjects = projects.slice(0, 3);

//         const projectsContainer = document.querySelector('.projects');

//         if (latestProjects && latestProjects.length > 0) {
//             latestProjects.forEach((project) => renderProjects(project, projectsContainer, 'h3'));
//         } else {
//             projectsContainer.innerHTML = '<p>No projects available to display.</p>';
//         }
//     } catch (error) {
//         console.error('Error fetching or rendering projects:', error);
//     }
// })();


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
//     console.log('Fetched GitHub Data:', githubData);

//     if (githubData) {
//       const {
//         public_repos = 'N/A',
//         public_gists = 'N/A',
//         followers = 'N/A',
//         following = 'N/A',
//       } = githubData;

//       profileStats.innerHTML = `
//         <dl>
//           <dt>Public Repos:</dt><dd>${public_repos}</dd>
//           <dt>Public Gists:</dt><dd>${public_gists}</dd>
//           <dt>Followers:</dt><dd>${followers}</dd>
//           <dt>Following:</dt><dd>${following}</dd>
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


// export async function fetchGitHubData(username) {
//     // return statement here
//     const username = 'AndresRiera'; // Replace with your GitHub username
//     return fetchJSON(`https://api.github.com/users/${username}`);

//   }

//---------------------------

// import { fetchJSON, renderProjects } from '../global.js';

// const projects = await fetchJSON('https://AndresRiera.github.io/portfolio/lib/projects.json');
// console.log("Projects Retrieved:", projects);

// const latestProjects = projects.slice(0, 3);

// const projectsContainer = document.querySelector('.projects');


// renderProjects(latestProjects, projectsContainer, 'h3');
// console.log("Latest Projects:", latestProjects);

import { fetchGitHubData } from '../global.js'; // Import function


const githubData = await fetchGitHubData('AndresRiera'); // Fetch data
const profileStats = document.querySelector('#profile-stats'); // Select HTML container

if (profileStats) {
    profileStats.innerHTML = `
            <dl>
                <dt>FOLLOWERS:</dt><dd>${githubData.followers}</dd>
                <dt>FOLLOWING:</dt><dd>${githubData.following}</dd>
                <dt>PUBLIC REPOS:</dt><dd>${githubData.public_repos}</dd>
                <dt>PUBLIC GISTS:</dt><dd>${githubData.public_gists}</dd>
            </dl>
        `;
    }