// Declaring class for navigation bar elements based on CSS
const CLASS_NAVBAR_CONTAINER = 'navbar-container';
const CLASS_NAVBAR_HEADER = 'navbar-header';
const CLASS_NAVBAR_ITEM = 'navbar-item';
const CLASS_NAVBAR_FOOTER = 'navbar-footer';

// Declaring navigation bar contents
const navbar_header_caption = "Stepen's Github Pages";
const navbar_item_caption = [
    'Home',
    'Blog',
    'Projects'
]
const navbar_item_link = [
    'index.html',
    'blog.html',
    'project.html'
]
const navbar_footer_caption = 'About Me';
const navbar_footer_link = 'resume.html';

// Getting reference to navigation bar container
navbar = document.querySelector('.'.concat("",CLASS_NAVBAR_CONTAINER))
// Creating navigation bar header
navbar_header = document.createElement('a');
navbar_header.setAttribute('class',CLASS_NAVBAR_HEADER);
navbar_header.appendChild(document.createTextNode(navbar_header_caption));
navbar.appendChild(navbar_header);
// Creating navigation bar items
for (let id = 0; id < navbar_item_caption.length; id++){
    navbar_item = document.createElement('a');
    navbar_item.setAttribute('class',CLASS_NAVBAR_ITEM);
    navbar_item.setAttribute('href',navbar_item_link[id]);
    navbar_item.appendChild(document.createTextNode(navbar_item_caption[id]));
    navbar.appendChild(navbar_item)
}
// Creating navigation bar header
navbar_footer = document.createElement('a');
navbar_footer.setAttribute('class',CLASS_NAVBAR_FOOTER);
navbar_footer.setAttribute('href',navbar_footer_link);
navbar_footer.setAttribute('target','_blank');
navbar_footer.appendChild(document.createTextNode(navbar_footer_caption));
navbar.appendChild(navbar_footer)