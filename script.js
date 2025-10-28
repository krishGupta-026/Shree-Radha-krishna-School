// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality after DOM is loaded
    initializeNavigation();
    initializeDropdowns();
    initializeButtons();
    initializeScrollEffects();
    initializeSectionSwitching();
    initializeAnimations();
    initializeCustomNavigation(); // New function for custom navigation
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links with href="#"
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-menu a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Custom Navigation Functionality - NEW FUNCTION
function initializeCustomNavigation() {
    // Get navigation links
    const facilitiesLink = document.querySelector('.nav-menu a[href="#"]:nth-of-type(3)'); // Facilities
    const infrastructureLink = document.querySelector('.nav-menu a[href="#"]:nth-of-type(4)'); // Infrastructure
    const galleryDropdown = document.querySelector('.nav-menu li:nth-child(7)'); // Gallery dropdown
    
    // Alternative method - get by text content for more reliability
    const navLinks = document.querySelectorAll('.nav-menu a');
    let facilitiesNav, infrastructureNav, galleryNav;
    
    navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText === 'facilities') {
            facilitiesNav = link;
        } else if (linkText === 'infrastructure') {
            infrastructureNav = link;
        }
    });
    
    // Get gallery dropdown link
    const galleryDropdownLinks = document.querySelectorAll('.nav-menu .dropdown a');
    galleryDropdownLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText.includes('gallery')) {
            galleryNav = link;
        }
    });

    // 1. Facilities link -> scroll to facilities section
    if (facilitiesNav) {
        facilitiesNav.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('facilities-section');
            setActiveNav(this);
        });
    }

    // 2. Infrastructure link -> scroll to welcome section
    if (infrastructureNav) {
        infrastructureNav.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('welcome');
            setActiveNav(this);
        });
    }

    // 3. Gallery dropdown links -> scroll to facilities section
    const galleryPhotoLink = document.querySelector('.dropdown-menu a:contains("Photo Gallery")');
    const galleryVideoLink = document.querySelector('.dropdown-menu a:contains("Video Gallery")');
    
    // More reliable way to get gallery dropdown items
    const galleryDropdownItems = document.querySelectorAll('.dropdown-menu a');
    galleryDropdownItems.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText.includes('photo gallery') || linkText.includes('video gallery') || linkText.includes('gallery')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('facilities-section');
                setActiveNav(link.closest('.dropdown').querySelector('a'));
            });
        }
    });
}

// Helper function to scroll to specific sections
function scrollToSection(sectionIdentifier) {
    let targetElement;
    
    // Handle different section identifiers
    switch(sectionIdentifier) {
        case 'facilities-section':
            targetElement = document.querySelector('.facilities-section');
            break;
        case 'welcome':
            targetElement = document.getElementById('welcome') || document.querySelector('.welcome-section');
            break;
        default:
            targetElement = document.getElementById(sectionIdentifier) || document.querySelector('.' + sectionIdentifier);
    }
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add temporary highlight effect
        addHighlightEffect(targetElement);
    }
}

// Helper function to set active navigation state
function setActiveNav(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Helper function to add highlight effect to scrolled section
function addHighlightEffect(element) {
    const originalBackground = element.style.backgroundColor;
    element.style.backgroundColor = '#f0f8ff';
    element.style.transition = 'background-color 0.5s ease';
    
    setTimeout(() => {
        element.style.backgroundColor = originalBackground;
        setTimeout(() => {
            element.style.transition = '';
        }, 500);
    }, 2000);
}

// Improved dropdown functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('a');
        let isOpen = false;
        let timeout;

        // Mouse enter - show dropdown
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            showDropdown(dropdownMenu);
            isOpen = true;
        });

        // Mouse leave - hide dropdown with delay
        dropdown.addEventListener('mouseleave', function() {
            timeout = setTimeout(() => {
                hideDropdown(dropdownMenu);
                isOpen = false;
            }, 200);
        });

        // Click toggle for mobile
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                if (isOpen) {
                    hideDropdown(dropdownMenu);
                    isOpen = false;
                } else {
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            hideDropdown(otherDropdown.querySelector('.dropdown-menu'));
                        }
                    });
                    showDropdown(dropdownMenu);
                    isOpen = true;
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
}

function showDropdown(menu) {
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateY(0)';
    menu.style.pointerEvents = 'auto';
}

function hideDropdown(menu) {
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateY(-10px)';
    menu.style.pointerEvents = 'none';
}

function closeAllDropdowns() {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => hideDropdown(menu));
}

// Section switching functionality - PRESERVING ALL THREE SECTIONS
function initializeSectionSwitching() {
    // Keep all three sections visible by default as in your original design
    const welcomeSection = document.getElementById('welcome');
    const directorSection = document.getElementById('director'); 
    const principalSection = document.getElementById('principal');
    
    // All sections remain visible as in your original design
    if (welcomeSection) welcomeSection.closest('.welcome-section').style.display = 'block';
    if (directorSection) directorSection.closest('.welcome-section').style.display = 'block';
    if (principalSection) principalSection.closest('.welcome-section').style.display = 'block';
}

// Global function for section switching - This allows dropdown navigation to specific sections
function showSection(sectionId) {
    // Scroll to the specific section when clicked from dropdown
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.closest('.welcome-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect temporarily
        addHighlightEffect(targetSection.closest('.welcome-section'));
    }
}

// Button functionality
function initializeButtons() {
    // Apply button
    const applyBtn = document.getElementById('apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCustomAlert('To Apply for Admission, Please visit our School Campus at H.No. 317/12, Hans Enclave, Near Rajiv Chowk, Gurugram, Haryana');
            addRippleEffect(this, e);
        });
    }

    // Phone button
    const phoneBtn = document.getElementById('phone');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCustomAlert('Please call on +91-8284959139 or WhatsApp: +91-9041679747');
        });
    }

    // All buttons ripple effect
    const buttons = document.querySelectorAll('button, .apply-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            addRippleEffect(this, e);
        });
    });
}

// Custom alert function
function showCustomAlert(message) {
    // Create custom alert modal
    const modal = document.createElement('div');
    modal.className = 'custom-alert-modal';
    modal.innerHTML = `
        <div class="custom-alert-content">
            <h3>Shree Radha Krishna School</h3>
            <p>${message}</p>
            <button onclick="closeCustomAlert()" class="alert-close-btn">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeCustomAlert() {
    const modal = document.querySelector('.custom-alert-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Ripple effect for buttons
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll effects and animations
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    const scrollHandler = debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, 10);
    
    window.addEventListener('scroll', scrollHandler);
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.facilities-section, .why-choose-section, .welcome-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Facility cards animation
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Utility function for debouncing
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

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (navMenu) {
        navMenu.classList.toggle('mobile-active');
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
    }
}

// Enhanced CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .custom-alert-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .custom-alert-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .custom-alert-content h3 {
        color: #1E3A8A;
        margin-bottom: 15px;
    }
    
    .custom-alert-content p {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .alert-close-btn {
        background: #40BCD8;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    
    .alert-close-btn:hover {
        background: #1E3A8A;
    }
    
    /* Highlight effect for section navigation */
    .welcome-section, .facilities-section {
        transition: background-color 0.5s ease;
    }
    
    /* Active navigation state */
    .nav-menu a.active {
        background: #40BCD8 !important;
        color: white !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #1E3A8A;
            z-index: 1000;
        }
        
        .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            background: rgba(255,255,255,0.1);
            margin-left: 20px;
        }
    }
`;
document.head.appendChild(additionalStyles);
