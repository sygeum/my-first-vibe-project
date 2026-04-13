document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on
    const signupForm = document.getElementById('signup-form');
    const dashboardStats = document.getElementById('stat-vehicles');

    // 1. Dashboard Simulation Logic
    if (dashboardStats) {
        initDashboard();
    }

    // 2. Signup Form Logic
    if (signupForm) {
        initSignupForm();
    }

    // Global: Mouse move animation for blobs
    initBlobAnimation();

    function initDashboard() {
        const vehicles = document.getElementById('stat-vehicles');
        const dataVal = document.getElementById('stat-data');
        const speedVal = document.getElementById('stat-speed');

        let vehicleCount = 24;
        let totalData = 1.2;
        
        setInterval(() => {
            // Randomly fluctuate vehicle count
            vehicleCount += Math.floor(Math.random() * 3) - 1;
            if (vehicleCount < 10) vehicleCount = 10;
            vehicles.innerText = vehicleCount;

            // Increment data
            totalData += Math.random() * 0.05;
            dataVal.innerText = totalData.toFixed(2) + ' TB';

            // Fluctuate speed
            const speed = 40 + Math.random() * 10;
            speedVal.innerText = speed.toFixed(1) + ' Km/h';
        }, 3000);
    }

    function initSignupForm() {
        const form = signupForm;
        const inputs = form.querySelectorAll('input');
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');
        const strengthBar = document.getElementById('strength-bar');
        const strengthMeter = document.getElementById('strength-meter');
        const successOverlay = document.getElementById('success-overlay');

        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            if (val.length > 0) {
                strengthMeter.style.display = 'block';
                let strength = 0;
                if (val.length >= 10) strength++; // Updated requirement
                if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
                if (/[^A-Za-z0-9]/.test(val)) strength++;

                strengthBar.className = 'strength-bar';
                if (strength === 1) strengthBar.classList.add('weak');
                else if (strength === 2) strengthBar.classList.add('medium');
                else if (strength >= 3) strengthBar.classList.add('strong');
            } else {
                strengthMeter.style.display = 'none';
            }
        });

        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.parentElement.parentElement.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        function validateInput(input) {
            const group = input.parentElement.parentElement;
            let isValid = true;

            if (input.required && !input.value) {
                isValid = false;
            } else if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(input.value);
            } else if (input.id === 'password') {
                isValid = input.value.length >= 10;
            } else if (input.id === 'confirm-password') {
                isValid = input.value === passwordInput.value;
            }

            if (isValid) {
                group.classList.remove('error');
                group.classList.add('success');
            } else {
                group.classList.remove('success');
                group.classList.add('error');
            }
            return isValid;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) isFormValid = false;
            });

            if (isFormValid) {
                const btn = document.getElementById('submit-btn');
                btn.disabled = true;
                btn.innerHTML = '처리 중...';
                setTimeout(() => {
                    successOverlay.classList.add('active');
                }, 1500);
            }
        });
    }

    function initBlobAnimation() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const blob1 = document.querySelector('.blob-1');
            const blob2 = document.querySelector('.blob-2');
            
            if (blob2) blob2.style.transform = `translate(${x * -60}px, ${y * -60}px)`;
        });
    }

    // 4. Tab UI Logic (for about-facility.html)
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        initTabs();
    }

    function initTabs() {
        const btns = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                btns.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button and target content
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
                
                // Optional: Scroll to top of content for better UX on mobile
                const showcase = document.querySelector('.tabs-container');
                if (window.innerWidth < 768) {
                    showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 5. GNB Component Logic
    initGNB();

    function initGNB() {
        const gnbRoot = document.getElementById('gnb-root');
        if (!gnbRoot) return;

        const path = window.location.pathname;
        const currentPage = path.split('/').pop() || 'index.html';
        
        const gnbHTML = `
        <nav class="navbar">
            <div class="container">
                <a href="index.html" class="logo">
                    <div class="logo-dot"></div>
                    ADBC Center
                </a>
                <div class="nav-links">
                    <div class="has-dropdown">
                        <a href="#" class="${['about-purpose.html', 'about-facility.html', 'operation-control-map.html', 'operation-infra.html', 'center-location.html'].includes(currentPage) ? 'active' : ''}">센터 소개</a>
                        <div class="dropdown-menu">
                            <a href="about-purpose.html">설립목적</a>
                            <a href="about-facility.html">자율주행 관제센터</a>
                            <a href="operation-control-map.html">자율주행 운영 범위</a>
                            <a href="center-location.html">센터 위치</a>
                        </div>
                    </div>
                    <div class="has-dropdown">
                        <a href="board-notice.html" class="${['board-notice.html', 'board-view.html', 'board-write.html'].includes(currentPage) ? 'active' : ''}">게시판</a>
                        <div class="dropdown-menu">
                            <a href="board-notice.html">공지사항</a>
                            <a href="#">FAQ</a>
                            <a href="#">질의응답</a>
                            <a href="#">자료실</a>
                        </div>
                    </div>
                    <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">모니터링</a>
                    <div class="has-dropdown">
                        <a href="autonomous-data.html" class="${['autonomous-data.html'].includes(currentPage) ? 'active' : ''}">자율 주행 데이터</a>
                        <div class="dropdown-menu">
                            <a href="autonomous-data.html">자율 주행 데이터</a>
                            <a href="#">자율 주행 데이터 신청</a>
                            <a href="#">분석 데이터 신청</a>
                        </div>
                    </div>
                    <a href="#">인프라 예약</a>
                    <a href="signup.html" class="${currentPage === 'signup.html' ? 'active' : ''}">회원가입</a>
                </div>
                <a href="signup.html" class="btn-primary">시스템 접속</a>
            </div>
        </nav>
        `;

        gnbRoot.innerHTML = gnbHTML;
    }
});

