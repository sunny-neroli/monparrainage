const API_URL = 'http://votre-domaine.com/api';

// Gestion de la visibilité du mot de passe
function initializePasswordToggles() {
    const toggles = document.querySelectorAll('.toggle-password');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
}

// Vérification de la force du mot de passe
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Longueur minimale
    if (password.length >= 8) strength++;
    
    // Contient des chiffres
    if (/\d/.test(password)) strength++;
    
    // Contient des lettres minuscules et majuscules
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    
    // Contient des caractères spéciaux
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Mise à jour de l'indicateur de force du mot de passe
function updatePasswordStrength() {
    const password = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    password.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        strengthBar.setAttribute('data-strength', strength);
        
        const texts = [
            'Très faible',
            'Faible',
            'Moyen',
            'Fort'
        ];
        
        strengthText.textContent = this.value ? `Force du mot de passe : ${texts[strength - 1] || 'Très faible'}` : 'Force du mot de passe';
    });
}

// Configuration de l'authentification Google
function initializeGoogleAuth() {
    const client = google.accounts.oauth2.initTokenClient({
        client_id: 'VOTRE_CLIENT_ID',
        scope: 'email profile',
        callback: async (response) => {
            if (response.access_token) {
                try {
                    // Récupération des informations de l'utilisateur Google
                    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: {
                            'Authorization': `Bearer ${response.access_token}`
                        }
                    }).then(res => res.json());

                    // Envoi des données au backend
                    const authResponse = await fetch(`${API_URL}/auth/google`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: userInfo.email,
                            firstName: userInfo.given_name,
                            lastName: userInfo.family_name
                        })
                    }).then(res => res.json());

                    if (authResponse.token) {
                        // Stockage du token
                        localStorage.setItem('token', authResponse.token);
                        // Redirection vers la page d'accueil
                        window.location.href = '/index.html';
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'authentification:', error);
                    showError(document.querySelector('.social-signup'), 'Erreur lors de la connexion avec Google');
                }
            }
        }
    });

    document.getElementById('google-signin').addEventListener('click', () => {
        client.requestAccessToken();
    });
}

// Validation du formulaire
function initializeFormValidation() {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Réinitialisation des messages d'erreur
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            userType: 'parrain' // Type d'utilisateur fixé à "parrain"
        };

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }

            // Stockage du token
            localStorage.setItem('token', data.token);
            
            // Redirection vers la page d'accueil
            window.location.href = '/index.html';
        } catch (error) {
            showError(form.querySelector('button[type="submit"]'), error.message);
        }
    });
}

// Affichage des messages d'erreur
function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    element.parentNode.appendChild(errorDiv);
}

// Animation des boutons sociaux
function initializeSocialButtons() {
    const buttons = document.querySelectorAll('.btn-social');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.querySelector('i').classList.add('fa-beat');
        });
        
        button.addEventListener('mouseleave', () => {
            button.querySelector('i').classList.remove('fa-beat');
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggles();
    updatePasswordStrength();
    initializeFormValidation();
    initializeSocialButtons();
    initializeGoogleAuth();
}); 