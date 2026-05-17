document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');

    // Filter Logic
    const filterLinks = document.querySelectorAll('nav ul li a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked
            link.classList.add('active');

            const filterValue = link.textContent.toLowerCase();

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category').toLowerCase();
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    // Animation trigger
                    item.style.animation = 'fadeIn 0.5s forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Logic
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            const itemCaption = item.querySelector('.overlay span').textContent;

            lightboxImg.src = imgSrc;
            caption.textContent = itemCaption;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close on click outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Reveal animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
});

// Keyframe injection for filter animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
