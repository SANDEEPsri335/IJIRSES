// Main JavaScript for IJIRSES Journal

$(document).ready(function() {
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-toggle="popover"]').popover();
    
    // Smooth scroll for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });
    
    // Equal height for cards
    function equalHeight() {
        $('.match-height').matchHeight({
            byRow: true,
            property: 'height',
            target: null
        });
    }
    
    // Call equal height on load and resize
    equalHeight();
    $(window).resize(function() {
        equalHeight();
    });
    
    // Sticky navigation on scroll
    var navbar = document.getElementById("sticky-navbar");
    if (navbar) {
        var sticky = navbar.offsetTop;
        
        window.onscroll = function() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        };
    }
    
    // Get The App Icon scroll behavior
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var target = $('#target');
        
        if (scroll > 100) {
            target.css({
                'position': 'fixed',
                'top': '440px'
            });
        } else {
            target.css({
                'position': 'absolute',
                'top': '440px'
            });
        }
    });
    
    // Mobile menu close on click
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Language dropdown hover effect
    $('.multi_lang').hover(
        function() {
            $(this).find('.dropdown-menu').addClass('show');
        },
        function() {
            $(this).find('.dropdown-menu').removeClass('show');
        }
    );
    
    // Article search filter (if search form exists)
    $('#articleSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('.article-card').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    
    // Load more articles button
    $('#loadMore').click(function() {
        var hiddenArticles = $('.article-card.hidden');
        if (hiddenArticles.length > 0) {
            hiddenArticles.slice(0, 5).removeClass('hidden');
        }
        if ($('.article-card.hidden').length === 0) {
            $('#loadMore').hide();
        }
