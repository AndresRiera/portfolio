// import { fetchJSON, renderProjects } from '../global.js';

// const projects = await fetchJSON('../lib/projects.json');

// const projectsContainer = document.querySelector('.projects');

// renderProjects(projects, projectsContainer, 'h2');

//---------------------------

// import { fetchJSON, renderProjects } from '../global.js';

// (async () => {
//     const projects = await fetchJSON('../lib/projects.json');

//     const projectsContainer = document.querySelector('.projects');

//     if (projects && projects.length > 0) {
//         projects.forEach((project) => {
//             renderProjects(project, projectsContainer, 'h2');
//         });
//     } else {
//         projectsContainer.innerHTML = '<p>No projects to display at the moment.</p>';
//     }
// })();

// ----------------------------


import { fetchJSON, renderProjects } from '../global.js';

(async () => {
    // Fetch project data
    const projects = await fetchJSON('../lib/projects.json');

    // Update project count in the title
    const projectsTitle = document.querySelector('.projects-title');
    projectsTitle.textContent = `Projects (${projects.length})`;

    // Render project cards
    const projectsContainer = document.querySelector('.projects');
    if (projects && projects.length > 0) {
        projects.forEach((project) => {
            renderProjects(project, projectsContainer, 'h2');
        });
    } else {
        projectsContainer.innerHTML = '<p>No projects to display at the moment.</p>';
    }
})();