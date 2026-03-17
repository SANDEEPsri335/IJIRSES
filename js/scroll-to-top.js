// Scroll to Top functionality
(function() {
    // Back to top button
    var backTop = document.getElementsByClassName('js-cd-top')[0];
    
    if (backTop) {
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            // browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offsetOpacity = 1200,
            scrollDuration = 700,
            scrolling = false;
        
        // Update visibility and opacity of back to top button
        function updateBackTop() {
            if (scrolling) return;
            
            var top = window.pageYOffset || document.documentElement.scrollTop;
            
            // Back to top button visibility
            if (top >= offset) {
                backTop.classList.add('cd-top--is-visible');
            } else {
                backTop.classList.remove('cd-top--is-visible', 'cd-top--fade-out');
            }
            
            // Back to top button opacity
            if (top >= offsetOpacity) {
                backTop.classList.add('cd-top--fade-out');
            }
        }
        
        // Smooth scroll to top
        function smoothScrollTop(event) {
            event.preventDefault();
            
            if (scrolling) return;
            
            scrolling = true;
            document.documentElement.style.scrollBehavior = 'smooth';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(function() {
                scrolling = false;
                document.documentElement.style.scrollBehavior = '';
            }, scrollDuration);
        }
        
        // Listen to scroll events
        window.addEventListener('scroll', updateBackTop);
        
        // Listen to click events
        backTop.addEventListener('click', smoothScrollTop);
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== "#" && href !== "#0") {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
})();

// jQuery version for backward compatibility
if (typeof jQuery !== 'undefined') {
    (function($) {
        $(document).ready(function() {
            // Scroll to top button
            $(window).scroll(function() {
                if ($(this).scrollTop() > 300) {
                    $('.cd-top').fadeIn();
                } else {
                    $('.cd-top').fadeOut();
                }
            });
            
            $('.cd-top').click(function(event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 700);
            });
            
            // Page scroll to ID
            $("a[rel='m_PageScroll2id']").on('click', function(e) {
                if (this.hash !== "") {
                    e.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - 70
                    }, 800, function() {
                        window.location.hash = hash;
                    });
                }
            });
        });
    })(jQuery);
}
