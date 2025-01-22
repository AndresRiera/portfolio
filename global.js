console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '/Users/andresriera/Desktop/dsc-106/portfolio/index.html', title: 'Home' },
    { url: '/Users/andresriera/Desktop/dsc-106/portfolio/projects:index.html', title: 'Projects' },
    { url: '/Users/andresriera/Desktop/dsc-106/portfolio/contact:index.html', title: 'Contact' },
    { url: '/Users/andresriera/Desktop/dsc-106/portfolio/resume.html', title: 'Resume' },
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