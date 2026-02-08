// Sample teams data - Replace with actual data from backend
let teamsData = [
    {
        id: 1,
        teamName: 'AstraDev',
        registrationDate: '2025-01-15',
        leader: {
            name: 'Michael Wijaya',
            phone: '+62 858 9266 1187',
            email: 'm9ich@gmail.com',
            institut: 'Universitas Bina Nusantara',
            nim: '2501234567'
        },
        members: [
            {
                name: 'Jane Doe',
                phone: '+62 812 3456 7890',
                email: 'jane@gmail.com',
                institut: 'Universitas Bina Nusantara',
                nim: '2501234568'
            },
            {
                name: 'John Smith',
                phone: '+62 813 4567 8901',
                email: 'john@gmail.com',
                institut: 'Universitas Bina Nusantara',
                nim: '2501234569'
            }
        ]
    },
    {
        id: 2,
        teamName: 'CodeMasters',
        registrationDate: '2025-01-20',
        leader: {
            name: 'Sarah Johnson',
            phone: '+62 821 1234 5678',
            email: 'sarah@gmail.com',
            institut: 'Institut Teknologi Bandung',
            nim: '1301234567'
        },
        members: [
            {
                name: 'David Lee',
                phone: '+62 822 2345 6789',
                email: 'david@gmail.com',
                institut: 'Institut Teknologi Bandung',
                nim: '1301234568'
            }
        ]
    },
    {
        id: 3,
        teamName: 'TechInnovators',
        registrationDate: '2025-01-18',
        leader: {
            name: 'Ahmad Rizki',
            phone: '+62 856 7890 1234',
            email: 'ahmad@gmail.com',
            institut: 'Universitas Indonesia',
            nim: '1906234567'
        },
        members: [
            {
                name: 'Siti Nurhaliza',
                phone: '+62 857 8901 2345',
                email: 'siti@gmail.com',
                institut: 'Universitas Indonesia',
                nim: '1906234568'
            },
            {
                name: 'Budi Santoso',
                phone: '+62 858 9012 3456',
                email: 'budi@gmail.com',
                institut: 'Universitas Indonesia',
                nim: '1906234569'
            }
        ]
    }
];

let currentTeams = [...teamsData];
let selectedTeamId = null;

// Initialize page on load
window.addEventListener('DOMContentLoaded', function() {
    renderTeams();
});

// Render teams list
function renderTeams() {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = '';

    currentTeams.forEach(team => {
        const teamItem = document.createElement('div');
        teamItem.className = 'participant-item';
        teamItem.onclick = () => selectTeam(team.id);
        
        const date = new Date(team.registrationDate);
        const formattedDate = date.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        teamItem.innerHTML = `
            <div class="participant-info">
                <div class="participant-checkbox ${selectedTeamId === team.id ? 'checked' : ''}" id="checkbox-${team.id}"></div>
                <div>
                    <div class="team-name">${team.teamName}</div>
                    <div class="registration-date">Registered: ${formattedDate}</div>
                </div>
            </div>
        `;

        if (selectedTeamId === team.id) {
            teamItem.classList.add('selected');
        }

        participantsList.appendChild(teamItem);
    });

    // Show/hide action buttons
    const actionButtons = document.getElementById('actionButtons');
    if (selectedTeamId) {
        actionButtons.style.display = 'flex';
    } else {
        actionButtons.style.display = 'none';
    }
}

// Select team
function selectTeam(teamId) {
    if (selectedTeamId === teamId) {
        selectedTeamId = null;
    } else {
        selectedTeamId = teamId;
    }
    renderTeams();
}

// Search teams
function searchTeams() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    currentTeams = teamsData.filter(team => 
        team.teamName.toLowerCase().includes(searchInput)
    );
    
    selectedTeamId = null;
    renderTeams();
}

// Toggle sort dropdown
function toggleSortDropdown() {
    const sortOptions = document.getElementById('sortOptions');
    sortOptions.classList.toggle('active');
}

// Sort teams
function sortTeams(sortType) {
    const currentSortLabel = document.getElementById('currentSort');
    
    switch(sortType) {
        case 'name-az':
            currentTeams.sort((a, b) => a.teamName.localeCompare(b.teamName));
            currentSortLabel.textContent = 'Name A-Z';
            break;
        case 'name-za':
            currentTeams.sort((a, b) => b.teamName.localeCompare(a.teamName));
            currentSortLabel.textContent = 'Name Z-A';
            break;
        case 'newest':
            currentTeams.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
            currentSortLabel.textContent = 'Newest to Oldest';
            break;
        case 'oldest':
            currentTeams.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
            currentSortLabel.textContent = 'Oldest to Newest';
            break;
    }
    
    toggleSortDropdown();
    renderTeams();
}

