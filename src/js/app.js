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
        statsContainer.innerHTML = `Showing ${projects.length} organizations`;

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Limit skills shown on card to 3 to keep it clean
            const displaySkills = project.skills.slice(0, 3);
            const extraSkills = project.skills.length > 3 ? project.skills.length - 3 : 0;

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <h3 style="margin: 0; font-size: 1.4rem;">${project.org}</h3>
                    <span style="font-size: 0.65rem; font-weight: 800; color: #b45309; background: #fffbeb; padding: 4px 8px; border-radius: 12px; border: 1px solid #fde68a; letter-spacing: 0.05em;">${project.category.toUpperCase()}</span>
                </div>
                
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.8em;">
                    ${project.title}
                </p>
                
                <div class="tags" style="margin-bottom: 20px; padding-top: 0; min-height: 28px;">
                    ${displaySkills.map(skill => `<span class="tag" style="background: #f3f4f6; color: #374151; border: none;">${skill}</span>`).join('')}
                    ${extraSkills > 0 ? `<span class="tag" style="background: transparent; border: 1px solid #d1d5db; color: #6b7280;">+${extraSkills}</span>` : ''}
                </div>
                
                <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 16px;">
                    <span style="font-size: 0.75rem; font-weight: 600; color: #9ca3af; display: flex; align-items: center; gap: 4px;">✨ LFX MENTORSHIP</span>
                    <span style="font-size: 0.85rem; font-weight: 800; color: var(--accent-dark); letter-spacing: 0.05em;">VIEW ➔</span>
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

    // Expose this globally so the inline onclick in the modal can access it
    window.fetchGitHubStats = async function(repo, containerNode) {
        containerNode.innerHTML = `<span>Fetching...</span>`;
        try {
            const res = await fetch(`/api/github?repo=${repo}`);
            if (res.ok) {
                const data = await res.json();
                containerNode.innerHTML = `
                    <span>⭐ ${data.stars || 0}</span>
                    <span>🍴 ${data.forks || 0}</span>
                    <span>🐛 ${data.issues || 0} open issues</span>
                `;
                containerNode.style.color = '#10b981'; // Success green
            } else {
                containerNode.innerHTML = `<span>Stats unavailable (Local)</span>`;
                containerNode.style.color = '#ef4444'; // Error red
            }
        } catch (e) {
            console.error("Failed to fetch GH stats", e);
            containerNode.innerHTML = `<span>Stats unavailable (Local)</span>`;
            containerNode.style.color = '#ef4444';
        }
    };

    function openModal(project) {
        modalBody.innerHTML = `
            <div style="margin-bottom: 12px;">
                <span style="background: #fffbeb; color: #b45309; border: 1px solid #fde68a; font-weight: 800; font-size: 0.7rem; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em;">${project.category.toUpperCase()}</span>
            </div>
            
            <h2 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 4px; color: var(--text-primary); letter-spacing: -0.02em;">${project.org}</h2>
            <p style="color: var(--text-secondary); font-weight: 500; font-size: 1rem; margin-bottom: 20px;">LFX Partner • ${project.term}</p>
            
            <a href="${project.issueUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid #d97706; color: #b45309; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; margin-bottom: 35px; transition: all 0.2s; text-decoration: none;">
                💡 Visit Project Ideas Page
            </a>

            <div style="display: flex; gap: 12px; margin-bottom: 35px; overflow-x: auto; padding-bottom: 5px;">
                <div style="border: 1.5px solid #d97706; border-radius: 16px; padding: 16px 20px; text-align: center; flex: 1; min-width: 110px;">
                    <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">${project.mentors.length}</div>
                    <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Mentors</div>
                </div>
                <div style="border: 1.5px solid #d97706; border-radius: 16px; padding: 16px 20px; text-align: center; flex: 1; min-width: 110px;">
                    <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">OPEN</div>
                    <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Status</div>
                </div>
                <div style="border: 1.5px solid #d97706; border-radius: 16px; padding: 16px 20px; text-align: center; flex: 1; min-width: 110px;">
                    <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">100%</div>
                    <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Remote</div>
                </div>
            </div>

            <!-- Black Live Stats Bar -->
            <div style="background: #111827; border-radius: 100px; padding: 10px 10px 10px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; color: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <div id="gh-stats-${project.id}" style="display: flex; gap: 20px; font-size: 0.85rem; font-weight: 700; color: #9ca3af;">
                    <span>⭐ ---</span> 
                    <span>🍴 ---</span> 
                    <span>🐛 ---</span>
                </div>
                <button onclick="fetchGitHubStats('${project.repo}', document.getElementById('gh-stats-${project.id}'))" style="background: #374151; color: #fff; border: none; padding: 8px 16px; border-radius: 30px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: background 0.2s;">
                    Fetch Live Stats
                </button>
            </div>

            <div style="margin-bottom: 30px;">
                <h4 style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; margin-bottom: 12px;">Description</h4>
                <p style="font-size: 1.05rem; color: var(--text-primary); font-weight: 700; margin-bottom: 8px; background: transparent; padding: 0; border: none;">${project.title}</p>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; background: transparent; padding: 0; border: none;">${project.description}</p>
            </div>

            <div style="margin-bottom: 35px;">
                <h4 style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; margin-bottom: 12px;">Technologies</h4>
                <div class="tags" style="padding-top: 0;">
                    ${project.skills.map(skill => `<span class="tag" style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;">${skill}</span>`).join('')}
                </div>
            </div>

            <div class="actions" style="border-top: 1px solid var(--border-color); padding-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="${project.lfxUrl}" target="_blank" class="btn primary" style="background: #c2410c; border-color: #c2410c; flex: 1; text-align: center;">Apply on LFX</a>
                <a href="${project.issueUrl}" target="_blank" class="btn primary" style="background: #b45309; border-color: #b45309; flex: 1; text-align: center;">Project Ideas</a>
                <a href="https://github.com/${project.repo}" target="_blank" class="btn" style="background: #fff; color: var(--text-primary); border: 1px solid #d1d5db; flex: 1; text-align: center;">&lt;&gt; Repository</a>
            </div>
        `;
        modal.classList.remove('hidden');
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
