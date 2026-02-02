// ===================================
// INITIAL THEME APPLICATION
// ===================================
(function () {
    const currentMode = localStorage.getItem('mode') || 'standard';
    if (currentMode === 'energy') {
        document.body.classList.add('energy-mode');
    }
})();

// ===================================
// TECHNOLOGICAL SOUND (Procedural)
// ===================================

class TechAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playDataSync(progress) {
        this.init();
        if (this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Base frequency increases with progress
        const freq = 100 + (progress * 8);
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Add a slight rhythmic pulse
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playAccessGranted() {
        this.init();
        if (this.ctx.state === 'suspended') return;

        const now = this.ctx.currentTime;
        const freqs = [800, 1200];

        freqs.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.frequency.setValueAtTime(f, now + (i * 0.1));
            gain.gain.setValueAtTime(0, now + (i * 0.1));
            gain.gain.linearRampToValueAtTime(0.1, now + (i * 0.1) + 0.05);
            gain.gain.linearRampToValueAtTime(0, now + (i * 0.1) + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + (i * 0.1));
            osc.stop(now + (i * 0.1) + 0.2);
        });
    }

    playSystemSurge() {
        this.init();
        if (this.ctx.state === 'suspended') return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }
}

const techAudio = new TechAudio();

// ===================================
// TECHNOLOGICAL LOADER LOGIC
// ===================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progressBar');
    const percentageText = document.getElementById('loaderPercentage');
    const statusText = document.getElementById('loaderStatus');

    let progress = 0;
    const loadingMessages = [
        "CARGANDO MÓDULOS DE DATOS...",
        "INICIALIZANDO PROTOCOLOS DE SEGURIDAD...",
        "SINCRONIZANDO CON GRID CENTRAL...",
        "VERIFICANDO FIRMAS DIGITALES...",
        "ACCESO CONCEDIDO"
    ];

    const updateLoader = () => {
        if (progress <= 100) {
            progressBar.style.width = `${progress}%`;
            percentageText.textContent = `${Math.floor(progress)}%`;

            // Randomize status messages
            const msgIndex = Math.min(Math.floor(progress / 25), loadingMessages.length - 1);
            statusText.textContent = loadingMessages[msgIndex];

            // Play procedural sound periodically
            if (Math.floor(progress) % 5 === 0) {
                techAudio.playDataSync(progress);
            }

            progress += Math.random() * 3 + 1; // Faster loading feel

            if (progress < 100) {
                setTimeout(updateLoader, 60);
            } else {
                // Final state
                progressBar.style.width = '100%';
                percentageText.textContent = '100%';
                statusText.textContent = 'SISTEMA OPERATIVO';
                techAudio.playAccessGranted();

                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                        animateCounters();
                    }, 800);
                }, 600);
            }
        }
    };

    // Interaction to unlock audio
    const setupAudio = () => {
        techAudio.init();
        ['click', 'keydown', 'touchstart', 'mousedown'].forEach(evt => {
            document.removeEventListener(evt, setupAudio);
        });
    };

    ['click', 'keydown', 'touchstart', 'mousedown'].forEach(evt => {
        document.addEventListener(evt, setupAudio);
    });

    // Start loading sequence
    setTimeout(updateLoader, 200);
    // ===================================
    // MODE TOGGLE (DARK / ENERGY)
    // ===================================
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = document.getElementById('modeIcon');
    const body = document.body;

    // Check for current mode to sync label
    const currentMode = localStorage.getItem('mode') || 'standard';
    if (currentMode === 'energy') {
        modeIcon.className = 'fas fa-bolt';
    } else {
        modeIcon.className = 'fas fa-moon';
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('energy-mode');
        techAudio.playSystemSurge();

        const isEnergy = body.classList.contains('energy-mode');
        localStorage.setItem('mode', isEnergy ? 'energy' : 'standard');
        modeIcon.className = isEnergy ? 'fas fa-bolt' : 'fas fa-moon';

        // Add a temporary "glitch" or "surge" effect
        body.classList.add('mode-transition');
        setTimeout(() => body.classList.remove('mode-transition'), 1000);
    });

    // ===================================
    // HERO TERMINAL TYPING EFFECT
    // ===================================
    const terminalLines = [
        "Inicializando sistema...",
        "Cargando módulos de software...",
        "AD Software Solutions online."
    ];

    const typingElement = document.querySelector('.typing-text');
    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
        if (lineIndex < terminalLines.length) {
            const currentLine = terminalLines[lineIndex];

            if (charIndex < currentLine.length) {
                typingElement.textContent += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeLine, 50 + Math.random() * 50);
            } else {
                // Line finished
                setTimeout(() => {
                    // Create a new line element to keep previous text
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.innerHTML = `<span class="terminal-prompt">></span>${typingElement.textContent}`;

                    const activeLine = document.querySelector('.terminal-active-line');
                    typingElement.parentElement.insertBefore(newLine, activeLine);

                    // Reset for next line
                    typingElement.textContent = "";
                    lineIndex++;
                    charIndex = 0;

                    if (lineIndex < terminalLines.length) {
                        typeLine();
                    }
                }, 500);
            }
        }
    }

    // Start typing after initial delay
    setTimeout(typeLine, 2500);
});

