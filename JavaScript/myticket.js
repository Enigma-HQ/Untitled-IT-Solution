var currentPage = 1;
var ticketsPerPage = 3;
var currentFilter = 'all';

const tickets = [
    {
        id: 'INC-12345',
        title: 'Cannot connect to VPN from home office',
        status: 'open',
        statusLabel: 'Open',
        badgeClass: 'badge-open',
        category: 'Network & Connectivity',
        lastUpdated: '2 hours ago',
        supportMessage: 'Support: Investigating server logs...'
    },
    {
        id: 'SRQ-54321',
        title: 'Printer not responding in the East Wing',
        status: 'resolved',
        statusLabel: 'Resolved',
        badgeClass: 'badge-resolved',
        category: 'Hardware Support',
        lastUpdated: 'Yesterday at 4:15 PM',
        supportMessage: 'Support: Issue resolved, please confirm.'
    },
    {
        id: 'INC-23347',
        title: 'Software installation request for Figma',
        status: 'progress',
        statusLabel: 'In Progress',
        badgeClass: 'badge-progress',
        category: 'Software',
        lastUpdated: '2 days ago',
        supportMessage: 'You: Attached the approval email.'
    },
    {
        id: 'SRQ-43243',
        title: 'Reset forgotten password for CRM',
        status: 'closed',
        statusLabel: 'Closed',
        badgeClass: 'badge-closed',
        category: 'Account Management',
        lastUpdated: '3 days ago',
        supportMessage: 'Support: Password has been reset. Please check your email.'
    },
    {
        id: 'INC-87654',
        title: 'Email client not syncing properly',
        status: 'open',
        statusLabel: 'Open',
        badgeClass: 'badge-open',
        category: 'Email Support',
        lastUpdated: '5 hours ago',
        supportMessage: 'Support: Checking server configuration...'
    },
    {
        id: 'SRQ-99123',
        title: 'Request access to project management tool',
        status: 'progress',
        statusLabel: 'In Progress',
        badgeClass: 'badge-progress',
        category: 'Access Management',
        lastUpdated: '1 day ago',
        supportMessage: 'Support: Awaiting manager approval.'
    },
    {
        id: 'INC-55667',
        title: 'Computer running very slow',
        status: 'waiting',
        statusLabel: 'Waiting for Support',
        badgeClass: 'badge-waiting',
        category: 'Hardware Support',
        lastUpdated: '3 hours ago',
        supportMessage: 'You: Provided system specifications.'
    },
    {
        id: 'SRQ-44332',
        title: 'New employee onboarding - IT equipment',
        status: 'resolved',
        statusLabel: 'Resolved',
        badgeClass: 'badge-resolved',
        category: 'Onboarding',
        lastUpdated: '1 week ago',
        supportMessage: 'Support: All equipment delivered.'
    },
    {
        id: 'INC-22109',
        title: 'Cannot access shared drive',
        status: 'open',
        statusLabel: 'Open',
        badgeClass: 'badge-open',
        category: 'Network & Connectivity',
        lastUpdated: '30 minutes ago',
        supportMessage: 'Support: Investigating permissions...'
    },
    {
        id: 'SRQ-77889',
        title: 'Software license renewal',
        status: 'closed',
        statusLabel: 'Closed',
        badgeClass: 'badge-closed',
        category: 'Software',
        lastUpdated: '2 weeks ago',
        supportMessage: 'Support: License renewed successfully.'
    }
];

function renderPagination(totalTickets) {
    var totalPages = Math.ceil(totalTickets / ticketsPerPage);
    var paginationContainer = document.getElementById('paginationContainer');
    var pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        paginationContainer.classList.add('d-none');
        return;
    }

    paginationContainer.classList.remove('d-none');
    var html = '';

    // Previous button
    html += '<li class="page-item ' + (currentPage === 1 ? 'disabled' : '') + '">';
    html += '<a class="page-link" href="#" data-page="' + (currentPage - 1) + '">&laquo;</a>';
    html += '</li>';

    // Page numbers
    var startPage = Math.max(1, currentPage - 1);
    var endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
        html += '<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>';
        if (startPage > 2) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }

    for (var i = startPage; i <= endPage; i++) {
        html += '<li class="page-item ' + (i === currentPage ? 'active' : '') + '">';
        html += '<a class="page-link" href="#" data-page="' + i + '">' + i + '</a>';
        html += '</li>';
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
        html += '<li class="page-item"><a class="page-link" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    }

    // Next button
    html += '<li class="page-item ' + (currentPage === totalPages ? 'disabled' : '') + '">';
    html += '<a class="page-link" href="#" data-page="' + (currentPage + 1) + '">&raquo;</a>';
    html += '</li>';

    pagination.innerHTML = html;

    // Add event listeners
    var pageLinks = pagination.querySelectorAll('.page-link');
    for (var i = 0; i < pageLinks.length; i++) {
        pageLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            if (this.parentElement.classList.contains('disabled')) return;
            var page = parseInt(this.getAttribute('data-page'));
            if (page > 0 && page <= totalPages) {
                currentPage = page;
                renderTickets(currentFilter);
            }
        });
    }
}

function renderTickets(filter) {
    if (!filter) filter = 'all';
    currentFilter = filter;
    
    var ticketsGrid = document.getElementById('ticketsGrid');
    var noTickets = document.getElementById('noTickets');
    
    var filteredTickets = tickets;
    if (filter !== 'all') {
        filteredTickets = tickets.filter(function(t) {
            return t.status === filter;
        });
    }

    if (filteredTickets.length === 0) {
        ticketsGrid.innerHTML = '';
        noTickets.classList.remove('d-none');
        document.getElementById('paginationContainer').classList.add('d-none');
        return;
    }

    noTickets.classList.add('d-none');
    
    // Calculate pagination
    var startIndex = (currentPage - 1) * ticketsPerPage;
    var endIndex = startIndex + ticketsPerPage;
    var paginatedTickets = filteredTickets.slice(startIndex, endIndex);
    
    var html = '';
    for (var i = 0; i < paginatedTickets.length; i++) {
        var ticket = paginatedTickets[i];
        html += '<div class="col-12 col-md-6 col-lg-4">' +
            '<div class="ticket-card p-4 h-100">' +
                '<div class="d-flex justify-content-between align-items-start mb-3">' +
                    '<div class="flex-grow-1 me-3">' +
                        '<h5 class="ticket-title mb-1">' + ticket.title + '</h5>' +
                        '<p class="ticket-id mb-0">' + ticket.id + '</p>' +
                    '</div>' +
                    '<span class="badge ' + ticket.badgeClass + '">' + ticket.statusLabel + '</span>' +
                '</div>' +
                '<div class="mb-3">' +
                    '<p class="ticket-info mb-2">Category: ' + ticket.category + '</p>' +
                    '<p class="ticket-info mb-0">Last Updated: ' + ticket.lastUpdated + '</p>' +
                '</div>' +
                '<div class="support-message mb-3">' +
                    '<p>' + ticket.supportMessage + '</p>' +
                '</div>' +
                '<div class="d-flex gap-2">' +
                    '<button class="btn btn-primary flex-fill">View Details</button>' +
                    '<button class="btn btn-secondary flex-fill">Add Comment</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }
    ticketsGrid.innerHTML = html;
    
    renderPagination(filteredTickets.length);
}

// Filter buttons functionality
document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');
        currentPage = 1; // Reset to first page when changing filter
        renderTickets(filter);
    });
});

renderTickets();