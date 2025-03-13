// Gestion des FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Ferme toutes les autres réponses
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Bascule l'état actif de l'élément cliqué
            item.classList.toggle('active');
        });
    });
}

// Animation des étapes au scroll
function initializeStepAnimations() {
    const stepContainers = document.querySelectorAll('.step-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    stepContainers.forEach(container => {
        observer.observe(container);
    });
}

// Gestion du scroll smooth pour les ancres
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation des features au hover
function initializeFeatureAnimations() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.querySelector('i').classList.add('fa-beat');
        });
        
        feature.addEventListener('mouseleave', () => {
            feature.querySelector('i').classList.remove('fa-beat');
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQ();
    initializeStepAnimations();
    initializeSmoothScroll();
    initializeFeatureAnimations();
}); 