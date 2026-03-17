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
    });
    
    // Back to top button visibility
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.cd-top').addClass('cd-top--is-visible');
        } else {
            $('.cd-top').removeClass('cd-top--is-visible');
        }
    });
    
    // Form validation for submission pages
    $('#submitManuscriptForm').on('submit', function(e) {
        var isValid = true;
        $(this).find('[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
    
    // Dynamic citation counter (demo)
    function updateCitationCount() {
        // This would normally be an AJAX call to a backend
        var randomIncrease = Math.floor(Math.random() * 3) + 1;
        var currentCount = parseInt($('.citation-count').text());
        if (!isNaN(currentCount)) {
            $('.citation-count').text(currentCount + randomIncrease);
        }
    }
    
    // Update citations every 30 seconds (demo only)
    // setInterval(updateCitationCount, 30000);
    
    // Newsletter subscription
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        var email = $('#newsletterEmail').val();
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            $('#newsletterEmail').val('');
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

// Google Translate initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'es,fr,de,zh,hi,ar,ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Page-specific functions
function showArticleDetails(articleId) {
    // Load article details via AJAX
    $.ajax({
        url: '/api/articles/' + articleId,
        method: 'GET',
        success: function(data) {
            $('#articleModal .modal-body').html(data);
            $('#articleModal').modal('show');
        },
        error: function() {
            alert('Error loading article details. Please try again.');
        }
    });
}

// Export citation in different formats
function exportCitation(articleId, format) {
    window.location.href = '/api/citations/' + articleId + '?format=' + format;
}

// Track manuscript status
function trackManuscript(manuscriptId) {
    $.ajax({
        url: '/api/manuscripts/' + manuscriptId + '/status',
        method: 'GET',
        success: function(data) {
            $('#trackingResult').html(`
                <div class="alert alert-info">
                    <h5>Manuscript: ${manuscriptId}</h5>
                    <p>Status: <strong>${data.status}</strong></p>
                    <p>Last Updated: ${data.lastUpdated}</p>
                    <p>Expected Decision: ${data.expectedDecision}</p>
                </div>
            `);
        },
        error: function() {
            $('#trackingResult').html('<div class="alert alert-danger">Manuscript ID not found. Please check and try again.</div>');
        }
    });
}
