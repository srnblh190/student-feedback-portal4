// ===================================
// NAVIGATION TOGGLE FOR MOBILE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===================================
// IMAGE CAROUSEL FUNCTIONALITY
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('indicators');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Create indicators
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        
        function showSlide(n) {
            // Wrap around
            if (n >= totalSlides) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = n;
            }
            
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        function goToSlide(n) {
            showSlide(n);
        }
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Auto-advance carousel every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }
});

// ===================================
// FORM VALIDATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const surveyForm = document.getElementById('form');
    const successMessage = document.getElementById('successMessage');
    
    if (submitBtn && surveyForm) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get all required fields
            const requiredInputs = surveyForm.querySelectorAll('[required]');
            let allValid = true;
            let firstInvalidField = null;
            
            // Validate each required field
            requiredInputs.forEach(input => {
                if (input.type === 'radio') {
                    // Check if at least one radio button in the group is checked
                    const radioGroup = surveyForm.querySelectorAll(`input[name="${input.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    
                    if (!isChecked) {
                        allValid = false;
                        if (!firstInvalidField) {
                            firstInvalidField = input;
                        }
                        // Highlight the radio group
                        radioGroup.forEach(radio => {
                            radio.parentElement.style.backgroundColor = '#ffe5e5';
                            setTimeout(() => {
                                radio.parentElement.style.backgroundColor = '';
                            }, 2000);
                        });
                    }
                } else if (input.type === 'checkbox') {
                    // For checkboxes, we might not want to require any specific one
                    // This section can be customized based on requirements
                } else {
                    // For text, email, select, etc.
                    if (!input.value.trim()) {
                        allValid = false;
                        if (!firstInvalidField) {
                            firstInvalidField = input;
                        }
                        input.style.borderColor = '#dc3545';
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                    }
                }
            });
            
            // Email validation
            const emailInput = document.getElementById('studentEmail');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    allValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = emailInput;
                    }
                    emailInput.style.borderColor = '#dc3545';
                    alert('Please enter a valid email address.');
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                    }, 2000);
                }
            }
            
            // Student ID validation (basic format check)
            const studentIdInput = document.getElementById('studentId');
            if (studentIdInput && studentIdInput.value) {
                const idPattern = /^BSB-\d{5}$/;
                if (!idPattern.test(studentIdInput.value)) {
                    allValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = studentIdInput;
                    }
                    studentIdInput.style.borderColor = '#dc3545';
                    alert('Student ID must be in format: BSB-XXXXX (e.g., BSB-12345)');
                    setTimeout(() => {
                        studentIdInput.style.borderColor = '';
                    }, 2000);
                }
            }
            
            if (allValid) {
                // Form is valid, show success message
                surveyForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to top of form
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // In a real application, you would send the data to a server here
                console.log('Form submitted successfully!');
                
                // Collect form data (for demonstration)
                const formData = new FormData();
                requiredInputs.forEach(input => {
                    if (input.type === 'radio' || input.type === 'checkbox') {
                        if (input.checked) {
                            formData.append(input.name, input.value);
                        }
                    } else {
                        formData.append(input.name, input.value);
                    }
                });
                
                console.log('Form data collected:', Object.fromEntries(formData));
            } else {
                // Scroll to first invalid field
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Clear form button functionality
    const clearButtons = document.querySelectorAll('.btn-secondary');
    clearButtons.forEach(button => {
        if (button.textContent.includes('Clear Form')) {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear the form? All entered data will be lost.')) {
                    surveyForm.reset();
                }
            });
        }
    });
    
    // Real-time validation for email
    const emailInput = document.getElementById('studentEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Real-time validation for Student ID
    const studentIdInput = document.getElementById('studentId');
    if (studentIdInput) {
        studentIdInput.addEventListener('blur', function() {
            const idPattern = /^BSB-\d{5}$/;
            if (this.value && !idPattern.test(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
        
        // Format helper
        studentIdInput.addEventListener('input', function() {
            let value = this.value.toUpperCase();
            // Auto-format: add BSB- prefix if user starts typing numbers
            if (value.length > 0 && !value.startsWith('BSB-') && /^\d/.test(value)) {
                value = 'BSB-' + value;
                this.value = value;
            }
        });
    }
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateCounter = (element) => {
            const target = element.textContent;
            const isPercentage = target.includes('%');
            const isRating = target.includes('/');
            
            let endValue;
            if (isPercentage) {
                endValue = parseInt(target);
            } else if (isRating) {
                endValue = parseFloat(target);
            } else {
                endValue = parseInt(target.replace(/[^0-9]/g, ''));
            }
            
            let startValue = 0;
            const duration = 2000; // 2 seconds
            const increment = endValue / (duration / 16); // 60 FPS
            
            const updateCounter = () => {
                startValue += increment;
                
                if (startValue < endValue) {
                    if (isPercentage) {
                        element.textContent = Math.floor(startValue) + '%';
                    } else if (isRating) {
                        element.textContent = startValue.toFixed(1) + '/5';
                    } else {
                        if (target.includes('+')) {
                            element.textContent = Math.floor(startValue).toLocaleString() + '+';
                        } else {
                            element.textContent = Math.floor(startValue).toLocaleString();
                        }
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer to trigger animation when stats are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
});

// ===================================
// GALLERY IMAGE LIGHTBOX EFFECT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                // Close lightbox on click
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                // Close lightbox on escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        if (document.body.contains(lightbox)) {
                            document.body.removeChild(lightbox);
                        }
                    }
                });
            }
        });
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color, #8B1538);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show button when scrolled down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c BSB Student Feedback Portal ', 'background: #8B1538; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Developed for BAA3114 Web Design and Development ', 'background: #C5A572; color: #fff; font-size: 14px; padding: 5px;');
console.log('Thank you for visiting our feedback portal!');