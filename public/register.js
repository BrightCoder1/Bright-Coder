

// Responsive
let open = document.getElementById("open");
// let close = document.getElementById("close");
let nav_ul = document.querySelector(".nav-ul");



open.addEventListener('click', function (){
  nav_ul.classList.toggle('active-bar');
})