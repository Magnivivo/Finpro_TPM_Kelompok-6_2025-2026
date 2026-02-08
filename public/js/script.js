document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const icon = i.querySelector('.faq-icon i');
                    if (icon) {
                        icon.className = 'fas fa-plus';
                    }
                });

                if (!isOpen) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) {
                        icon.className = 'fas fa-minus';
                    }
                }
            });
        }
    });

    //Dropdown Login 
    const loginBtn = document.getElementById('loginBtn');
    const dropdown = document.querySelector('.dropdown');
    if (loginBtn && dropdown) {
        loginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) dropdown.classList.remove('active');
        });
    }

    //Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const scrollReveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollReveal);
    scrollReveal();

    //3D Tilt Card
    const cards = document.querySelectorAll('.prize-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = (x - centerX) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    //Animasi Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.3}s`;
        timelineObserver.observe(item);
    });

    console.log("Semua fitur siap! Website Hackathon 2025 Full Version");
});