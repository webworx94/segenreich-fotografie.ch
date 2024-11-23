// MOBILE NAV (1200px)
    document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarUl = document.querySelector('.navbar ul');
    const menuIcon = document.querySelector('.menu-toggle img.menu-icon');
    const closeIcon = document.querySelector('.menu-toggle img.close-icon');
    const dropdowns = document.querySelectorAll('.dropdown');

    menuToggle.addEventListener('click', function() {
        navbarUl.classList.toggle('open');
        
        if (menuIcon.classList.contains('hidden')) {
            menuIcon.src = 'https://segenreich-fotografie.ch/images/menu.png';
            closeIcon.src = 'https://segenreich-fotografie.ch/images/cancel.png';
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            menuIcon.src = 'https://segenreich-fotografie.ch/images/cancel.png';
            closeIcon.src = 'https://segenreich-fotografie.ch/images/menu.png';
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }

        menuIcon.classList.toggle('rotate');
        closeIcon.classList.toggle('rotate');

        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });

    const mainLinks = document.querySelectorAll('.navbar ul > li > a:not(.dropdown)');
    mainLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        });
    });

    const navLinks = document.querySelectorAll('.navbar ul > li > a');
    function changeColorToLogorot() {
        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.style.color = 'var(--logorot)';
            } else {
                link.style.color = 'var(--logoblau)';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            link.classList.add('active');
            changeColorToLogorot();
        });

        link.addEventListener('mouseleave', function() {
            link.classList.remove('active');
            changeColorToLogorot();
        });

        const dropdown = link.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
            dropdown.addEventListener('mouseenter', function() {
                link.classList.add('active');
                changeColorToLogorot();
            });
            dropdown.addEventListener('mouseleave', function() {
                link.classList.remove('active');
                changeColorToLogorot();
            });
        }
    });

    changeColorToLogorot();
});


// SCROLL-EFFEKT
window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var parallaxElements = document.querySelectorAll('.parallax-img');
    
    parallaxElements.forEach(function(el) {
        var container = el.parentElement;
        var containerTop = container.offsetTop;
        var containerHeight = container.offsetHeight;
        var windowHeight = window.innerHeight;
        
        if (scrolled > containerTop - windowHeight && scrolled < containerTop + containerHeight) {
            var scrollInContainer = scrolled - (containerTop - windowHeight);
            
            // Anpassung der Verschiebung
            var offset = Math.min(scrollInContainer * -0.1, containerHeight * 0.1); 
            
            el.style.transform = `translate(-50%, ${offset}px)`;
        } else {
            // Stelle sicher, dass das Bild bei Nicht-Scrollen in der richtigen Position bleibt
            el.style.transform = `translate(-50%, 0)`;
        }
    });
});


// GALLERY
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlay-image');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;

    // Add click event listeners to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            const imgSrc = item.querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', imgSrc);
            overlay.style.display = 'flex';
            requestAnimationFrame(() => {
                overlay.classList.add('show');
            });
        });
    });

    // Close overlay when close button is clicked
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000); // 1s transition time
    });

    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').getAttribute('src');
        overlayImage.setAttribute('src', imgSrc);
    });

    // Next button functionality
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').getAttribute('src');
        overlayImage.setAttribute('src', imgSrc);
    });

    // Close overlay on outside click
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000); // 1s transition time
        }
    });

    // Keyboard navigation (left/right arrows)
    document.addEventListener('keydown', function(event) {
        if (overlay.classList.contains('show')) {
            if (event.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (event.key === 'ArrowRight') {
                nextBtn.click();
            } else if (event.key === 'Escape') {
                closeBtn.click();
            }
        }
    });

    // Handle responsive grid layout
    function handleResponsiveGrid() {
        const width = window.innerWidth;
        const galleryGrid = document.querySelector('.gallery-grid');
        if (width >= 1000) {
            galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (width >= 700) {
            galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            galleryGrid.style.gridTemplateColumns = '1fr';
        }
    }

    window.addEventListener('resize', handleResponsiveGrid);
    handleResponsiveGrid(); // Initial call

    // Adjust the overlay and close button position for fixed navigation
    function adjustForNav() {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        if (headerHeight > 0) {
            overlay.style.paddingTop = `${headerHeight + 2}rem`; // Moves overlay down by header height + 2rem
            closeBtn.style.top = `${headerHeight + 2}rem`; // Moves close button down by header height + 2rem
        }
    }

    window.addEventListener('resize', adjustForNav);
    adjustForNav(); // Initial call
});

// ZUM FORMULAR SPRINGEN
document.addEventListener('DOMContentLoaded', function() {
    const formSender = document.getElementById('form-sender');
    const nameField = document.getElementById('name-field');

    if (formSender && nameField) {
        formSender.addEventListener('click', function(event) {
            event.preventDefault();  // Verhindert das Standardverhalten des Links

            // Springe zum Namensfeld
            nameField.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Setze einen kleinen Timeout, um sicherzustellen, dass der Fokus erst nach dem Scrollen erfolgt
            setTimeout(function() {
                nameField.focus();
            }, 600);  // Etwas längerer Timeout für mehr Sicherheit
        });
    }
});


// WEITERLEITUNG ZUM ERFOLGREICHEN SENDEN
function handleFormSubmit() {
    // Prevents the default form submission
    event.preventDefault(); 
    
    // Perform an AJAX request to the form action URL
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the confirmation page
            window.location.href = "https://segenreich-fotografie.ch/gesendet/"; 
        } else {
            alert("Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es erneut.");
        }
    })
    .catch(error => {
        alert("Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es erneut.");
    });
    
    return false; // Prevent default form submission
    }
