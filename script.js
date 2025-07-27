// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // Navegação suave
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura da navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
            
            // Fechar menu mobile após clique
            navMenu.classList.remove("active");
        });
    });
    
    // Menu hamburger
    hamburger.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener("click", function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    });
    
// Filtros do portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    
    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll(".portfolio-item, .skill-item, .contact-item");
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
    
    // Navbar transparente/opaca baseada no scroll
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(26, 54, 93, 0.98)";
        } else {
            navbar.style.background = "rgba(26, 54, 93, 0.95)";
        }
    });
    
    // Formulário de contato
    const contactForm = document.querySelector(".contact-form");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = this.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            submitBtn.textContent = "Mensagem Enviada!";
            submitBtn.style.backgroundColor = "#38a169";
            
            // Reset após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = "";
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
    
    // Scroll suave para o botão CTA do hero
    const ctaButton = document.querySelector(".cta-button");
    ctaButton.addEventListener("click", function(e) {
        e.preventDefault();
        const portfolioSection = document.querySelector("#portfolio");
        const offsetTop = portfolioSection.offsetTop - 70;
        
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });
    
    // Animação do scroll indicator no hero
    const heroScroll = document.querySelector(".hero-scroll");
    heroScroll.addEventListener("click", function() {
        const portfolioSection = document.querySelector("#portfolio");
        const offsetTop = portfolioSection.offsetTop - 70;
        
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });
    
    // Adicionar efeito parallax sutil ao hero
    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector(".hero-background");
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Contador animado para estatísticas (se houver)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Validação de formulário em tempo real
    const formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
    
    formInputs.forEach(input => {
        input.addEventListener("blur", function() {
            validateField(this);
        });
        
        input.addEventListener("input", function() {
            if (this.classList.contains("error")) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove mensagens de erro anteriores
        const existingError = field.parentNode.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove("error");
        
        // Validação por tipo de campo
        if (field.type === "email") {
            const emailRegex = /^[^
@]+@[^
@]+\.[^
@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(field, "Por favor, insira um e-mail válido");
                isValid = false;
            }
        }
        
        if (field.hasAttribute("required") && !value) {
            showFieldError(field, "Este campo é obrigatório");
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add("error");
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;
        errorDiv.style.color = "#e53e3e";
        errorDiv.style.fontSize = "0.8rem";
        errorDiv.style.marginTop = "5px";
        field.parentNode.appendChild(errorDiv);
    }
    
    // Lazy loading para imagens
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Força o carregamento
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Adicionar classe CSS para erro de validação
    const style = document.createElement("style");
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e53e3e;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        
        img {
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Inicializar SimpleLightbox
    var lightbox = new SimpleLightbox(".portfolio-grid a", {
        captionSelector: "img",
        captionsData: "alt",
        nav: true,
        showCounter: true,
        loop: true,
        history: false // Desabilitar para evitar problemas com o roteamento de página única
    });

    // Adicionar funcionalidade para PDFs
    document.querySelectorAll(".portfolio-grid a[data-pdf]").forEach(pdfLink => {
        pdfLink.addEventListener("click", function(e) {
            e.preventDefault();
            window.open(this.href, "_blank");
        });
    });

});

// Função para smooth scroll (fallback para navegadores mais antigos)
function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.offsetTop - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

