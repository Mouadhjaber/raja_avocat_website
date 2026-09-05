let currentLang = 'fr';

function changeLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');

    localStorage.setItem('preferred-lang', lang);
    
    document.title = lang === 'fr' ? 'Me Raja Abbassi - Avocate Tunisie' : 
                     lang === 'en' ? 'Me Raja Abbassi - Lawyer Tunisia' : 
                     'المحامية رجاء عباسي - تونس';
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.name.value;
        const email = this.email.value;
        const phone = this.phone.value;
        const message = this.message.value;
        
        const subject = encodeURIComponent('Contact from Website - ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message);
        
        window.location.href = 'mailto:raja.abbassi@example.com?subject=' + subject + '&body=' + body;
        
        alert(currentLang === 'ar' ? 'شكراً لتواصلكم! سيتم فتح برنامج البريد الإلكتروني.' : 
              currentLang === 'en' ? 'Thank you! Your email client will open.' : 
              'Merci! Votre client email va s\'ouvrir.');
        this.reset();
    });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

const savedLang = localStorage.getItem('preferred-lang');
if (savedLang) {
    changeLang(savedLang);
} else {
    changeLang('fr');
}