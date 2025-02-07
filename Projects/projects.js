

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
  function renderProjectsList(projectsToRender) {
    projectsContainer.innerHTML = ""; // Clear the container
    if (projectsToRender && projectsToRender.length > 0) {
      projectsToRender.forEach((project) => {
        renderProjects(project, projectsContainer, "h2");
      });
    } else {
      projectsContainer.innerHTML = "<p>No projects to display at the moment.</p>";
    }
  }
  renderProjectsList(projects);

  // Function to render the pie chart
  function renderPieChart(projectsToRender) {
    const rolledData = d3.rollups(
      projectsToRender,
      (v) => v.length,
      (d) => d.year
    );

    const data = rolledData.map(([year, count]) => ({
      value: count,
      label: year,
    }));

    const svg = d3.select("svg");
    svg.selectAll("*").remove(); // Clear any existing chart elements

    const colors = d3.scaleOrdinal(d3.schemeTableau10);
    const sliceGenerator = d3.pie().value((d) => d.value);
    const arcData = sliceGenerator(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // Draw pie slices
    arcData.forEach((d, idx) => {
      svg
        .append("path")
        .attr("d", arcGenerator(d))
        .attr("fill", colors(idx));
    });

    // Generate legend
    const legend = d3.select(".legend");
    legend.selectAll("*").remove(); // Clear existing legend items
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
  }

  // Initial pie chart rendering
  renderPieChart(projects);

  // Search functionality
  const searchInput = document.querySelector(".searchBar");
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();

    // Filter projects based on search query
    const filteredProjects = projects.filter((project) => {
      const values = Object.values(project).join("\n").toLowerCase();
      return values.includes(query);
    });

    // Update projects list and pie chart
    renderProjectsList(filteredProjects);
    renderPieChart(filteredProjects);
  });
})();

