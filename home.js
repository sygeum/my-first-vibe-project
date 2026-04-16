document.addEventListener('DOMContentLoaded', () => {
    
    // configuration
    const wrapper = document.getElementById('fullpage-wrapper');
    const sections = document.querySelectorAll('.fp-section');
    const dots = document.querySelectorAll('.fp-dot');
    const indicator = document.getElementById('fp-indicator');
    
    let currentIdx = 0;
    let isScrolling = false;
    const scrollDelay = 1000; // ms (Must match or be slightly longer than CSS transition)

    // 1. FullPage Scroll Function
    function moveToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentIdx = index;
        
        // Move wrapper
        wrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;
        
        // Update Indicator
        updateIndicator(currentIdx);
        
        // Trigger Section Animations
        triggerSectionAnimations(currentIdx);

        // Unlock scroll after delay
        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }

    // 2. Indicator & Theme Update
    function updateIndicator(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Change indicator theme based on section data-theme
        const theme = sections[index].getAttribute('data-theme');
        if (theme === 'light') {
            indicator.classList.add('light-theme');
        } else {
            indicator.classList.remove('light-theme');
        }
    }

    // 3. Animation Trigger for focused section
    function triggerSectionAnimations(index) {
        const activeSection = sections[index];
        
        // Add active class to the section itself if it has .reveal
        if (activeSection.classList.contains('reveal')) {
            activeSection.classList.add('active');
        }

        // Hero specific animation (sequential)
        if (activeSection.classList.contains('main-hero')) {
            const heroAnimateEl = activeSection.querySelectorAll('.hero-animate');
            heroAnimateEl.forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), 200 + (i * 200));
            });
        }
        
        // General Reveal elements inside section
        const revealEl = activeSection.querySelectorAll('.reveal');
        revealEl.forEach(el => {
            setTimeout(() => {
                el.classList.add('active');
                // Stagger children if exist
                const staggerItems = el.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, j) => {
                    setTimeout(() => item.classList.add('active'), j * 100);
                });
            }, 300);
        });
    }

    // 4. Interaction Events (Wheel, Key, Click, Touch)
    
    // Mouse Wheel
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        if (e.deltaY > 0) {
            moveToSection(currentIdx + 1);
        } else {
            moveToSection(currentIdx - 1);
        }
    }, { passive: false });

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            moveToSection(currentIdx + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            moveToSection(currentIdx - 1);
        }
    });

    // Dot Click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (isScrolling) return;
            const targetIdx = parseInt(dot.getAttribute('data-index'));
            moveToSection(targetIdx);
        });
    });

    // Mobile/Touch Support (Simple Swipe)
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        const touchEndY = e.changedTouches[0].clientY;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffY) > 50) { // Threshold
            if (diffY > 0) {
                moveToSection(currentIdx + 1);
            } else {
                moveToSection(currentIdx - 1);
            }
        }
    });

    // Initial Trigger (First Section)
    setTimeout(() => {
        moveToSection(0);
    }, 100);

});
