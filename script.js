// Quantum 5000 Temporal Interface System

document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ DOM fully loaded");
    initQuantumSystem();
});

function initQuantumSystem() {
    console.log("🔧 Initializing Quantum Interface...");
    createQuantumParticles();
    loadTemporalTemplates();
    startSystemAnimations();
}

function createQuantumParticles() {
    const particleContainer = document.getElementById('quantumParticles');
    if (!particleContainer) {
        console.warn("⚠️ #quantumParticles container not found.");
        return;
    }

    const particleCount = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('quantum-particle');

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = color;
        particle.style.animation = `quantumFloat ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;

        particleContainer.appendChild(particle);
    }

    console.log(`🌀 Created ${particleCount} quantum particles`);
}

function loadTemporalTemplates() {
    const templateMatrix = document.getElementById('templateMatrix');
    if (!templateMatrix) {
        console.error("❌ #templateMatrix not found in DOM");
        return;
    }

    console.log("📦 Fetching templates.json...");
    fetch('templates.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`❌ Failed to load templates.json: ${response.status}`);
            }
            return response.json();
        })
        .then(templates => {
            console.log("📄 Templates loaded:", templates);

            if (templates.length === 0) {
                console.warn("⚠️ No templates found in templates.json");
            }

            templates.forEach(template => {
                const templateNode = document.createElement('div');
                templateNode.className = 'template-node';
                templateNode.dataset.category = template.category;
                templateNode.dataset.id = template.id;

                templateNode.innerHTML = `
                    <img src="${template.thumbnail}" alt="${template.title}" class="template-thumbnail">
                    <div class="template-info">
                        <h3 class="template-title">${template.title}</h3>
                        <p class="template-desc">${template.description}</p>
                        <div class="template-actions">
                            <button class="preview-btn" data-id="${template.id}">PREVIEW</button>
                            <div class="template-tags">
                                ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;

                templateMatrix.appendChild(templateNode);
            });

            console.log(`✅ Rendered ${templates.length} templates`);

            document.querySelectorAll('.preview-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const templateId = this.dataset.id;
                    console.log(`👁️ Preview requested for: ${templateId}`);

                    fetch('templates.json')
                        .then(response => response.json())
                        .then(data => {
                            const template = data.find(t => t.id === templateId);
                            if (template) {
                                openTemporalPreview(template);
                            } else {
                                console.warn(`⚠️ Template with ID '${templateId}' not found`);
                            }
                        });
                });
            });

            initNeuralEvents(); // ✅ Move neural init AFTER templates are rendered
        })
        .catch(error => {
            console.error("❌ Error loading templates:", error);
        });
}

function openTemporalPreview(template) {
    console.log("👁️ Opening preview:", template);
    const previewChamber = document.getElementById('previewChamber');
    const quantumPreview = document.getElementById('quantumPreview');
    const templateTitle = document.getElementById('templateTitle');
    const techSignatures = document.getElementById('techSignatures');
    const quantumDownload = document.getElementById('quantumDownload');
    const downloadCounter = document.getElementById('downloadCounter');

    if (!previewChamber || !quantumPreview) {
        console.warn("⚠️ Preview chamber or preview iframe not found");
        return;
    }

    quantumPreview.src = template.previewUrl;
    templateTitle.textContent = template.title;
    quantumDownload.dataset.id = template.id;
    techSignatures.innerHTML = template.tech.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Show download count
    const count = getDownloadCount(template.id);
    if (downloadCounter) {
        downloadCounter.textContent = `| ${count}`;
    }

    previewChamber.classList.add('active');

    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeTemporalPreview();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function closeTemporalPreview() {
    const previewChamber = document.getElementById('previewChamber');
    const quantumPreview = document.getElementById('quantumPreview');

    if (!previewChamber || !quantumPreview) return;

    previewChamber.classList.remove('active');
    setTimeout(() => {
        quantumPreview.src = '';
    }, 400);
}

function initNeuralEvents() {
    console.log("🧠 Initializing neural events...");

    const bioScanner = document.querySelector('.bio-scanner');
    if (bioScanner) {
        bioScanner.addEventListener('click', function () {
            this.classList.toggle('scan-active');
        });
    }

    const closeBtn = document.getElementById('closeChamber');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTemporalPreview);
    }

    const downloadBtn = document.getElementById('quantumDownload');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            const templateId = this.dataset.id;
            if (!templateId) return;
            console.log(`📥 Downloading template: ${templateId}`);

            incrementDownloadCount(templateId);
            const downloadCounter = document.getElementById('downloadCounter');
            if (downloadCounter) {
                downloadCounter.textContent = `| ${getDownloadCount(templateId)}`;
            }

            const a = document.createElement('a');
            a.href = `templates/${templateId}.zip`;
            a.download = `${templateId}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    const filterNodes = document.querySelectorAll('.filter-node');
    filterNodes.forEach(node => {
        node.addEventListener('click', function () {
            document.querySelectorAll('.filter-node').forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.filter;
            const templates = document.querySelectorAll('.template-node');
            templates.forEach(template => {
                if (category === 'all' || template.dataset.category === category) {
                    template.style.display = 'block';
                } else {
                    template.style.display = 'none';
                }
            });
        });
    });

    const accessBtn = document.getElementById('accessBtn');
    if (accessBtn) {
        accessBtn.addEventListener('click', function () {
            document.querySelector('.template-station').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // ✅ Search Logic placed here
    const searchInput = document.getElementById('templateSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const templates = document.querySelectorAll('.template-node');

            templates.forEach(template => {
                const title = template.querySelector('.template-title')?.textContent.toLowerCase() || '';
                const desc = template.querySelector('.template-desc')?.textContent.toLowerCase() || '';
                const tags = Array.from(template.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                const category = template.dataset.category?.toLowerCase() || '';

                const matches =
                    title.includes(query) ||
                    desc.includes(query) ||
                    tags.some(tag => tag.includes(query)) ||
                    category.includes(query);

                template.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

function startSystemAnimations() {
    const shards = document.querySelectorAll('.shard');
    shards.forEach((shard, index) => {
        shard.style.setProperty('--rotation', `${index % 2 ? 15 : -15}deg`);
    });

    const templateNodes = document.querySelectorAll('.template-node');
    templateNodes.forEach(node => {
        node.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    console.log("✨ System animations started");
}

// 🔢 LocalStorage-based download counter
function incrementDownloadCount(id) {
    const key = `downloads_${id}`;
    const current = localStorage.getItem(key) || 0;
    localStorage.setItem(key, parseInt(current) + 1);
}

function getDownloadCount(id) {
    const key = `downloads_${id}`;
    return parseInt(localStorage.getItem(key)) || 0;
}
