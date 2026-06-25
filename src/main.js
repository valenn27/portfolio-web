import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  
  // Form handling
  const contactForm = document.querySelector("#contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const name = document.querySelector("#name").value
      const email = document.querySelector("#email").value
      const subject = document.querySelector("#subject").value
      const message = document.querySelector("#message").value

      console.log("Formulario enviado:", { name, email, subject, message })

      // Show success message
      contactForm.innerHTML = `
        <div class="text-center py-12">
          <div class="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
            <i class="fa-solid fa-check text-secondary text-4xl"></i>
          </div>
          <h3 class="text-2xl font-bricolage font-bold mb-2">¡Mensaje enviado!</h3>
          <p class="text-gray-400">Gracias ${name}, te responderé pronto.</p>
        </div>
      `
    })
  }

  // Typing animation for hero text
  const subtitleElement = document.querySelector("#hero h2 span")
  if (subtitleElement && !subtitleElement.classList.contains("typing-delay")) {
    subtitleElement.classList.add("typing-delay")
  }

  // Intersection Observer for animations (fallback for browsers without view-timeline)
  if (!CSS.supports("animation-timeline: view()")) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("#about, #skills, #projects, #contact")
    sections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(30px)"
      observer.observe(section)
    })
  }

  // Mobile menu toggle (only works on mobile < 640px)
  const menuButton = document.querySelector('#menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');
  
  if (menuButton && mobileMenu) {
    const menuItems = mobileMenu.querySelectorAll('li');
    const windowWidth = window.innerWidth;

    menuButton.addEventListener('click', function () {
        // Only toggle on mobile
        if (window.innerWidth < 640) {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 150 + (index * 100));
                });
            } else {
                mobileMenu.style.maxHeight = '0';
                
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 500);
                
                menuItems.forEach((item) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                });
            }
        }
    });

    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function (event) {
        if (window.innerWidth < 640 && !mobileMenu.contains(event.target) && !menuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.style.maxHeight = '0';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);
            
            menuItems.forEach((item) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
            });
        }
    });

    // Reset styles when going to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 640) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = '';
            menuItems.forEach((item) => {
                item.style.opacity = '';
                item.style.transform = '';
            });
        }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (mobileMenu && window.innerWidth < 640) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.add('max-sm:max-h-0');
        }
      }
    });
  });

  // Add parallax effect to floating background elements
  const floatingElements = document.querySelectorAll('.animate-float');
  if (floatingElements.length > 0) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.05;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Add active state to nav links based on scroll position
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.remove('text-gray-300');
          link.classList.add('text-white');
        }
      });
    });
  }

  // Add reveal animation on scroll for project cards
  const projectCards = document.querySelectorAll('#projects article');
  if (projectCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      cardObserver.observe(card);
    });
  }

  // Skill hover effect - show tooltips
  const skillCards = document.querySelectorAll('#skills .group.cursor-pointer');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.filter = 'drop-shadow(0 0 10px rgba(202, 56, 59, 0.5))';
      }
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.filter = '';
      }
    });
  });
})