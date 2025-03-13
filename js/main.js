// Données des marques populaires (à remplacer par des données réelles)
const popularBrands = [
    {
        name: 'Amazon',
        logo: 'images/amazon-logo.png',
        description: 'Jusqu\'à 30€ offerts pour votre première commande',
        link: '#'
    },
    {
        name: 'Uber Eats',
        logo: 'images/ubereats-logo.png',
        description: '10€ de réduction sur votre première commande',
        link: '#'
    },
    {
        name: 'Boursorama',
        logo: 'images/boursorama-logo.png',
        description: '80€ offerts à l\'ouverture d\'un compte',
        link: '#'
    },
    // Ajoutez d'autres marques ici
];

// Fonction pour charger les marques populaires
function loadPopularBrands() {
    const brandsGrid = document.querySelector('.brands-grid');
    if (!brandsGrid) return;

    popularBrands.forEach(brand => {
        const brandCard = document.createElement('div');
        brandCard.className = 'brand-card';
        brandCard.innerHTML = `
            <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
            <h3>${brand.name}</h3>
            <p>${brand.description}</p>
            <a href="${brand.link}" class="brand-link">Voir l'offre</a>
        `;
        brandsGrid.appendChild(brandCard);
    });
}

// Gestion du menu burger
function initializeMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (!burgerMenu || !navLinks) return;

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });
}

// Gestion de la barre de recherche
function initializeSearch() {
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (!searchBox || !searchButton) return;

    searchButton.addEventListener('click', () => {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            // Implémenter la logique de recherche ici
            console.log('Recherche pour:', searchTerm);
        }
    });

    // Permettre la recherche avec la touche Entrée
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Animation du header au scroll
function initializeScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll vers le bas
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll vers le haut
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
}

// Initialisation des animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.step, .hero-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadPopularBrands();
    initializeMobileMenu();
    initializeSearch();
    initializeScrollHeader();
    initializeAnimations();
}); 