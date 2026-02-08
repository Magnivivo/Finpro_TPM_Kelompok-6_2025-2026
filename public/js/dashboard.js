document.addEventListener('DOMContentLoaded', () => {
    
    // --- DROPDOWN LOGIN LOGIC ---
    const loginBtn = document.getElementById('loginBtn');
    const dropdown = document.querySelector('.dropdown');
    
    if (loginBtn && dropdown) {
        loginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // --- DASHBOARD LOGIC ---
    const userData = {
        teamName: 'AstraDev',
        leader: {
            name: 'Michael Wijaya',
            phone: '+62 858 9266 1187',
            email: 'm9ich@gmail.com',
            institut: 'Universitas Bina Nusantara'
        }
    };

    // Load Data
    document.getElementById('teamName').textContent = userData.teamName;
    document.getElementById('leaderName').textContent = userData.leader.name;
    document.getElementById('nama').textContent = userData.leader.name;
    document.getElementById('phone').textContent = userData.leader.phone;
    document.getElementById('email').textContent = userData.leader.email;
    document.getElementById('institut').textContent = userData.leader.institut;
    document.getElementById('timelineLeaderName').textContent = userData.leader.name;

    // --- JOIN BUTTON LOGIC (NEW) ---
    const joinBtn = document.querySelector('.join-btn');
    if(joinBtn) {
        joinBtn.addEventListener('click', () => {
            alert('🎉 Selamat! Tim kamu berhasil terdaftar dalam kompetisi!');
            joinBtn.textContent = 'Registered';
            joinBtn.style.background = '#10b981'; // Ubah jadi hijau
            joinBtn.style.cursor = 'default';
        });
    }
});

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(sectionId + '-section').classList.add('active');
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
}

// Modal Functions
function showLogoutModal() {
    document.getElementById('logoutModal').classList.add('active');
}

function closeLogoutModal() {
    document.getElementById('logoutModal').classList.remove('active');
}

function viewDocument(type) {
    const modal = document.getElementById('documentModal');
    const viewer = document.getElementById('documentViewer');
    
    if(type === 'cv') {
        viewer.innerHTML = '<h3>CV Preview</h3><p>Ini adalah preview CV (Dummy)</p>';
    } else {
        viewer.innerHTML = '<h3>ID Card Preview</h3><p>Ini adalah preview ID Card (Dummy)</p>';
    }
    
    modal.classList.add('active');
}

function closeDocumentModal() {
    document.getElementById('documentModal').classList.remove('active');
}