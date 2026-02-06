// Sample data - Replace with actual data from backend
const userData = {
    teamName: 'AstraDev',
    leader: {
        name: 'Michael Wijaya',
        phone: '+62 858 9266 1187',
        email: 'm9ich@gmail.com',
        institut: 'Universitas Bina Nusantara'
    },
    documents: {
        cv: 'path/to/cv.pdf',
        idcard: 'path/to/idcard.jpg'
    },
    timeline: [
        { event: 'Open Registration', date: 'DD-MM-YY', status: 'open', link: '' },
        { event: 'Close registration', date: 'DD-MM-YY', status: 'closed', link: '' },
        { event: 'Technical Meeting', date: 'DD-MM-YY', status: 'upcoming', link: '' },
        { event: 'Competition Day', date: 'DD-MM-YY', status: 'upcoming', link: 'https://meet.google.com/xxx' }
    ],
    contact: {
        name: 'Contact Person',
        image: 'https://via.placeholder.com/200',
        phone: '+62 812 3457 9268',
        email: 'rian001@gmail.com',
        hours: 'Senin - Minggu 02.00 - 21.00 WIB'
    }
};

// Initialize data on page load
window.addEventListener('DOMContentLoaded', function() {
    loadUserData();
});

// Load user data into the page
function loadUserData() {
    // Dashboard section
    document.getElementById('teamName').textContent = userData.teamName;
    document.getElementById('leaderName').textContent = userData.leader.name;
    document.getElementById('nama').textContent = userData.leader.name;
    document.getElementById('phone').textContent = userData.leader.phone;
    document.getElementById('email').textContent = userData.leader.email;
    document.getElementById('institut').textContent = userData.leader.institut;

    // Timeline section
    document.getElementById('timelineLeaderName').textContent = userData.leader.name;

    // Contact section
    document.getElementById('contactImage').src = userData.contact.image;
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    // Remove active class from all sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active'));

    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Add active class to clicked sidebar item
    event.target.closest('.sidebar-item').classList.add('active');
}

// Show logout modal
function showLogoutModal() {
    const modal = document.getElementById('logoutModal');
    modal.classList.add('active');
}

// Close logout modal
function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    modal.classList.remove('active');
}

// Confirm logout
function confirmLogout() {
    // Clear session/local storage if needed
    // localStorage.clear();
    // sessionStorage.clear();
    
    // Redirect to home page
    window.location.href = 'index.html'; // Change to your home page URL
}

// View document
function viewDocument(docType) {
    const modal = document.getElementById('documentModal');
    const viewer = document.getElementById('documentViewer');
    
    if (docType === 'cv') {
        viewer.innerHTML = `
            <h3 style="margin-bottom: 1rem;">Curriculum Vitae</h3>
            <p style="color: rgba(255,255,255,0.7); margin-bottom: 1rem;">Preview not available. Click below to download.</p>
            <button onclick="downloadDocument('cv')" class="doc-btn">Download CV</button>
        `;
    } else if (docType === 'idcard') {
        viewer.innerHTML = `
            <h3 style="margin-bottom: 1rem;">ID Card / Flazz Card</h3>
            <img src="https://via.placeholder.com/600x350/d946ef/ffffff?text=ID+Card+Preview" alt="ID Card" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;">
            <br><br>
            <button onclick="downloadDocument('idcard')" class="doc-btn">Download ID Card</button>
        `;
    }
    
    modal.classList.add('active');
}

// Close document modal
function closeDocumentModal() {
    const modal = document.getElementById('documentModal');
    modal.classList.remove('active');
}

// Download document
function downloadDocument(docType) {
    // This would normally trigger a download from your server
    alert(`Downloading ${docType}...`);
    // Example: window.location.href = userData.documents[docType];
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const logoutModal = document.getElementById('logoutModal');
    const documentModal = document.getElementById('documentModal');
    
    if (event.target === logoutModal) {
        closeLogoutModal();
    }
    if (event.target === documentModal) {
        closeDocumentModal();
    }
});

// Prevent default for sidebar navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
    });
});
