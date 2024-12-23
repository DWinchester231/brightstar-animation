// Function to update the portfolio section with current projects
function updatePortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    // Clear existing portfolio items
    portfolioGrid.innerHTML = '';

    // Get projects from projectsData
    const projects = Object.values(projectsData || {});

    // Filter completed projects or those marked for showcase
    const showcaseProjects = projects.filter(project => 
        project.status === 'Completed' || project.showcase === true
    );

    // Add projects to portfolio
    showcaseProjects.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item reveal-on-load';
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image lazy-placeholder">
                <img data-src="${project.thumbnail || 'images/placeholder.jpg'}" alt="${project.name}">
            </div>
            <h3>${project.name}</h3>
            <p class="portfolio-type">${project.type}</p>
        `;

        portfolioGrid.appendChild(portfolioItem);
    });

    // If no projects, add a message
    if (showcaseProjects.length === 0) {
        portfolioGrid.innerHTML = '<p class="no-projects">New projects coming soon!</p>';
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updatePortfolio();
});

// Listen for changes in projectsData
window.addEventListener('projectsUpdated', function() {
    updatePortfolio();
});
