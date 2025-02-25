const ARE_WE_HOME = document.documentElement.classList.contains('home');


console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'Projects/projects.html', title: 'Projects' },
    { url: 'Contact/contact.html', title: 'Contact' },
    { url: 'Resume/resume.html', title: 'Resume' },
    { url: 'Meta/meta.html', title: 'Meta' },
    { url: 'https://github.com/AndresRiera', title: 'GitHub' },
  ];

  let nav = document.createElement('nav');
  document.body.prepend(nav);

  for (let p of pages) {
    let url = p.url;
    let title = p.title;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');

        a.target = "_blank"
      }

    if (a.host !== location.host) {
        a.target = "_blank";
      }
  }

  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select id="theme-switcher">
        <option value="auto">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>`
  );
  
  const select = document.querySelector('#theme-switcher');

  if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme;

    document.documentElement.style.setProperty('color-scheme', savedScheme);
  
    select.value = savedScheme;
  } else {
    select.value = 'auto';
  }
  
  select.addEventListener('input', function (event) {
    const selectedTheme = event.target.value;
  
    localStorage.colorScheme = selectedTheme;

    document.documentElement.style.setProperty('color-scheme', selectedTheme);
  
    console.log('Color scheme changed to:', selectedTheme);
  });

    const form = document.querySelector('#contact-form');

    form?.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = new FormData(form);

    let url = form.action; 
    let params = [];

    for (let [name, value] of data) {
        params.push(`${name}=${encodeURIComponent(value)}`);
    }

    url += `?${params.join('&')}`;

    location.href = url;
    });


    export async function fetchJSON(url) {
      try {
        // console.log('Fetching JSON from:', url); // Log the URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch JSON: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      } 
      catch (error) {
        console.error("Error fetching or parsing JSON data:", error);
        
      }
    }

    // export function renderProjects(project, containerElement, headingLevel = "h2") {
    //   if (!containerElement) {
    //       console.error("Invalid container element.");
    //       return;
    //   }
    
    //   const article = document.createElement("article");
    //   article.innerHTML = `
    //       <${headingLevel}>${project.title}</${headingLevel}>
    //       <img src="${project.image}" alt="${project.title}">
    //       <time datetime="${project.year}">${project.year}</time>
    //       <p>${project.description}</p>
    //   `;
    //   containerElement.appendChild(article);
    // }

    export function renderProjects(project, containerElement, headingLevel = "h2") {
      if (!containerElement) {
          console.error("Invalid container element.");
          return;
      }
  
      // Render the project card with the year displayed
      const article = document.createElement("article");
      article.classList.add("project-card");
      article.innerHTML = `
          <${headingLevel} class="project-title">${project.title}</${headingLevel}>
          
          
          
          <p class="project-description">${project.description}</p>
          <time class="project-year" datetime="${project.year}">${project.year}</time>
          <img src="${project.image}" alt="${project.title}" class="project-image">
          
      `;
      containerElement.appendChild(article);
  }

    export async function fetchGitHubData(username) {
    // return statement here
  
      return fetchJSON(`https://api.github.com/users/${username}`);
    }

