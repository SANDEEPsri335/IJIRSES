// Main JavaScript file

$(document).ready(function() {
  // Set active class in navigation based on current page
  var currentPage = window.location.pathname.split('/').pop();
  
  $('.navbar-nav .nav-link').each(function() {
    var linkPage = $(this).attr('href');
    if (currentPage === linkPage) {
      $(this).addClass('active');
    }
  });
  
  // Initialize popovers if any
  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    placement: 'auto'
  });
});

// Scroll to top functionality
window.addEventListener('scroll', function() {
  var scrollTop = document.querySelector('.cd-top');
  if (scrollTop) {
    if (window.scrollY > 300) {
      scrollTop.classList.add('cd-top--is-visible');
    } else {
      scrollTop.classList.remove('cd-top--is-visible');
    }
  }
});

// Smooth scroll to top
document.querySelector('.cd-top')?.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
