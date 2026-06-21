/**
 * Vetrion Technologies - Main UI Engine & EmailJS Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Scroll-Animate Parameters (AOS)
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        once: true,
        mirror: false
    });

    // Cache Essential DOM Reference Hooks
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');

    /**
     * Scroll Interface Monitoring Pipeline
     */
    const evaluateScrollState = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', evaluateScrollState);
    evaluateScrollState(); // Execute initial verification state

    /**
     * Active Component Highlighting Engine
     */
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavigationContext = () => {
        const currentScrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            
            if (currentScrollY > sectionTop && currentScrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigationContext);

    /**
     * Animated Counter Engine
     */
    const statCounters = document.querySelectorAll('.stat-number');
    let counterExecutionTriggered = false;

    const executeCounterSequence = () => {
        statCounters.forEach(counter => {
            const targetMetricsValue = parseInt(counter.getAttribute('data-target'), 10);
            const progressionDuration = 2000; // ms
            const stepIncrements = targetMetricsValue / (progressionDuration / 16);
            let temporaryCurrentValue = 0;

            const updateMetricsStep = () => {
                temporaryCurrentValue += stepIncrements;
                if (temporaryCurrentValue >= targetMetricsValue) {
                    counter.innerText = targetMetricsValue;
                } else {
                    counter.innerText = Math.floor(temporaryCurrentValue);
                    requestAnimationFrame(updateMetricsStep);
                }
            };
            requestAnimationFrame(updateMetricsStep);
        });
    };

    // Intersection Observer Configuration for Statistics Matrix
    const statsSectionObserver = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting && !counterExecutionTriggered) {
                counterExecutionTriggered = true;
                executeCounterSequence();
            }
        });
    }, { threshold: 0.2 });

    const targetStatsElement = document.querySelector('.stats-section');
    if (targetStatsElement) {
        statsSectionObserver.observe(targetStatsElement);
    }

    /**
     * EmailJS Secure Transmission Pipeline
     */
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Lock submission mechanism to represent active transport state
            const targetSubmitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnLabel = targetSubmitBtn.innerHTML;
            
            targetSubmitBtn.disabled = true;
            targetSubmitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Transmitting Parameters...`;

            // Collect UI fields into explicit parameters for your EmailJS template map
            const templateParameters = {
                from_name: document.getElementById('clientName').value,
                reply_to: document.getElementById('clientEmail').value,
                architecture_scope: document.getElementById('projectScope').options[document.getElementById('projectScope').selectedIndex].text,
                message_details: document.getElementById('projectDetails').value
            };

            // Transmit data via the EmailJS wrapper
            // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your dashboard codes.
            emailjs.send('service_ulovidd', 'template_wies7ou', templateParameters)
                .then(() => {
                    // Protocol Success Sequence
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                    
                    // Trigger success dynamic UI feedback alert
                    formSuccessAlert.className = "alert alert-success mt-3";
                    formSuccessAlert.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Infrastructure inquiry successfully transmitted . Our desk will respond within business hours.`;
                    formSuccessAlert.classList.remove('d-none');
                })
                .catch((error) => {
                    // Protocol Fault Trapping Sequence
                    console.error('EmailJS Core Failure:', error);
                    formSuccessAlert.className = "alert alert-danger mt-3";
                    formSuccessAlert.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> Transmission failed. Please try again or reach out to solutions@vetrion.io directly.`;
                    formSuccessAlert.classList.remove('d-none');
                })
                .finally(() => {
                    // Re-enable interactive elements
                    targetSubmitBtn.innerHTML = originalBtnLabel;
                    targetSubmitBtn.disabled = false;
                    
                    // Automatically clear runtime alert visibility after 6 seconds
                    setTimeout(() => {
                        formSuccessAlert.classList.add('d-none');
                    }, 6000);
                });
        });
    }

    /**
     * Automatic Responsive Mobile Toggle Closer
     */
    const bsCollapseWrapper = document.getElementById('navbarNav');
    if (bsCollapseWrapper) {
        const bootstrapCollapseInstance = new bootstrap.Collapse(bsCollapseWrapper, { toggle: false });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && bsCollapseWrapper.classList.contains('show')) {
                    bootstrapCollapseInstance.hide();
                }
            });
        });
    }
});