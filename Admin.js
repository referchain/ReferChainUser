// Admin credentials
const ADMIN_EMAIL = 'lofirsp@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// Check admin authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
        const email = prompt('Enter admin email:');
        const password = prompt('Enter admin password:');
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminAuthenticated', 'true');
        } else {
            alert('Invalid credentials');
            window.location.href = 'index.html';
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeDashboard();
});

function initializeDashboard() {
    // Mock data for demonstration
    updateStats({
        totalUsers: 150,
        totalEarnings: 25000,
        pendingWithdrawals: 12,
        activeReferrals: 45
    });

    populateRecentActivity();
}

function updateStats(data) {
    const statsElements = {
        totalUsers: document.querySelector('.stats-card:nth-child(1) .stats-number'),
        totalEarnings: document.querySelector('.stats-card:nth-child(2) .stats-number'),
        pendingWithdrawals: document.querySelector('.stats-card:nth-child(3) .stats-number'),
        activeReferrals: document.querySelector('.stats-card:nth-child(4) .stats-number')
    };

    statsElements.totalUsers.textContent = data.totalUsers;
    statsElements.totalEarnings.textContent = `$${data.totalEarnings.toLocaleString()}`;
    statsElements.pendingWithdrawals.textContent = data.pendingWithdrawals;
    statsElements.activeReferrals.textContent = data.activeReferrals;
}

function populateRecentActivity() {
    const mockActivity = [
        {
            user: 'John Doe',
            type: 'Withdrawal',
            amount: 500,
            status: 'pending',
            date: '2025-03-23'
        },
        {
            user: 'Jane Smith',
            type: 'Deposit',
            amount: 1000,
            status: 'completed',
            date: '2025-03-23'
        }
        // Add more mock data as needed
    ];

    const tableBody = document.getElementById('activity-table-body');
    tableBody.innerHTML = mockActivity.map(activity => `
        <tr>
            <td class="mdl-data-table__cell--non-numeric">${activity.user}</td>
            <td>${activity.type}</td>
            <td>$${activity.amount}</td>
            <td>
                <span class="status-badge ${activity.status === 'completed' ? 'success' : 'warning'}">
                    ${activity.status}
                </span>
            </td>
            <td>${activity.date}</td>
            <td>
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="handleAction('${activity.type.toLowerCase()}', '${activity.user}')">
                    <i class="material-icons">more_vert</i>
                </button>
            </td>
        </tr>
    `).join('');
}

function handleAction(type, user) {
    // Handle different actions based on type
    switch(type) {
        case 'withdrawal':
            if (confirm(`Approve withdrawal for ${user}?`)) {
                alert('Withdrawal approved');
            }
            break;
        case 'deposit':
            if (confirm(`Confirm deposit for ${user}?`)) {
                alert('Deposit confirmed');
            }
            break;
        default:
            alert('Action not implemented');
    }
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#activity-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});
