
        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced Dynamic Website Data Manager
        class WebsiteDataManager {
            constructor() {
                this.loadAllData();
                this.setupEventListeners();
            }

            setupEventListeners() {
                // Listen for storage changes (when admin updates data)
                window.addEventListener('storage', (e) => {
                    console.log('Storage event received:', e.key);
                    if (['articles', 'gallery', 'research', 'about', 'contact'].includes(e.key)) {
                        this.loadAllData();
                    }
                });
                
                // Listen for custom events (same-tab updates)
                window.addEventListener('adminDataUpdate', (e) => {
                    console.log('Admin data update received:', e.detail);
                    this.loadAllData();
                });

                // Listen for messages from admin panel
                window.addEventListener('message', (e) => {
                    if (e.data.type === 'adminUpdate') {
                        console.log('Admin message received:', e.data);
                        this.loadAllData();
                    }
                });

                // Poll for changes every 2 seconds (fallback)
                setInterval(() => {
                    this.loadAllData();
                }, 2000);
            }

            loadAllData() {
                this.loadArticles();
                this.loadGallery();
                this.loadResearchPapers();
                this.loadAboutSection();
                this.loadContactSection();
            }

            loadArticles() {
                const articles = JSON.parse(localStorage.getItem('articles')) || [];

                // Update projects slider
                const projectsSlider = document.querySelector('.projects-slider');
                if (projectsSlider && articles.length > 0) {
                    // ALWAYS clear existing content first - this removes hardcoded HTML
                    projectsSlider.innerHTML = '';

                    // Add original cards
                    articles.forEach((article, index) => {
                        const articleElement = document.createElement('div');
                        articleElement.className = 'project-card';
                        articleElement.setAttribute('data-article-id', index + 1);
                        articleElement.innerHTML = `
                            <div class="project-img">
                                <img src="${article.image}" alt="${article.title}">
                            </div>
                            <div class="project-info">
                                <h3>${article.title}</h3>
                                <p>${article.description}</p>
                            </div>
                        `;

                        // Add click event
                        articleElement.addEventListener('click', () => {
                            this.openArticlePopup(index);
                        });

                        projectsSlider.appendChild(articleElement);
                    });

                    // Duplicate cards for infinite loop
                    articles.forEach((article, index) => {
                        const articleElement = document.createElement('div');
                        articleElement.className = 'project-card';
                        articleElement.setAttribute('data-article-id', index + 1);
                        articleElement.innerHTML = `
                            <div class="project-img">
                                <img src="${article.image}" alt="${article.title}">
                            </div>
                            <div class="project-info">
                                <h3>${article.title}</h3>
                                <p>${article.description}</p>
                            </div>
                        `;

                        // Add click event
                        articleElement.addEventListener('click', () => {
                            this.openArticlePopup(index);
                        });

                        projectsSlider.appendChild(articleElement);
                    });

                    console.log(`Loaded ${articles.length} articles into slider`);
                }

                // Update projects grid if exists
                const projectsGrid = document.querySelector('#projects .projects-grid');
                if (projectsGrid && articles.length > 0) {
                    projectsGrid.innerHTML = '';

                    articles.forEach((article, index) => {
                        const articleElement = document.createElement('div');
                        articleElement.className = 'project-card';
                        articleElement.innerHTML = `
                            <div class="project-img">
                                <img src="${article.image}" alt="${article.title}">
                                <div class="project-overlay">
                                    <button class="view-project" onclick="dataManager.openArticlePopup(${index})">View Details</button>
                                </div>
                            </div>
                            <div class="project-info">
                                <h3>${article.title}</h3>
                                <p>${article.description}</p>
                                ${article.author ? `<div class="article-meta"><span class="author">By: ${article.author}</span></div>` : ''}
                                ${article.publishDate ? `<div class="article-meta"><span class="date">${new Date(article.publishDate).toLocaleDateString()}</span></div>` : ''}
                                ${article.tags ? `<div class="article-tags">${article.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                            </div>
                        `;
                        projectsGrid.appendChild(articleElement);
                    });
                }
            }

            loadGallery() {
                const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
                const galleryContainer = document.querySelector('#gallery .gallery-container');

                if (galleryContainer && gallery.length > 0) {
                    // ALWAYS clear existing content first - this removes hardcoded HTML
                    galleryContainer.innerHTML = '';

                    gallery.forEach(item => {
                        const galleryElement = document.createElement('div');
                        galleryElement.className = 'gallery-item';
                        galleryElement.innerHTML = `
                            <img src="${item.image}" alt="${item.title}">
                            <div class="overlay">
                                <h3>${item.title}</h3>
                                <p>${item.location}</p>
                                ${item.category ? `<span class="category">${item.category}</span>` : ''}
                                ${item.photographer ? `<p class="photographer">📸 ${item.photographer}</p>` : ''}
                                ${item.description ? `<p class="description">${item.description}</p>` : ''}
                            </div>
                        `;
                        galleryContainer.appendChild(galleryElement);
                    });

                    console.log(`Loaded ${gallery.length} gallery items`);
                }
            }

            loadResearchPapers() {
                const research = JSON.parse(localStorage.getItem('research')) || [];
                const papersContainer = document.querySelector('#research-papers .papers-grid');

                if (papersContainer && research.length > 0) {
                    // ALWAYS clear existing content first - this removes hardcoded HTML
                    papersContainer.innerHTML = '';

                    research.forEach(paper => {
                        const paperElement = document.createElement('div');
                        paperElement.className = 'paper-card';
                        paperElement.setAttribute('data-pdf-source', paper.pdf);
                        paperElement.setAttribute('data-paper-title', paper.title);
                        paperElement.innerHTML = `
                            <div class="paper-icon">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <div class="paper-info">
                                <h3>${paper.title}</h3>
                                <p>${paper.description}</p>
                                <div class="paper-meta">
                                    <span class="paper-authors">👥 ${paper.authors}</span>
                                    ${paper.journal ? `<span class="paper-journal">📖 ${paper.journal}</span>` : ''}
                                    <span class="paper-pages">📄 ${paper.pages} pages</span>
                                    <span class="paper-year">📅 ${paper.year}</span>
                                    ${paper.category ? `<span class="paper-category">🏷️ ${paper.category}</span>` : ''}
                                </div>
                                ${paper.keywords ? `<div class="paper-keywords">${paper.keywords.split(',').map(keyword => `<span class="keyword">${keyword.trim()}</span>`).join('')}</div>` : ''}
                                <div class="paper-actions">
                                    <button class="view-btn">
                                        <i class="fas fa-eye"></i> View PDF
                                    </button>
                                    <a href="${paper.pdf}" download class="download-btn">
                                        <i class="fas fa-download"></i> Download
                                    </a>
                                    ${paper.doi ? `<a href="https://doi.org/${paper.doi}" target="_blank" class="doi-btn"><i class="fas fa-external-link-alt"></i> DOI</a>` : ''}
                                </div>
                            </div>
                        `;
                        papersContainer.appendChild(paperElement);
                    });

                    this.initializePDFViewers();
                    console.log(`Loaded ${research.length} research papers`);
                }
            }

            loadAboutSection() {
                const about = JSON.parse(localStorage.getItem('about')) || {};

                // Update profile info in the about section
                const aboutSection = document.querySelector('#about .about-text');
                if (aboutSection) {
                    const nameElement = aboutSection.querySelector('h3');
                    const paragraphs = aboutSection.querySelectorAll('p');

                    if (nameElement && about.name) {
                        nameElement.textContent = about.name;
                    }

                    // Update qualifications and position
                    if (about.qualifications || about.position) {
                        // Clear existing paragraphs except download buttons
                        const downloadDiv = aboutSection.querySelector('.download-resume');
                        aboutSection.innerHTML = `<h3>${about.name || 'Dr. Shiv Singh Rathore'}</h3>`;

                        // Add qualifications
                        if (about.qualifications) {
                            const qualLines = about.qualifications.split('\n');
                            qualLines.forEach(line => {
                                if (line.trim()) {
                                    const p = document.createElement('p');
                                    p.textContent = line.trim();
                                    aboutSection.appendChild(p);
                                }
                            });
                        }

                        // Add position
                        if (about.position) {
                            const posLines = about.position.split('\n');
                            posLines.forEach(line => {
                                if (line.trim()) {
                                    const p = document.createElement('p');
                                    p.textContent = line.trim();
                                    aboutSection.appendChild(p);
                                }
                            });
                        }

                        // Re-add download buttons
                        if (downloadDiv) {
                            aboutSection.appendChild(downloadDiv);
                        }
                    }
                }

                // Update profile image
                const profileImage = document.querySelector('#about .about-img img');
                if (profileImage && about.image) {
                    profileImage.src = about.image;
                }
            }

            loadContactSection() {
                const contact = JSON.parse(localStorage.getItem('contact')) || {};

                // Update contact info - find the contact details in the contact section
                const contactDetails = document.querySelectorAll('#contact .contact-detail');

                contactDetails.forEach(detail => {
                    const heading = detail.querySelector('h4');
                    if (!heading) return;

                    const contentDiv = detail.querySelector('div:last-child');
                    if (!contentDiv) return;

                    // Update based on heading text
                    if (heading.textContent.includes('Location') && contact.location) {
                        const p = contentDiv.querySelector('p');
                        if (p) p.textContent = contact.location;
                    } else if (heading.textContent.includes('Gmail') && contact.email) {
                        const a = contentDiv.querySelector('a');
                        if (a) {
                            a.textContent = contact.email;
                            a.href = `mailto:${contact.email}`;
                        }
                    } else if (heading.textContent.includes('Phone') && contact.phone) {
                        const a = contentDiv.querySelector('a');
                        if (a) {
                            a.textContent = contact.phone;
                            a.href = `tel:${contact.phone}`;
                        }
                    }
                });
            }

            openArticlePopup(index) {
                const articles = JSON.parse(localStorage.getItem('articles')) || [];
                const article = articles[index];
                
                if (!article) return;
                
                // Create or update popup content
                let popup = document.getElementById('articlePopup');
                if (!popup) {
                    popup = document.createElement('div');
                    popup.id = 'articlePopup';
                    popup.className = 'popup-overlay';
                    document.body.appendChild(popup);
                }
                
                popup.innerHTML = `
                    <div class="popup-content">
                        <button class="popup-close" onclick="dataManager.closeArticlePopup()">&times;</button>
                        <div class="popup-header">
                            <img src="${article.image}" alt="${article.title}">
                            <div class="popup-title">
                                <h2>${article.title}</h2>
                                ${article.author ? `<p class="author">By: ${article.author}</p>` : ''}
                                ${article.publishDate ? `<p class="date">Published: ${new Date(article.publishDate).toLocaleDateString()}</p>` : ''}
                            </div>
                        </div>
                        <div class="popup-body">
                            <div class="content">${article.content}</div>
                            ${article.tags ? `<div class="tags">${article.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                        </div>
                    </div>
                `;
                
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }

            closeArticlePopup() {
                const popup = document.getElementById('articlePopup');
                if (popup) {
                    popup.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }

            initializePDFViewers() {
                // Re-initialize PDF viewers for dynamically loaded content
                const paperCards = document.querySelectorAll('.paper-card');
                paperCards.forEach(card => {
                    const viewBtn = card.querySelector('.view-btn');
                    if (viewBtn) {
                        viewBtn.addEventListener('click', () => {
                            const pdfSource = card.getAttribute('data-pdf-source');
                            const paperTitle = card.getAttribute('data-paper-title');
                            this.openPDFModal(pdfSource, paperTitle);
                        });
                    }
                });
            }

            openPDFModal(pdfSource, title) {
                // PDF modal functionality
                console.log('Opening PDF:', pdfSource, title);
                // Add your PDF modal logic here
            }
        }

        // Initialize website data manager when page loads
        document.addEventListener('DOMContentLoaded', function() {
            window.dataManager = new WebsiteDataManager();
            
            console.log('Website data manager initialized');
        });

        // Global functions for backward compatibility
        function openArticlePopup(index) {
            if (window.dataManager) {
                window.dataManager.openArticlePopup(index);
            }
        }

        function closeArticlePopup() {
            if (window.dataManager) {
                window.dataManager.closeArticlePopup();
            }
        }