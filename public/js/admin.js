document.addEventListener('DOMContentLoaded', () => {
    
    // --- DROPDOWN LOGIN LOGIC (ADDED) ---
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

    // Render Initial Teams
    renderTeams();
});

// Sample Data
let teamsData = [
    { id: 1, name: 'AstraDev', date: '2025-01-15' },
    { id: 2, name: 'Garuda Team', date: '2025-01-20' },
    { id: 3, name: 'CodeMaster', date: '2025-01-18' }
];

function renderTeams() {
    const tbody = document.getElementById('teamsTableBody');
    tbody.innerHTML = '';
    
    teamsData.forEach((team, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${team.name}</td>
                <td>${team.date}</td>
                <td>
                    <button class="btn-view" onclick="viewTeam(${team.id})">View</button>
                    <button class="btn-edit" onclick="editTeam(${team.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteTeam(${team.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function toggleSortDropdown() {
    document.getElementById('sortOptions').classList.toggle('active');
}

// Modal Functions (Placeholder)
function viewTeam(id) {
    const modal = document.getElementById('viewModal');
    document.getElementById('teamDetailsContent').innerHTML = `<p>Detail untuk Tim ID: ${id}</p>`;
    modal.classList.add('active');
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

function editTeam(id) {
    const modal = document.getElementById('editModal');
    document.getElementById('editFormContent').innerHTML = `<p>Form Edit untuk Tim ID: ${id}</p>`;
    modal.classList.add('active');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

let deleteId = null;
function deleteTeam(id) {
    deleteId = id;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
}

function confirmDelete() {
    if(deleteId) {
        teamsData = teamsData.filter(t => t.id !== deleteId);
        renderTeams();
        closeDeleteModal();
    }
}