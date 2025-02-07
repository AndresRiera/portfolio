

// import { fetchJSON, renderProjects } from '../global.js';

// (async () => {
//     const projects = await fetchJSON('../lib/projects.json');

//     const projectsTitle = document.querySelector('.projects-title');
//     projectsTitle.textContent = `Projects (${projects.length})`;

//     const projectsContainer = document.querySelector('.projects');
//     if (projects && projects.length > 0) {
//         projects.forEach((project) => {
//             renderProjects(project, projectsContainer, 'h2');
//         });
//     } else {
//         projectsContainer.innerHTML = '<p>No projects to display at the moment.</p>';
//     }
// })();



// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// // Define the data
// let data = [
//   { value: 1, label: 'apples' },
//   { value: 2, label: 'oranges' },
//   { value: 3, label: 'mangos' },
//   { value: 4, label: 'pears' },
//   { value: 5, label: 'limes' },
//   { value: 5, label: 'cherries' },
// ];

// // Define colors
// let colors = d3.scaleOrdinal(d3.schemeTableau10);

// // Create pie slices
// let sliceGenerator = d3.pie().value((d) => d.value);
// let arcData = sliceGenerator(data);
// let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// // Draw the pie chart
// arcData.forEach((d, idx) => {
//   d3.select("svg")
//     .append("path")
//     .attr("d", arcGenerator(d))
//     .attr("fill", colors(idx));
// });

// // Generate the legend
// let legend = d3.select('.legend');
// data.forEach((d, idx) => {
//   legend
//     .append('li')
//     .attr('style', `--color:${colors(idx)}`) // Use color scale for styling
//     .attr('class', 'legend-item') // Add class for styling
//     .html(
//       `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>` // Legend content
//     );
// });

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { fetchJSON, renderProjects } from "../global.js";

(async () => {
  // Fetch project data
  const projects = await fetchJSON("../lib/projects.json");

  // Update the projects title with the total count
  const projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = `Projects (${projects.length})`;

  // Render projects below the chart
  const projectsContainer = document.querySelector(".projects");
  if (projects && projects.length > 0) {
    projects.forEach((project) => {
      renderProjects(project, projectsContainer, "h2");
    });
  } else {
    projectsContainer.innerHTML = "<p>No projects to display at the moment.</p>";
  }

  // Group projects by year using d3.rollups()
  const rolledData = d3.rollups(
    projects,
    (v) => v.length,
    (d) => d.year
  );

  // Convert grouped data into the format required by the pie chart
  const data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

  // Set up the pie chart and legend
  const colors = d3.scaleOrdinal(d3.schemeTableau10);
  const sliceGenerator = d3.pie().value((d) => d.value);
  const arcData = sliceGenerator(data);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

  // Draw the pie chart
  const svg = d3.select("svg");
  svg.selectAll("*").remove(); // Clear any existing chart elements
  arcData.forEach((d, idx) => {
    svg
      .append("path")
      .attr("d", arcGenerator(d))
      .attr("fill", colors(idx));
  });

  // Generate the legend
  const legend = d3.select(".legend");
  legend.selectAll("*").remove(); // Clear any existing legend items
  data.forEach((d, idx) => {
    const listItem = legend
      .append("li")
      .style("display", "inline-flex")
      .style("align-items", "center")
      .style("gap", "5px");
    listItem
      .append("span")
      .style("background-color", colors(idx))
      .style("width", "15px")
      .style("height", "15px")
      .style("border-radius", "50%")
      .style("display", "inline-block");
    listItem.append("span").text(`${d.label} (${d.value})`);
  });
})();

// let query = ''; 
// let searchInput = document.querySelector('.searchBar');

// searchInput.addEventListener('change', (event) => {
//     query = event.target.value;
  
//     let filteredProjects = projects.filter((project) => {
//       let values = Object.values(project).join('\n').toLowerCase();
//       return values.includes(query.toLowerCase());
//     });
  
//     renderProjects(filteredProjects, projectsContainer, 'h2');
//   });

let query = '';
let searchInput = document.querySelector('.searchBar');

function renderPieChart(projectsGiven) {
  const newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  const newData = newRolledData.map(([year, count]) => ({
    value: count,
    label: year
  }));

  const svg = d3.select('svg');
  svg.selectAll('*').remove();
  const legend = d3.select('.legend');
  legend.selectAll('*').remove();

  const colors = d3.scaleOrdinal(d3.schemeTableau10);

  const sliceGenerator = d3.pie().value((d) => d.value);
  const arcData = sliceGenerator(newData);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

  arcData.forEach((d, idx) => {
    svg
      .append('path')
      .attr('d', arcGenerator(d))
      .attr('fill', colors(idx));
  });

  newData.forEach((d, idx) => {
    const listItem = legend
      .append('li')
      .style('display', 'inline-flex')
      .style('align-items', 'center')
      .style('gap', '5px');
    listItem
      .append('span')
      .style('background-color', colors(idx))
      .style('width', '15px')
      .style('height', '15px')
      .style('border-radius', '50%')
      .style('display', 'inline-block');
    listItem.append('span').text(`${d.label} (${d.value})`);
  });
}

renderPieChart(projects);

searchInput.addEventListener('change', (event) => {
  query = event.target.value;

  const filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});
