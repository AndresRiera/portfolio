
// import { fetchGitHubData } from '../global.js'; // Import function


// const githubData = await fetchGitHubData('AndresRiera'); // Fetch data
// const profileStats = document.querySelector('#profile-stats'); // Select HTML container

// if (profileStats) {
//     profileStats.innerHTML = `
//             <dl>
//                 <dt>FOLLOWERS:</dt><dd>${githubData.followers}</dd>
//                 <dt>FOLLOWING:</dt><dd>${githubData.following}</dd>
//                 <dt>PUBLIC REPOS:</dt><dd>${githubData.public_repos}</dd>
//                 <dt>PUBLIC GISTS:</dt><dd>${githubData.public_gists}</dd>
//             </dl>
//         `;
//     }

import {fetchGitHubData, fetchJSON, renderProjects } from './global.js';

async function displayLatestProjects() {
    try {
        // Fetch all projects
        const projects = await fetchJSON('./lib/projects.json');
        console.log('Projects fetched:', projects);

        // Filter the latest 3 projects
        const latestProjects = projects.slice(0, 3);
        console.log('Latest projects:', latestProjects);

        // Select the projects container
        const projectsContainer = document.querySelector('.projects');

        if (!projectsContainer) {
            console.error('Projects container not found.');
            return; // exit if container is not found
        }

        // Render the latest projects
        latestProjects.forEach((project) => {
            renderProjects(project, projectsContainer, 'h2');
        });
    } catch (error) {
        console.error('Error displaying latest projects:', error);
    }
}

// Call the function to display the latest projects
displayLatestProjects();

async function displayGitHubProfile() {
    try {
        // Fetch GitHub profile data
        const githubData = await fetchGitHubData('AndresRiera');
        console.log('GitHub Data:', githubData);

        // Select the container element
        const profileStats = document.querySelector('#profile-stats');

        // Check if the container exists
        if (profileStats) {
            // Dynamically update its content using template literals
            profileStats.innerHTML = `
                <dl>
                    <dl>
                    <dt>Username:</dt><dd>${githubData.login}</dd>
                    <dt>Followers:</dt><dd>${githubData.followers}</dd>
                    <dt>Following:</dt><dd>${githubData.following}</dd>
                    <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
                </dl>
            `;
        } else {
            console.error('Profile stats container not found.');
        }
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

// Call the function to display GitHub stats
displayGitHubProfile();