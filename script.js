const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
menuIcon.addEventListener('click', function(){
    dropdownMenu.classList.toggle('show');
});