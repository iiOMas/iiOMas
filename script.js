// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Ensure page starts at top on load
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Smooth scrolling for navigation links and CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    window.scrollTo(0, 0);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Special handling for portfolio section to center the cards
                if (targetId === '#portfolio') {
                    const portfolioGrid = document.querySelector('.portfolio-grid');
                    const viewportHeight = window.innerHeight;
                    const gridTop = portfolioGrid.getBoundingClientRect().top + window.pageYOffset;
                    const offset = (viewportHeight - 600) / 2; // 600px is approximate height for portfolio cards
                    
                    window.scrollTo({
                        top: gridTop - offset,
                        behavior: 'smooth'
                    });
                } else {
                    // Normal scrolling for other sections
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("wQnYM9lyu4498sfo7");
})();

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const fileInput = document.getElementById('file');
    const fileInfo = document.querySelector('.file-info');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (fileInput && fileInfo) {
        // Update file info when a file is selected
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileSize = (this.files[0].size / (1024 * 1024)).toFixed(2);
                const fileName = this.files[0].name;
                
                // Check if file is too large (over 10MB)
                if (fileSize > 10) {
                    fileInfo.textContent = `${fileName} is too large (${fileSize}MB). Max size is 10MB.`;
                    fileInfo.style.color = '#ff4d4d';
                    this.value = ''; // Clear the file input
                } else {
                    fileInfo.textContent = `Selected: ${fileName} (${fileSize}MB)`;
                    fileInfo.style.color = '#76ff7a';
                }
            } else {
                fileInfo.textContent = 'Max file size: 10MB';
                fileInfo.style.color = 'var(--text-muted)';
            }
        });
    }
    
    if (contactForm) {
        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Change button state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Get form data
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                whatsapp: document.getElementById('whatsapp').value || 'Not provided',
                message: document.getElementById('message').value
            };

            // Send both emails using EmailJS
            Promise.all([
                // Send email to you
                emailjs.send('service_9dah6z9', 'template_z5jyrm9', templateParams),
                // Send confirmation to the sender
                emailjs.send('service_9dah6z9', 'template_8fq05ps', templateParams)
            ])
            .then(function(responses) {
                // Show success message
                successMessage.style.display = 'block';
                successMessage.classList.add('show');
                errorMessage.style.display = 'none';
                errorMessage.classList.remove('show');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 300);
                }, 3000);
            }.bind(this))
            .catch(function(error) {
                // Show error message
                errorMessage.style.display = 'block';
                errorMessage.classList.add('show');
                successMessage.style.display = 'none';
                successMessage.classList.remove('show');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                console.error('Failed to send email:', error);
            });
        });
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Portfolio Video Preview (if using video thumbnails)
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        // Replace this with your video preview logic
        // For example, opening a modal with the video
        console.log('Video preview clicked');
    });
});

// Video Player Controls
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.video-thumbnail');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const controls = container.querySelector('.video-controls');
        const playPauseBtn = container.querySelector('.play-pause');
        const volumeBtn = container.querySelector('.volume');
        const volumeSlider = container.querySelector('.volume-slider');
        const volumeProgress = container.querySelector('.volume-progress');
        const progressBar = container.querySelector('.progress-bar');
        const progress = container.querySelector('.progress');
        const timeDisplay = container.querySelector('.time');
        const currentTime = container.querySelector('.current');
        const duration = container.querySelector('.duration');
        const fullscreenBtn = container.querySelector('.fullscreen');
        
        // Add click handler to video element
        video.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default video click behavior
            togglePlayPause();
        });

        // Add click handler to play/pause button
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering video click
            togglePlayPause();
        });

        // Function to toggle play/pause
        function togglePlayPause() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }

        // Update play/pause button when video state changes
        video.addEventListener('play', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });

        video.addEventListener('pause', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        // Set initial volume
        video.volume = 0.05;
        volumeProgress.style.transform = `scaleX(0.05)`;

        // Format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        // Update time display
        function updateTimeDisplay() {
            currentTime.textContent = formatTime(video.currentTime);
            duration.textContent = formatTime(video.duration);
        }

        // Update progress bar
        function updateProgress() {
            const value = (video.currentTime / video.duration) * 100;
            progress.style.width = value + '%';
            updateTimeDisplay();
        }

        // Handle video metadata loaded
        video.addEventListener('loadedmetadata', () => {
            updateTimeDisplay();
        });

        // Volume control
        volumeBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                volumeProgress.style.transform = `scaleX(${video.volume})`;
            } else {
                video.muted = true;
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                volumeProgress.style.transform = 'scaleX(0)';
            }
        });

        // Volume slider
        let isVolumeDragging = false;
        volumeSlider.addEventListener('mousedown', (e) => {
            isVolumeDragging = true;
            updateVolume(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (isVolumeDragging) {
                updateVolume(e);
            }
        });

        document.addEventListener('mouseup', () => {
            isVolumeDragging = false;
        });

        function updateVolume(e) {
            const rect = volumeSlider.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const volume = x / rect.width;
            video.volume = volume;
            video.muted = false;
            volumeProgress.style.transform = `scaleX(${volume})`;
            volumeBtn.innerHTML = volume === 0 ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }

        // Progress bar control
        let isProgressDragging = false;
        progressBar.addEventListener('mousedown', (e) => {
            isProgressDragging = true;
            updateVideoProgress(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (isProgressDragging) {
                updateVideoProgress(e);
            }
        });

        document.addEventListener('mouseup', () => {
            isProgressDragging = false;
        });

        function updateVideoProgress(e) {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        }

        // Fullscreen
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });

        // Update progress as video plays
        video.addEventListener('timeupdate', updateProgress);

        // Show controls on hover
        container.addEventListener('mouseenter', () => {
            controls.style.opacity = '1';
        });

        container.addEventListener('mouseleave', () => {
            if (!video.paused) {
                controls.style.opacity = '0';
            }
        });
    });
});