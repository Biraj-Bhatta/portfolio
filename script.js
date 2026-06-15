const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
    link.addEventListener('click', function() {

        links.forEach(l => l.classList.remove('active'));

        this.classList.add('active');
    });
});


//for overlay in projects section for mobile device only 
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  const isMobile = () =>
    window.matchMedia("(max-width: 768px)").matches;

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (!isMobile()) return;

      // toggle current card
      const isActive = card.classList.contains("active");

      // close all cards
      cards.forEach(c => c.classList.remove("active"));

      // reopen clicked one if it wasn't already active
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });

  // optional: close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".project-card")) {
      cards.forEach(c => c.classList.remove("active"));
    }
  });
});




function scrollTopReload() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {
    location.reload();
  }, 500);
}






const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {

        const formData = new FormData(contactForm);

        const response = await fetch(
            'https://api.web3forms.com/submit',
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showNotification(data.message || 'Failed to send message.', 'error');
            console.error(data);
        }

        // Optional: Clear notification after 5 seconds
        setTimeout(() => {
            removeNotification();
        }, 5000);
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Form validation
function validateForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    removeNotification();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.875rem',
        zIndex: '10000',
        animation: 'slide-in-right 0.3s ease-out',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
}

function removeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.animation = 'slide-out-right 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }
}










