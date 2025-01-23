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
    { url: 'https://github.com/AndresRiera', title: 'GitHub' },
  ];

  let nav = document.createElement('nav');
  document.body.prepend(nav);

  for (let p of pages) {
    let url = p.url;
    let title = p.title;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  }