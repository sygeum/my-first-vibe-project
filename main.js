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
        const form = document.getElementById('signup-form');
        if (!form) return;

        // 1. Terms Agreement Logic
        const termsAll = document.getElementById('terms-all');
        const termsChecks = document.querySelectorAll('.terms-check');

        termsAll.addEventListener('change', () => {
            termsChecks.forEach(check => check.checked = termsAll.checked);
        });

        termsChecks.forEach(check => {
            check.addEventListener('change', () => {
                const allChecked = Array.from(termsChecks).every(c => c.checked);
                termsAll.checked = allChecked;
            });
        });

        // 2. User Type Selection
        const userTypeRadios = document.querySelectorAll('input[name="user_type"]');
        const enterpriseSection = document.getElementById('enterprise-section');

        userTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'enterprise') {
                    enterpriseSection.style.display = 'block';
                } else {
                    enterpriseSection.style.display = 'none';
                }
            });
        });

        // 3. Identity Verification (Mockup)
        const phoneInput = document.getElementById('phone');
        const btnRequestAuth = document.getElementById('btn-request-auth');
        const authCodeWrapper = document.getElementById('auth-code-wrapper');
        const authCodeInput = document.getElementById('auth-code');
        const btnVerifyAuth = document.getElementById('btn-verify-auth');
        const authTimer = document.getElementById('auth-timer');
        const authStatus = document.getElementById('auth-status');
        const authSuccessBadge = document.getElementById('auth-success-badge');

        let isPhoneVerified = false;
        let timerInterval;

        btnRequestAuth.addEventListener('click', () => {
            if (!phoneInput.value) {
                alert('휴대폰 번호를 입력해주세요.');
                return;
            }
            alert('인증번호가 발송되었습니다. (인증번호: 1234)');
            authCodeWrapper.style.display = 'block';
            startAuthTimer();
            btnRequestAuth.innerText = '재전송';
        });

        function startAuthTimer() {
            clearInterval(timerInterval);
            let timeLeft = 180;
            timerInterval = setInterval(() => {
                const min = Math.floor(timeLeft / 60);
                const sec = timeLeft % 60;
                authTimer.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    authStatus.innerText = '인증 시간이 만료되었습니다. 다시 시도해주세요.';
                    authStatus.className = 'status-msg error-text';
                }
                timeLeft--;
            }, 1000);
        }

        btnVerifyAuth.addEventListener('click', () => {
            if (authCodeInput.value === '1234') {
                clearInterval(timerInterval);
                isPhoneVerified = true;
                authCodeWrapper.style.display = 'none';
                authSuccessBadge.style.display = 'block';
                btnRequestAuth.disabled = true;
                phoneInput.disabled = true;
            } else {
                authStatus.innerText = '인증번호가 일치하지 않습니다.';
                authStatus.className = 'status-msg error-text';
            }
        });

        // 4. Business Verification (Mockup)
        const bizRegNumInput = document.getElementById('biz-reg-num');
        const btnVerifyBiz = document.getElementById('btn-verify-biz');
        const bizSuccessBadge = document.getElementById('biz-success-badge');
        let isBizVerified = false;

        btnVerifyBiz.addEventListener('click', () => {
            if (bizRegNumInput.value.length === 10) {
                isBizVerified = true;
                bizSuccessBadge.style.display = 'block';
                btnVerifyBiz.disabled = true;
                bizRegNumInput.disabled = true;
            } else {
                alert('올바른 사업자 등록번호 10자리를 입력해주세요.');
            }
        });

        // 5. Validation Logic
        const pwInput = document.getElementById('password');
        const confirmPwInput = document.getElementById('confirm-password');
        const matchError = document.getElementById('pw-match-error');
        const strengthMeter = document.getElementById('pw-strength-meter');
        const strengthBar = document.getElementById('pw-strength-bar');
        const strengthText = document.getElementById('pw-strength-text');

        pwInput.addEventListener('input', () => {
            const val = pwInput.value;
            if (val.length > 0) {
                strengthMeter.style.display = 'flex';
                let strength = 0;
                if (val.length >= 10) strength++;
                if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
                if (/[^A-Za-z0-9]/.test(val)) strength++;

                strengthBar.className = 'strength-bar';
                if (strength <= 1) {
                    strengthBar.classList.add('weak');
                    strengthText.innerText = '약함';
                } else if (strength === 2) {
                    strengthBar.classList.add('medium');
                    strengthText.innerText = '보통';
                } else {
                    strengthBar.classList.add('strong');
                    strengthText.innerText = '강함';
                }
            } else {
                strengthMeter.style.display = 'none';
            }
            checkPasswordMatch();
        });

        confirmPwInput.addEventListener('input', checkPasswordMatch);

        function checkPasswordMatch() {
            if (confirmPwInput.value && pwInput.value !== confirmPwInput.value) {
                matchError.style.display = 'block';
            } else {
                matchError.style.display = 'none';
            }
        }

        // 6. Final Submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check Required Terms
            const requiredTerms = document.querySelectorAll('.terms-check.required');
            const termsValid = Array.from(requiredTerms).every(t => t.checked);
            if (!termsValid) {
                alert('필수 약관에 동의하셔야 합니다.');
                return;
            }

            // Check Phone Verification
            if (!isPhoneVerified) {
                alert('본인 인증을 완료해주세요.');
                return;
            }

            // Check Business Verification if Enterprise
            const selectedType = form.querySelector('input[name="user_type"]:checked').value;
            if (selectedType === 'enterprise') {
                if (!document.getElementById('company-name').value) {
                    alert('회사명을 입력해주세요.');
                    return;
                }
                if (!isBizVerified) {
                    alert('사업자 인증을 완료해주세요.');
                    return;
                }
            }

            // Basic Validation
            if (pwInput.value.length < 10) {
                alert('비밀번호는 10자 이상이어야 합니다.');
                return;
            }
            if (pwInput.value !== confirmPwInput.value) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            // Success!
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerText = '처리 중...';
            
            setTimeout(() => {
                document.getElementById('success-overlay').classList.add('active');
            }, 1000);
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
                            <a href="about-purpose.html">설립 배경 및 목적</a>
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
                        <a href="autonomous-data.html" class="${['autonomous-data.html', 'autonomous-data-apply.html', 'autonomous-data-apply-form.html', 'analysis-data-apply.html', 'analysis-data-apply-form.html'].includes(currentPage) ? 'active' : ''}">자율주행 데이터</a>
                        <div class="dropdown-menu">
                            <a href="autonomous-data-apply.html">자율주행 데이터 신청</a>
                            <a href="analysis-data-apply.html">분석 데이터 신청</a>
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

