// Project data store
const projectsData = {
    'project1': {
        id: 'project1',
        name: "A Fox's Tale Through Tales",
        type: 'Animated Series',
        status: 'In Progress',
        email: 'client1@example.com',
        startDate: '2024-01-15',
        showcase: true,
        thumbnail: 'images/portfolio/foxs-tale.jpg'
    },
    'project2': {
        id: 'project2',
        name: 'Wally The Wolf',
        type: 'Short Film',
        status: 'Completed',
        email: 'client2@example.com',
        startDate: '2024-02-01',
        showcase: true,
        thumbnail: 'images/portfolio/wally-wolf.jpg'
    },
    'project3': {
        id: 'project3',
        name: 'The Jazzy Doggies',
        type: 'Music Video',
        status: 'In Progress',
        email: 'client3@example.com',
        startDate: '2024-02-15',
        showcase: true,
        thumbnail: 'images/portfolio/jazzy-doggies.jpg'
    }
};

// Function to update project data
function updateProject(projectId, data) {
    if (projectsData[projectId]) {
        projectsData[projectId] = { ...projectsData[projectId], ...data };
        // Dispatch event to notify of changes
        window.dispatchEvent(new Event('projectsUpdated'));
    }
}

// Function to add new project
function addProject(project) {
    const projectId = 'project' + (Object.keys(projectsData).length + 1);
    projectsData[projectId] = {
        id: projectId,
        ...project
    };
    // Dispatch event to notify of changes
    window.dispatchEvent(new Event('projectsUpdated'));
    return projectId;
}

// Function to delete project
function deleteProject(projectId) {
    if (projectsData[projectId]) {
        delete projectsData[projectId];
        // Dispatch event to notify of changes
        window.dispatchEvent(new Event('projectsUpdated'));
        return true;
    }
    return false;
}
