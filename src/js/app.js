document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search-input');
    const termFilter = document.getElementById('term-filter');
    const statsContainer = document.getElementById('stats-container');
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    let currentData = [...LFX_PROJECTS];

    function renderCards(projects) {
        grid.innerHTML = '';
        statsContainer.innerHTML = `Showing ${projects.length} projects`;

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <div class="org-name">${project.org} &bull; ${project.category}</div>
                <div class="tags">
                    ${project.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
            `;
            card.addEventListener('click', () => openModal(project));
            grid.appendChild(card);
        });
    }

    function filterProjects() {
        const query = searchInput.value.toLowerCase();
        const term = termFilter.value;

        currentData = LFX_PROJECTS.filter(p => {
            const matchesTerm = term === 'all' || p.term === term;
            const matchesSearch = p.title.toLowerCase().includes(query) || 
                                  p.org.toLowerCase().includes(query) || 
                                  p.skills.some(s => s.toLowerCase().includes(query));
            
            return matchesTerm && matchesSearch;
        });

        renderCards(currentData);
    }

    async function fetchGitHubStats(repo, containerNode) {
        try {
            // This hits our Vercel Edge Function
            const res = await fetch(`/api/github?repo=${repo}`);
            if (res.ok) {
                const data = await res.json();
                containerNode.innerHTML = `
                    <span>⭐ ${data.stars || 0}</span>
                    <span>🍴 ${data.forks || 0}</span>
                    <span>🐛 ${data.issues || 0} open issues</span>
                `;
            } else {
                containerNode.innerHTML = `<span>Stats unavailable</span>`;
            }
        } catch (e) {
            console.error("Failed to fetch GH stats", e);
            containerNode.innerHTML = `<span>Stats unavailable</span>`;
        }
    }

    function openModal(project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <div class="meta">
                <strong>Org:</strong> ${project.org} | 
                <strong>Term:</strong> ${project.term} | 
                <strong>Category:</strong> ${project.category}
            </div>
            <p>${project.description}</p>
            
            <div class="meta" style="margin-top: 15px;">
                <strong>Mentors:</strong> ${project.mentors.join(', ')} <br/>
                <strong>Skills:</strong> ${project.skills.join(', ')}
            </div>

            <div id="gh-stats-${project.id}" class="github-stats">Loading GitHub stats...</div>

            <div class="actions">
                <a href="${project.lfxUrl}" target="_blank" class="btn primary">View on LFX</a>
                <a href="${project.issueUrl}" target="_blank" class="btn">Upstream Issue</a>
                <a href="https://github.com/${project.repo}" target="_blank" class="btn">Repo</a>
            </div>
        `;
        modal.classList.remove('hidden');

        // Fetch stats asynchronously
        const statsNode = document.getElementById(`gh-stats-${project.id}`);
        fetchGitHubStats(project.repo, statsNode);
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    searchInput.addEventListener('input', filterProjects);
    termFilter.addEventListener('change', filterProjects);

    // Initial render
    filterProjects();
});
