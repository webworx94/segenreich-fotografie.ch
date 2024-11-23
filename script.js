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