// View team details
function viewTeamDetails() {
    if (!selectedTeamId) return;
    
    const team = teamsData.find(t => t.id === selectedTeamId);
    if (!team) return;

    const modal = document.getElementById('viewModal');
    const content = document.getElementById('teamDetailsContent');
    
    let membersHtml = '';
    team.members.forEach((member, index) => {
        membersHtml += `
            <div class="detail-section">
                <h3>Member ${index + 1}</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Name</div>
                        <div class="detail-value">${member.name}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">NIM</div>
                        <div class="detail-value">${member.nim}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Phone</div>
                        <div class="detail-value">${member.phone}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${member.email}</div>
                    </div>
                    <div class="detail-item" style="grid-column: 1 / -1;">
                        <div class="detail-label">Institut</div>
                        <div class="detail-value">${member.institut}</div>
                    </div>
                </div>
            </div>
        `;
    });

    content.innerHTML = `
        <div class="detail-section">
            <h3>Team Name</h3>
            <div class="detail-value" style="font-size: 1.3rem; margin-bottom: 1rem;">${team.teamName}</div>
        </div>

        <div class="detail-section">
            <h3>Team Leader</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Name</div>
                    <div class="detail-value">${team.leader.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">NIM</div>
                    <div class="detail-value">${team.leader.nim}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${team.leader.phone}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${team.leader.email}</div>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <div class="detail-label">Institut</div>
                    <div class="detail-value">${team.leader.institut}</div>
                </div>
            </div>
        </div>

        ${membersHtml}
    `;
    
    modal.classList.add('active');
}

// Close view modal
function closeViewModal() {
    const modal = document.getElementById('viewModal');
    modal.classList.remove('active');
}

// Edit team
function editTeam() {
    if (!selectedTeamId) return;
    
    const team = teamsData.find(t => t.id === selectedTeamId);
    if (!team) return;

    const modal = document.getElementById('editModal');
    const content = document.getElementById('editFormContent');
    
    let membersFormHtml = '';
    team.members.forEach((member, index) => {
        membersFormHtml += `
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #fff;">Member ${index + 1}</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="member${index}_name" value="${member.name}">
            </div>
            <div class="form-group">
                <label>NIM</label>
                <input type="text" id="member${index}_nim" value="${member.nim}">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" id="member${index}_phone" value="${member.phone}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="member${index}_email" value="${member.email}">
            </div>
            <div class="form-group">
                <label>Institut</label>
                <input type="text" id="member${index}_institut" value="${member.institut}">
            </div>
        `;
    });

    content.innerHTML = `
        <div class="form-group">
            <label>Team Name</label>
            <input type="text" id="edit_teamName" value="${team.teamName}">
        </div>

        <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #fff;">Team Leader</h3>
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="edit_leaderName" value="${team.leader.name}">
        </div>
        <div class="form-group">
            <label>NIM</label>
            <input type="text" id="edit_leaderNim" value="${team.leader.nim}">
        </div>
        <div class="form-group">
            <label>Phone</label>
            <input type="text" id="edit_leaderPhone" value="${team.leader.phone}">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="edit_leaderEmail" value="${team.leader.email}">
        </div>
        <div class="form-group">
            <label>Institut</label>
            <input type="text" id="edit_leaderInstitut" value="${team.leader.institut}">
        </div>

        ${membersFormHtml}
    `;
    
    modal.classList.add('active');
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('active');
}

// Save team changes
function saveTeamChanges() {
    if (!selectedTeamId) return;
    
    const teamIndex = teamsData.findIndex(t => t.id === selectedTeamId);
    if (teamIndex === -1) return;

    // Get updated values
    const team = teamsData[teamIndex];
    team.teamName = document.getElementById('edit_teamName').value;
    team.leader.name = document.getElementById('edit_leaderName').value;
    team.leader.nim = document.getElementById('edit_leaderNim').value;
    team.leader.phone = document.getElementById('edit_leaderPhone').value;
    team.leader.email = document.getElementById('edit_leaderEmail').value;
    team.leader.institut = document.getElementById('edit_leaderInstitut').value;

    // Update members
    team.members.forEach((member, index) => {
        member.name = document.getElementById(`member${index}_name`).value;
        member.nim = document.getElementById(`member${index}_nim`).value;
        member.phone = document.getElementById(`member${index}_phone`).value;
        member.email = document.getElementById(`member${index}_email`).value;
        member.institut = document.getElementById(`member${index}_institut`).value;
    });

    // Update currentTeams
    currentTeams = [...teamsData];
    
    closeEditModal();
    renderTeams();
    
    alert('Team updated successfully!');
}

// Delete team
function deleteTeam() {
    if (!selectedTeamId) return;
    
    const modal = document.getElementById('deleteModal');
    modal.classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('active');
}

// Confirm delete
function confirmDelete() {
    if (!selectedTeamId) return;
    
    teamsData = teamsData.filter(t => t.id !== selectedTeamId);
    currentTeams = [...teamsData];
    selectedTeamId = null;
    
    closeDeleteModal();
    renderTeams();
    
    alert('Team deleted successfully!');
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const viewModal = document.getElementById('viewModal');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const sortOptions = document.getElementById('sortOptions');
    
    if (event.target === viewModal) {
        closeViewModal();
    }
    if (event.target === editModal) {
        closeEditModal();
    }
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    
    // Close sort dropdown when clicking outside
    if (!event.target.closest('.sort-dropdown')) {
        sortOptions.classList.remove('active');
    }
});