// ===================================
// ANIMATED COUNTERS
// ===================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };

        updateCounter();
    });
}

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// SCROLL ANIMATIONS (AOS)
// ===================================

// Simple scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Form validation
function validateForm(formData) {
    let isValid = true;
    const errors = {};

    // Name validation
    const name = formData.get('name').trim();
    if (name.length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
    }

    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Por favor ingresa un correo electrónico válido';
        isValid = false;
    }

    // Phone validation
    const phone = formData.get('phone').trim();
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        errors.phone = 'Por favor ingresa un número de teléfono válido';
        isValid = false;
    }

    // Message validation
    const message = formData.get('message').trim();
    if (message.length < 10) {
        errors.message = 'El mensaje debe tener al menos 10 caracteres';
        isValid = false;
    }

    return { isValid, errors };
}

// Display error messages
function displayErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

// Clear error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const validation = validateForm(formData);

    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }

    clearErrors();

    // Get form values
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const message = formData.get('message').trim();

    // Disable submit button
    const submitButton = contactForm.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';

    try {
        // Send email using EmailJS
        emailjs.send('service_0u7ngnl', 'template_b0tdngh', {
            from_name: name,
            from_email: email,
            phone: phone,
            message: message,
            to_email: 'aacostaantonio13@gmail.com'
        })
            .then(() => {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');

                // Reset form
                contactForm.reset();

                // Hide success message and show form again after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    contactForm.style.display = 'block';
                }, 5000);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente por WhatsApp.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente por WhatsApp.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Clear error when user starts typing
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const errorElement = document.getElementById(`${e.target.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});

// ===================================
// EMAILJS CONFIGURATION INSTRUCTIONS
// ===================================

/*
To enable email functionality with EmailJS:

1. Go to https://www.emailjs.com/ and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{from_name}}
   - {{from_email}}
   - {{phone}}
   - {{message}}
   - {{to_email}}
4. Get your Service ID, Template ID, and Public Key
5. Add EmailJS SDK to your HTML (add before closing </body> tag):
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       (function(){
           emailjs.init("YOUR_PUBLIC_KEY");
       })();
   </script>
6. Uncomment the EmailJS code in the form submission handler above
7. Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with your actual values

Alternative: PHP Backend
If you prefer to use PHP instead of EmailJS, create a file called send-email.php:

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "aacostaantonio13@gmail.com";
    $subject = "Nuevo mensaje de contacto - AD Software Solutions";
    $body = "Nombre: $name\nEmail: $email\nTeléfono: $phone\n\nMensaje:\n$message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al enviar el email']);
    }
}
?>

Then update the fetch call in the JavaScript to:

fetch('send-email.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        // Show success message
    } else {
        // Show error
    }
});
*/

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll event
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations or effects can go here
}, 100));

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();

    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }

    console.log('AD Software Solutions - Website loaded successfully');
});
