// Mobile menu toggle function (MUST be at top for onclick)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    navMenu.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
}

// Global section switching function (for onclick in HTML)
function showSection(sectionId) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    scrollToSection(sectionId);
    
    // Close mobile menu
    if (window.innerWidth <= 768) {
        navMenu.classList.remove('mobile-active');
        hamburger.classList.remove('active');
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeNavigation();
    initializeDropdowns();
    initializeButtons();
    initializeScrollEffects();
    initializeAnimations();
});

// Mobile menu initialization
function initializeMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // Close mobile menu when clicking on any link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && !link.closest('.dropdown')) {
                navMenu.classList.remove('mobile-active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Handle dropdown clicks on mobile
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('mobile-open');
                    }
                });
                
                dropdown.classList.toggle('mobile-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navMenu && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        
        link.addEventListener('click', function(e) {
            // Set active state
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Handle specific navigation
            if (linkText === 'home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (linkText === 'facilities') {
                e.preventDefault();
                scrollToSection('facility');
            } else if (linkText === 'infrastructure') {
                e.preventDefault();
                scrollToSection('welcome');
            } else if (linkText === 'contact us') {
                e.preventDefault();
                scrollToSection('footer');
            }
            
            // Handle Gallery dropdown items - FIXED
            if (linkText.includes('photo gallery') || linkText.includes('video gallery')) {
                e.preventDefault();
                scrollToSection('facility');
            }
        });
    });
}

// Unified scroll function
function scrollToSection(sectionId) {
    let target;
    
    const idMap = {
        'facility': '.facilities-section',
        'welcome': '#welcome',
        'director': '#director',
        'principal': '#principal',
        'footer': '.main-footer'
    };
    
    target = document.querySelector(idMap[sectionId] || `#${sectionId}`);
    
    if (target && sectionId !== 'facility') {
        target = target.closest('.welcome-section') || target;
    }
    
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        addHighlightEffect(target);
    }
}

// Highlight effect
function addHighlightEffect(element) {
    element.style.backgroundColor = '#f0f8ff';
    element.style.transition = 'background-color 0.5s ease';
    setTimeout(() => {
        element.style.backgroundColor = '';
    }, 2000);
}

// Dropdown functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('a');
        let timeout;

        // Desktop: hover behavior
        if (menu) {
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    clearTimeout(timeout);
                    showDropdown(menu);
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    timeout = setTimeout(() => hideDropdown(menu), 200);
                }
            });
        }
    });

    // Close on outside click or escape (desktop only)
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown') && window.innerWidth > 768) {
            closeAllDropdowns();
        }
    });
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAllDropdowns();
    });
}

function showDropdown(menu) {
    if (menu && window.innerWidth > 768) {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
    }
}

function hideDropdown(menu) {
    if (menu && window.innerWidth > 768) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (window.innerWidth > 768) {
            hideDropdown(menu);
        } else {
            menu.classList.remove('mobile-open');
        }
    });
}

// Button functionality
function initializeButtons() {
    const applyBtn = document.getElementById('apply-btn');
    const phoneBtn = document.getElementById('phone');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', e => {
            e.preventDefault();
            showCustomAlert('To Apply for Admission, Please visit our School Campus at H.No. 317/12, Hans Enclave, Near Rajiv Chowk, Gurugram, Haryana');
        });
    }
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', e => {
            e.preventDefault();
            showCustomAlert('Please call on +91-8284959139 or WhatsApp: +91-9041679747');
        });
    }
}

// Custom alert modal
function showCustomAlert(message) {
    const existingModal = document.querySelector('.custom-alert-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'custom-alert-modal';
    modal.innerHTML = `
        <div class="custom-alert-content">
            <h3>Shree Radha Krishna School</h3>
            <p>${message}</p>
            <button class="alert-close-btn">OK</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.alert-close-btn');
    closeBtn.onclick = closeCustomAlert;
    modal.onclick = e => { if (e.target === modal) closeCustomAlert(); };
    
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeCustomAlert() {
    const modal = document.querySelector('.custom-alert-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                
                if (scrollTop > 100) {
                    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                    header.style.backdropFilter = 'blur(10px)';
                } else {
                    header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                    header.style.backdropFilter = 'none';
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Intersection Observer animations
function initializeAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe sections
    document.querySelectorAll('.facilities-section, .why-choose-section, .welcome-section, .hero-section').forEach(section => {
        observer.observe(section);
    });

    // Observe facility cards
    document.querySelectorAll('.facility-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add enhanced styles dynamically
const styles = document.createElement('style');
styles.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    /* Section animations */
    .facilities-section, .why-choose-section, .welcome-section, .hero-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .facilities-section.animate-in,
    .why-choose-section.animate-in,
    .welcome-section.animate-in,
    .hero-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Hero animations */
    .hero-text {
        animation: slideInLeft 1s ease-out;
    }
    
    .hero-image {
        animation: slideInRight 1s ease-out;
    }
    
    /* Facility cards */
    .facility-card {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .facility-card:hover h3 {
        background: linear-gradient(135deg, #40BCD8 0%, #1E3A8A 100%);
    }
    
    /* Button effects */
    .apply-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .apply-btn:hover::before {
        width: 300px;
        height: 300px;
    }
    
    /* Image hover effects */
    .welcome-image img, .why-choose-image img, .hero-image img {
        transition: transform 0.5s ease;
    }
    
    .welcome-image:hover img, 
    .why-choose-image:hover img,
    .hero-image:hover img {
        transform: scale(1.05);
    }
    
    /* Custom Alert Modal */
    .custom-alert-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    }
    
    .custom-alert-content {
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 450px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: scaleIn 0.3s ease-out;
    }
    
    .custom-alert-content h3 {
        color: #1E3A8A;
        margin-bottom: 20px;
        font-size: 24px;
    }
    
    .custom-alert-content p {
        color: #666;
        margin-bottom: 25px;
        line-height: 1.8;
        font-size: 16px;
    }
    
    .alert-close-btn {
        background: linear-gradient(135deg, #40BCD8 0%, #1E3A8A 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .alert-close-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(64, 188, 216, 0.4);
    }
    
    /* Active navigation state */
    .nav-menu a.active {
        background: #40BCD8 !important;
        color: white !important;
    }
`;
document.head.appendChild(styles);
