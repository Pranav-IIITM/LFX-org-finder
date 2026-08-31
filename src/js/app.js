document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search-input');
    const termFilter = document.getElementById('term-filter');
    const yearFilter = document.getElementById('year-filter');
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
            
            const displaySkills = project.skills.slice(0, 3);
            const extraSkills = project.skills.length > 3 ? project.skills.length - 3 : 0;

            card.innerHTML = `
                <div class="card-header">
                    <h3>${project.org}</h3>
                    <span class="category-badge">${project.category.toUpperCase()}</span>
                </div>
                
                <p class="card-desc">
                    Offering ${project.projectCount} mentorship project${project.projectCount > 1 ? 's' : ''} in ${project.term.replace('-', ' ')}.
                </p>
                
                <div class="tags" style="margin-bottom: 20px; padding-top: 0; min-height: 28px;">
                    ${displaySkills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                    ${extraSkills > 0 ? `<span class="tag tag-more">+${extraSkills}</span>` : ''}
                </div>
                
                <div class="card-footer">
                    <span class="card-label">LFX Mentorship</span>
                    <span class="card-action">Open →</span>
                </div>
            `;
            card.addEventListener('click', () => openModal(project));
            grid.appendChild(card);
        });
    }

    function filterProjects() {
        const query = searchInput.value.toLowerCase();
        const year = yearFilter ? yearFilter.value : 'all';
        const term = termFilter ? termFilter.value : 'all';

        const filtered = LFX_PROJECTS.filter(p => {
            const matchesYear = year === 'all' || p.term.startsWith(year);
            const matchesTerm = term === 'all' || p.term.endsWith(term);
            const matchesSearch = p.title.toLowerCase().includes(query) || 
                                  p.org.toLowerCase().includes(query) || 
                                  p.skills.some(s => s.toLowerCase().includes(query));
            
            return matchesYear && matchesTerm && matchesSearch;
        });

        // Group by Organization
        const orgMap = new Map();
        filtered.forEach(p => {
            if (!orgMap.has(p.org)) {
                orgMap.set(p.org, {
                    id: p.id,
                    org: p.org,
                    term: p.term,
                    category: p.category,
                    skills: new Set(p.skills),
                    mentors: new Map(p.mentors.map(m => [m.github, m])),
                    repo: p.repo,
                    description: p.description,
                    yearsIn: p.yearsIn,
                    firstYear: p.firstYear,
                    competition: p.competition,
                    codebase: p.codebase,
                    projectCount: 1,
                    projects: [p]
                });
            } else {
                const existing = orgMap.get(p.org);
                existing.projectCount++;
                p.skills.forEach(s => existing.skills.add(s));
                p.mentors.forEach(m => existing.mentors.set(m.github, m));
                existing.projects.push(p);
            }
        });

        currentData = Array.from(orgMap.values()).map(o => ({
            ...o,
            skills: Array.from(o.skills),
            mentors: Array.from(o.mentors.values())
        }));

        renderCards(currentData);
    }

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
                containerNode.style.color = '#10b981'; // bright green
            } else {
                containerNode.innerHTML = `<span>Stats unavailable</span>`;
                containerNode.style.color = '#ef4444'; // bright red
            }
        } catch (e) {
            console.error("Failed to fetch GH stats", e);
            containerNode.innerHTML = `<span>Stats unavailable</span>`;
            containerNode.style.color = '#ef4444'; // bright red
        }
    };

    function openModal(project) {
        const projectIdeasUrl = `org-projects.html?org=${encodeURIComponent(project.org)}&term=${encodeURIComponent(project.term)}`;
        
        const orgAllProjects = LFX_PROJECTS.filter(p => p.org === project.org);
        const participatedTerms = new Set(orgAllProjects.map(p => p.term));
        const yearsToShow = [2024, 2025, 2026];
        
        let timelineHTML = '';
        yearsToShow.forEach(y => {
            const termsInYear = [`${y}-Term-1`, `${y}-Term-2`, `${y}-Term-3`];
            const participatedInYear = termsInYear.some(t => participatedTerms.has(t));
            
            if (!participatedInYear) {
                timelineHTML += `<span class="timeline-year-inactive">${y}</span>`;
            } else {
                let yearHTML = `<div class="timeline-year-group">
                                    <span class="timeline-year-label">${y}</span>`;
                termsInYear.forEach((t, index) => {
                    const termLabel = 'T' + (index + 1);
                    if (participatedTerms.has(t)) {
                        yearHTML += `<a href="org-projects.html?org=${encodeURIComponent(project.org)}&term=${encodeURIComponent(t)}" target="_blank" class="timeline-term-active">${termLabel}</a>`;
                    } else {
                        yearHTML += `<span class="timeline-term-inactive">${termLabel}</span>`;
                    }
                });
                yearHTML += `</div>`;
                timelineHTML += yearHTML;
            }
        });

        modalBody.innerHTML = `
            <div style="margin-bottom: 12px;">
                <span class="modal-badge">${project.category.toUpperCase()}</span>
            </div>
            
            <h2>${project.org}</h2>
            <p class="modal-subtitle">LFX Partner</p>
            
            <a href="${projectIdeasUrl}" class="modal-link-pill">
                View project ideas
            </a>

            <div class="stat-grid">
                <div class="stat-pill">
                    <div class="stat-pill-value">${project.yearsIn}</div>
                    <div class="stat-pill-label">Years In</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-pill-value">${project.firstYear}</div>
                    <div class="stat-pill-label">First Year</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-pill-value">${project.competition}</div>
                    <div class="stat-pill-label">Competition</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-pill-value">${project.codebase}</div>
                    <div class="stat-pill-label">Codebase</div>
                </div>
            </div>

            <div class="gh-stats-bar">
                <div id="gh-stats-${project.id}" class="gh-stats-data">
                    <span>⭐ ---</span> 
                    <span>🍴 ---</span> 
                    <span>🐛 ---</span>
                </div>
                <button onclick="fetchGitHubStats('${project.repo}', document.getElementById('gh-stats-${project.id}'))" class="gh-stats-btn">
                    Fetch Live Stats
                </button>
            </div>

            <div style="margin-bottom: 30px;">
                <h4 class="modal-section-title">Description</h4>
                <p>${project.description}</p>
            </div>

            <div style="margin-bottom: 32px;">
                <h4 class="modal-section-title">Technologies</h4>
                <div class="tags" style="padding-top: 0;">
                    ${project.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h4 class="modal-section-title">Participation Timeline</h4>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${timelineHTML}
                </div>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 10px;">* Click an active term to explore its projects</p>
            </div>

            <div class="mentors-box">
                <h4>Mentors & Contact</h4>
                
                <div style="margin-bottom: 18px;">
                    <strong class="modal-section-title">Mentors</strong>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                        ${project.mentors.map(m => `<a href="https://github.com/${m.github}" target="_blank" class="mentor-link">@${m.github}</a>`).join('')}
                    </div>
                </div>

                <div>
                    <strong class="modal-section-title">Contact Tip</strong>
                    <p style="font-size: 0.95rem; color: var(--text-primary); margin-top: 8px; margin-bottom: 0; line-height: 1.55; font-weight: 500;">Say hello in the CNCF Slack or on the upstream issue. Make sure to mention the specific project area you're exploring!</p>
                </div>
            </div>

            <div class="actions" style="border-top: 1px solid var(--border-color); padding-top: 24px;">
                <a href="${projectIdeasUrl}" class="btn primary" style="flex: 1; text-align: center;">Project Ideas (${project.projectCount})</a>
                <a href="https://github.com/${project.repo}" target="_blank" class="btn" style="flex: 1; text-align: center;">&lt;&gt; Repository</a>
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
    if(termFilter) termFilter.addEventListener('change', filterProjects);
    if(yearFilter) yearFilter.addEventListener('change', filterProjects);

    // Initial render
    filterProjects();

    // Setup Dynamic Timeline & Countdown Logic
    function updateCountdown() {
        const now = new Date();
        const nowTime = now.getTime();
        
        // Main countdown to Mentorship Begins (Sept 7)
        const targetDate = new Date("2026-09-07T00:00:00Z").getTime();
        const distance = targetDate - nowTime;

        const countdownEl = document.getElementById("countdown-timer");
        if (countdownEl) {
            if (distance < 0) {
                countdownEl.innerHTML = "PROGRAM STARTED";
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                countdownEl.innerHTML = `${days}d ${hours}h ${mins}m`;
            }
        }

        // Dynamic Vertical Timeline Logic
        const timelineTrack = document.getElementById('dynamic-timeline');
        if (!timelineTrack) return;

        const items = Array.from(timelineTrack.querySelectorAll('.timeline-item'));
        let activeIndex = -1;

        // Reset classes
        items.forEach(item => {
            item.classList.remove('past', 'active', 'future');
        });

        // Find where 'now' fits in the timeline
        for (let i = 0; i < items.length; i++) {
            const itemDate = new Date(items[i].getAttribute('data-date') + "T00:00:00Z").getTime();
            if (nowTime >= itemDate) {
                items[i].classList.add('past');
                activeIndex = i;
            } else {
                if (activeIndex === i - 1) items[i].classList.add('active');
                else items[i].classList.add('future');
            }
        }

        // Remove old gap if exists
        const oldGap = document.getElementById('vertical-timeline-gap');
        if (oldGap) oldGap.remove();

        // Insert gap between activeIndex (past) and activeIndex + 1 (active)
        if (activeIndex >= 0 && activeIndex < items.length - 1) {
            const prevItem = items[activeIndex];
            const nextItem = items[activeIndex + 1];
            
            const prevDate = new Date(prevItem.getAttribute('data-date') + "T00:00:00Z").getTime();
            const nextDate = new Date(nextItem.getAttribute('data-date') + "T00:00:00Z").getTime();
            
            const totalDuration = nextDate - prevDate;
            const elapsed = nowTime - prevDate;
            let percentage = (elapsed / totalDuration) * 100;
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            const gapHtml = `
                <div class="timeline-vertical-gap" id="vertical-timeline-gap">
                    <div class="timeline-vertical-thumb" style="top: ${percentage}%">
                        <span class="timeline-vertical-tooltip">Today (Aug 30)</span>
                    </div>
                </div>
            `;
            
            prevItem.insertAdjacentHTML('afterend', gapHtml);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Render Past Mentees
    function renderMentees() {
        const container = document.getElementById('mentees-container');
        if (!container) return;

        if (typeof LFX_MENTEES === 'undefined' || LFX_MENTEES.length === 0) {
            container.innerHTML = '<p>No mentees found. Be the first to add yourself!</p>';
            return;
        }

        container.innerHTML = LFX_MENTEES.map(mentee => `
            <div class="mentee-card">
                <h4>${mentee.name}</h4>
                <p class="mentee-org"><strong>Org:</strong> ${mentee.org}</p>
                <p class="mentee-project"><strong>Project:</strong> ${mentee.project}</p>
                <p class="mentee-term"><strong>Term:</strong> ${mentee.term}</p>
                <div class="mentee-socials">
                    <a href="${mentee.github}" target="_blank" class="social-link github">GitHub</a>
                    ${mentee.linkedin ? `<a href="${mentee.linkedin}" target="_blank" class="social-link linkedin">LinkedIn</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderMentees();
});
