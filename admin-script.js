// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        
        // Define dynamic content structure
        this.contentStructure = {
            articles: {
                fields: [
                    { name: 'title', type: 'text', label: 'Title', required: true },
                    { name: 'image', type: 'file', label: 'Featured Image', accept: 'image/*', required: true },
                    { name: 'description', type: 'textarea', label: 'Short Description', rows: 3, required: true },
                    { name: 'content', type: 'textarea', label: 'Full Content', rows: 8, required: true },
                    { name: 'author', type: 'text', label: 'Author', required: false },
                    { name: 'publishDate', type: 'date', label: 'Publish Date', required: false },
                    { name: 'tags', type: 'text', label: 'Tags (comma separated)', required: false }
                ],
                displayFields: ['title', 'image', 'description', 'author', 'publishDate']
            },
            gallery: {
                fields: [
                    { name: 'title', type: 'text', label: 'Image Title', required: true },
                    { name: 'location', type: 'text', label: 'Location', required: true },
                    { name: 'image', type: 'file', label: 'Image File', accept: 'image/*', required: true },
                    { name: 'description', type: 'textarea', label: 'Description', rows: 3, required: false },
                    { name: 'photographer', type: 'text', label: 'Photographer', required: false },
                    { name: 'captureDate', type: 'date', label: 'Capture Date', required: false },
                    { name: 'category', type: 'select', label: 'Category', options: ['Water Bodies', 'Step Wells', 'Traditional Architecture', 'Landscapes'], required: false }
                ],
                displayFields: ['title', 'location', 'image', 'category', 'photographer']
            },
            research: {
                fields: [
                    { name: 'title', type: 'text', label: 'Paper Title', required: true },
                    { name: 'description', type: 'textarea', label: 'Abstract/Description', rows: 4, required: true },
                    { name: 'pdf', type: 'file', label: 'PDF Document', accept: '.pdf', required: true },
                    { name: 'authors', type: 'text', label: 'Authors', required: true },
                    { name: 'journal', type: 'text', label: 'Journal/Conference', required: false },
                    { name: 'pages', type: 'number', label: 'Number of Pages', required: true },
                    { name: 'year', type: 'number', label: 'Publication Year', required: true },
                    { name: 'doi', type: 'text', label: 'DOI', required: false },
                    { name: 'keywords', type: 'text', label: 'Keywords (comma separated)', required: false },
                    { name: 'category', type: 'select', label: 'Research Category', options: ['Hydrogeology', 'Water Conservation', 'Geological Heritage', 'Tourism', 'Environmental Science'], required: false }
                ],
                displayFields: ['title', 'authors', 'journal', 'pages', 'year', 'category']
            }
        };
        
        // Initialize with existing content if localStorage is empty
        this.initializeData();
        this.init();
    }

    initializeData() {
        // Import all hardcoded content from main website
        const existingArticles = [
            {
                id: 1,
                title: "UNESCO Geo Park",
                image: "images/p.jpeg",
                description: "India has rich geological heritage but lacks any UNESCO Global Geoparks, while China has 41.",
                content: `<p>India has a rich geological heritage but surprisingly lacks any UNESCO Global Geoparks, while China boasts 41 such sites. The concept of Hydrogeo Tourism aims to blend water conservation with geological tourism, potentially creating India's first UNESCO Global Geopark.</p><p>This initiative could showcase Rajasthan's unique geological formations while promoting sustainable water management practices.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2024-01-15",
                tags: "UNESCO, Geopark, Tourism, Rajasthan"
            },
            {
                id: 2,
                title: "Threat to Farming and Trade",
                image: "images/p1.jpeg",
                description: "Expanding desertification, largely driven by human actions, is severely impacting agriculture and trade worldwide.",
                content: `<p>Expanding desertification, largely driven by human actions, is severely impacting agriculture and trade worldwide. In regions like Rajasthan, once-fertile lands are increasingly threatened by advancing desert conditions.</p><p>Understanding and combating this threat is crucial for sustainable development.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2024-01-10",
                tags: "Desertification, Agriculture, Climate Change"
            },
            {
                id: 3,
                title: "Hydrogeo Tourism",
                image: "images/p2.jpeg",
                description: "A revolutionary approach combining geological heritage with water conservation tourism.",
                content: `<p>Hydrogeo Tourism represents a new paradigm in sustainable tourism, combining geological heritage sites with water conservation education.</p><p>This approach can help preserve both natural heritage and traditional water management systems.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2024-01-05",
                tags: "Tourism, Water Conservation, Heritage"
            },
            {
                id: 4,
                title: "The Jodhpur Heritage",
                image: "images/JODHPUR.jpeg",
                description: "The article discusses the potential of Jodhpur becoming India's first UNESCO Global Heritage Park, showcasing its rich cultural and historical landmarks.",
                content: `<p>Jodhpur, the Blue City of Rajasthan, stands as a testament to India's rich cultural heritage. With its magnificent forts, palaces, and traditional architecture, it has the potential to become India's first UNESCO Global Heritage Park.</p><p>The city's unique blend of history, culture, and geological significance makes it an ideal candidate for this prestigious designation.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2023-12-20",
                tags: "Jodhpur, Heritage, UNESCO, Architecture"
            },
            {
                id: 5,
                title: "Gangalav Lake Restoration",
                image: "images/gangalav.jpeg",
                description: "Comprehensive restoration project of Gangalav Lake focusing on water conservation and ecological balance.",
                content: `<p>The Gangalav Lake restoration project represents a significant step towards sustainable water management in Rajasthan. This comprehensive initiative focuses on reviving the lake's ecosystem while ensuring water security for local communities.</p><p>The project incorporates traditional water harvesting techniques with modern conservation methods.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2023-12-15",
                tags: "Lake Restoration, Water Conservation, Ecology"
            },
            {
                id: 6,
                title: "Traditional Water Systems",
                image: "images/traditional.jpeg",
                description: "Exploring ancient water harvesting systems and their relevance in modern water management.",
                content: `<p>Rajasthan's traditional water harvesting systems, including step wells, tanks, and baoris, represent centuries of indigenous knowledge in water management. These systems offer valuable insights for modern water conservation strategies.</p><p>Understanding and reviving these traditional methods can significantly contribute to addressing current water challenges.</p>`,
                author: "Dr. Shiv Singh Rathore",
                publishDate: "2023-12-10",
                tags: "Traditional Systems, Water Harvesting, Indigenous Knowledge"
            }
        ];

        const existingGallery = [
            {
                id: 1,
                title: "Ana sagar",
                location: "Ajmer, Rajasthan",
                image: "images/anasagar.jpeg",
                category: "Water Bodies",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Historic artificial lake in Ajmer"
            },
            {
                id: 2,
                title: "Toorji ka Jhalra",
                location: "Jodhpur, Rajasthan",
                image: "images/toorjika.webp",
                category: "Step Wells",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Ancient step well in Jodhpur"
            },
            {
                id: 3,
                title: "WaterBody",
                location: "Bagar, Rajasthan",
                image: "images/bagar.jpeg",
                category: "Water Bodies",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Traditional water body in Bagar"
            },
            {
                id: 4,
                title: "Traditional Step Well",
                location: "Rajasthan, India",
                image: "images/stepwell.jpg",
                category: "Step Wells",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Ancient step well architecture"
            },
            {
                id: 5,
                title: "Ancient Water Tank",
                location: "Gujarat, India",
                image: "images/watertank.jpg",
                category: "Water Bodies",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Historic water storage system"
            },
            {
                id: 6,
                title: "Desert Oasis",
                location: "Thar Desert, Rajasthan",
                image: "images/oasis.jpg",
                category: "Landscapes",
                photographer: "Dr. Shiv Singh Rathore",
                description: "Natural oasis in Thar Desert"
            }
        ];

        const existingResearch = [
            {
                id: 1,
                title: "Step Wells Research",
                description: "Comprehensive study on traditional water harvesting systems and their modern relevance in sustainable water management practices.",
                pdf: "documents/Step Wells.pdf",
                authors: "Dr. Shiv Singh Rathore, Dr. Priya Sharma",
                journal: "Journal of Water Conservation",
                pages: 12,
                year: 2023,
                category: "Water Conservation",
                keywords: "step wells, water harvesting, traditional systems"
            },
            {
                id: 2,
                title: "Water Conservation in Arid Regions",
                description: "Analysis of traditional and modern water conservation techniques in desert regions of Rajasthan.",
                pdf: "documents/water-conservation.pdf",
                authors: "Dr. Shiv Singh Rathore",
                journal: "Environmental Science Review",
                pages: 18,
                year: 2023,
                category: "Environmental Science",
                keywords: "arid regions, water conservation, Rajasthan"
            },
            {
                id: 3,
                title: "Geological Heritage of Rajasthan",
                description: "Detailed study of geological formations and their potential for geopark development in Rajasthan.",
                pdf: "documents/geological-heritage.pdf",
                authors: "Dr. Shiv Singh Rathore, Dr. Amit Kumar",
                journal: "Geological Survey of India",
                pages: 24,
                year: 2022,
                category: "Geological Heritage",
                keywords: "geology, heritage, geopark, Rajasthan"
            }
        ];

        const existingAbout = {
            name: "Dr. Shiv Singh Rathore",
            qualifications: "Ph.D. in Hydrogeology, M.Sc. in Environmental Science, B.Sc. in Geology",
            position: "Senior Research Scientist at Water Resources Department, Government of Rajasthan. Specializing in groundwater management and sustainable water conservation practices.",
            image: "images/picture1.jpeg"
        };

        const existingContact = {
            location: "Water Resources Department, Jaipur, Rajasthan, India - 302005",
            email: "hydrogeo.tourism@rajasthan.gov.in",
            phone: "+91-141-2234567"
        };

        // Initialize localStorage with existing content if empty
        if (!localStorage.getItem('articles')) {
            localStorage.setItem('articles', JSON.stringify(existingArticles));
        }
        if (!localStorage.getItem('gallery')) {
            localStorage.setItem('gallery', JSON.stringify(existingGallery));
        }
        if (!localStorage.getItem('research')) {
            localStorage.setItem('research', JSON.stringify(existingResearch));
        }
        if (!localStorage.getItem('about')) {
            localStorage.setItem('about', JSON.stringify(existingAbout));
        }
        if (!localStorage.getItem('contact')) {
            localStorage.setItem('contact', JSON.stringify(existingContact));
        }

        // Load data from localStorage
        this.data = {
            articles: JSON.parse(localStorage.getItem('articles')) || existingArticles,
            gallery: JSON.parse(localStorage.getItem('gallery')) || existingGallery,
            research: JSON.parse(localStorage.getItem('research')) || existingResearch,
            about: JSON.parse(localStorage.getItem('about')) || existingAbout,
            contact: JSON.parse(localStorage.getItem('contact')) || existingContact
        };
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (item.id === 'logoutBtn') {
                    this.logout();
                } else {
                    const section = item.getAttribute('data-section');
                    if (section) this.switchSection(section);
                }
            });
        });

        // Add new button
        document.getElementById('addNewBtn').addEventListener('click', () => {
            this.openAddModal();
        });

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Forms
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        document.getElementById('aboutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAboutSection();
        });

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateContactSection();
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in real app, use proper authentication)
        if (username === 'admin' && password === 'admin123') {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'flex';
            localStorage.setItem('adminLoggedIn', 'true');
        } else {
            alert('Invalid credentials! Use admin/admin123');
        }
    }

    logout() {
        localStorage.removeItem('adminLoggedIn');
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.section-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${section}-content`).classList.add('active');

        // Update header
        const titles = {
            dashboard: 'Dashboard',
            articles: 'Articles Management',
            gallery: 'Gallery Management',
            research: 'Research Papers',
            about: 'About Section',
            contact: 'Contact Information'
        };
        document.getElementById('sectionTitle').textContent = titles[section];

        // Show/hide add button
        const showAddButton = ['articles', 'gallery', 'research'].includes(section);
        document.getElementById('addNewBtn').style.display = showAddButton ? 'block' : 'none';

        this.currentSection = section;
        this.loadSectionContent(section);
    }

    loadSectionContent(section) {
        switch (section) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'articles':
                this.loadArticles();
                break;
            case 'gallery':
                this.loadGallery();
                break;
            case 'research':
                this.loadResearch();
                break;
            case 'about':
                this.loadAbout();
                break;
            case 'contact':
                this.loadContact();
                break;
        }
    }

    loadDashboard() {
        document.getElementById('articlesCount').textContent = this.data.articles.length;
        document.getElementById('galleryCount').textContent = this.data.gallery.length;
        document.getElementById('researchCount').textContent = this.data.research.length;
    }

    loadArticles() {
        const table = document.getElementById('articlesTable');
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');
        
        thead.innerHTML = this.generateTableHeaders('articles');
        tbody.innerHTML = '';

        this.data.articles.forEach((article, index) => {
            const row = document.createElement('tr');
            row.innerHTML = this.generateTableRow(article, index, 'articles');
            tbody.appendChild(row);
        });
    }

    loadGallery() {
        const grid = document.getElementById('galleryGrid');
        grid.innerHTML = '';

        this.data.gallery.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-info">
                    <h4>${item.title}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                    ${item.category ? `<span class="category-tag">${item.category}</span>` : ''}
                    ${item.photographer ? `<p class="photographer">📸 ${item.photographer}</p>` : ''}
                </div>
                <div class="gallery-item-actions">
                    <button class="btn btn-sm btn-primary" onclick="admin.editItem('gallery', ${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="admin.deleteItem('gallery', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            grid.appendChild(div);
        });
    }

    loadResearch() {
        const table = document.getElementById('researchTable');
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');
        
        thead.innerHTML = this.generateTableHeaders('research');
        tbody.innerHTML = '';

        this.data.research.forEach((paper, index) => {
            const row = document.createElement('tr');
            row.innerHTML = this.generateTableRow(paper, index, 'research');
            tbody.appendChild(row);
        });
    }

    loadAbout() {
        const about = this.data.about;
        document.getElementById('profileName').value = about.name || '';
        document.getElementById('profileQualifications').value = about.qualifications || '';
        document.getElementById('profilePosition').value = about.position || '';
        
        if (about.image) {
            document.getElementById('profilePreview').innerHTML = `<img src="${about.image}" alt="Profile">`;
        }
    }

    loadContact() {
        const contact = this.data.contact;
        document.getElementById('contactLocation').value = contact.location || '';
        document.getElementById('contactEmail').value = contact.email || '';
        document.getElementById('contactPhone').value = contact.phone || '';
    }

    openAddModal() {
        const modal = document.getElementById('editModal');
        const title = document.getElementById('modalTitle');
        const formFields = document.getElementById('formFields');

        const sectionTitles = {
            articles: 'Add New Article',
            gallery: 'Add New Gallery Item',
            research: 'Add New Research Paper'
        };

        title.textContent = sectionTitles[this.currentSection] || 'Add New Item';
        formFields.innerHTML = this.generateFormFields(this.currentSection);
        modal.classList.add('active');
    }

    editItem(type, index) {
        const item = this.data[type][index];
        const modal = document.getElementById('editModal');
        const title = document.getElementById('modalTitle');
        const formFields = document.getElementById('formFields');

        const sectionTitles = {
            articles: 'Edit Article',
            gallery: 'Edit Gallery Item',
            research: 'Edit Research Paper'
        };

        title.textContent = sectionTitles[type] || 'Edit Item';
        formFields.innerHTML = this.generateFormFields(type, item);
        
        // Store edit info
        const form = document.getElementById('editForm');
        form.setAttribute('data-edit-type', type);
        form.setAttribute('data-edit-index', index);
        
        modal.classList.add('active');
    }

    deleteItem(type, index) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.data[type].splice(index, 1);
            this.saveData(type);
            this.loadSectionContent(this.currentSection);
            this.updateMainWebsite();
        }
    }

    handleFormSubmit() {
        const form = document.getElementById('editForm');
        const formData = new FormData(form);
        const data = {};

        // Process form data
        for (let [key, value] of formData.entries()) {
            if (form.querySelector(`[name="${key}"]`).type === 'file') {
                // Handle file upload (convert to base64 for demo)
                const file = value;
                if (file.size > 0) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        data[key] = e.target.result;
                        this.saveFormData(data, form);
                    };
                    reader.readAsDataURL(file);
                    return;
                }
            } else {
                data[key] = value;
            }
        }

        this.saveFormData(data, form);
    }

    saveFormData(data, form) {
        const editType = form.getAttribute('data-edit-type');
        const editIndex = form.getAttribute('data-edit-index');

        if (editType && editIndex !== null) {
            // Edit existing item
            this.data[editType][editIndex] = { ...this.data[editType][editIndex], ...data };
        } else {
            // Add new item
            data.id = Date.now();
            this.data[this.currentSection].push(data);
        }

        this.saveData(this.currentSection);
        this.closeModal();
        this.loadSectionContent(this.currentSection);
        this.updateMainWebsite();
    }

    updateAboutSection() {
        const formData = new FormData(document.getElementById('aboutForm'));
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (key === 'profileImage' && value.size > 0) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    data.image = e.target.result;
                    this.saveAboutData(data);
                };
                reader.readAsDataURL(value);
                return;
            } else if (key !== 'profileImage') {
                data[key.replace('profile', '').toLowerCase()] = value;
            }
        }

        this.saveAboutData(data);
    }

    saveAboutData(data) {
        this.data.about = { ...this.data.about, ...data };
        this.saveData('about');
        
        // Trigger update for about section
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'about',
            newValue: JSON.stringify(this.data.about)
        }));
        
        alert('About section updated successfully!');
    }

    updateContactSection() {
        const formData = new FormData(document.getElementById('contactForm'));
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key.replace('contact', '').toLowerCase()] = value;
        }

        this.data.contact = { ...this.data.contact, ...data };
        this.saveData('contact');
        
        // Trigger update for contact section
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'contact',
            newValue: JSON.stringify(this.data.contact)
        }));
        
        alert('Contact information updated successfully!');
    }

    saveData(type) {
        localStorage.setItem(type, JSON.stringify(this.data[type]));
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        document.getElementById('editForm').removeAttribute('data-edit-type');
        document.getElementById('editForm').removeAttribute('data-edit-index');
    }

    updateMainWebsite() {
        // Trigger storage event to update main website
        window.dispatchEvent(new StorageEvent('storage', {
            key: this.currentSection,
            newValue: JSON.stringify(this.data[this.currentSection])
        }));
        
        // Also trigger a custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('adminDataUpdate', {
            detail: { section: this.currentSection, data: this.data[this.currentSection] }
        }));
        
        // Force update main website if it's open in another tab
        if (window.opener) {
            window.opener.postMessage({
                type: 'adminUpdate',
                section: this.currentSection,
                data: this.data[this.currentSection]
            }, '*');
        }
        
        console.log('Main website updated with new data');
    }

    forceImportContent() {
        if (confirm('This will sync all content with the main website. Continue?')) {
            // Clear existing data
            localStorage.removeItem('articles');
            localStorage.removeItem('gallery');
            localStorage.removeItem('research');
            localStorage.removeItem('about');
            localStorage.removeItem('contact');
            
            // Re-initialize data
            this.initializeData();
            
            // Reload all sections
            this.loadDashboard();
            this.loadSectionContent(this.currentSection);
            
            alert('Content synced successfully!');
        }
    }

    clearAllData() {
        if (confirm('This will clear ALL data. Are you sure?')) {
            localStorage.clear();
            location.reload();
        }
    }

    // Dynamic form generation
    generateFormFields(sectionType, existingData = null) {
        const structure = this.contentStructure[sectionType];
        if (!structure) return '';

        return structure.fields.map(field => {
            const value = existingData ? (existingData[field.name] || '') : '';
            const requiredAttr = field.required ? 'required' : '';
            
            switch (field.type) {
                case 'text':
                case 'email':
                case 'url':
                case 'date':
                case 'number':
                    return `
                        <div class="form-group">
                            <label>${field.label} ${field.required ? '*' : ''}</label>
                            <input type="${field.type}" name="${field.name}" value="${value}" ${requiredAttr} placeholder="${field.label}">
                        </div>
                    `;
                
                case 'textarea':
                    return `
                        <div class="form-group">
                            <label>${field.label} ${field.required ? '*' : ''}</label>
                            <textarea name="${field.name}" rows="${field.rows || 3}" ${requiredAttr} placeholder="${field.label}">${value}</textarea>
                        </div>
                    `;
                
                case 'file':
                    return `
                        <div class="form-group">
                            <label>${field.label} ${field.required ? '*' : ''}</label>
                            <input type="file" name="${field.name}" accept="${field.accept || '*'}" ${requiredAttr}>
                            ${existingData && existingData[field.name] ? `<p class="current-file">Current: ${existingData[field.name]}</p>` : ''}
                        </div>
                    `;
                
                case 'select':
                    const options = field.options.map(option => 
                        `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`
                    ).join('');
                    return `
                        <div class="form-group">
                            <label>${field.label} ${field.required ? '*' : ''}</label>
                            <select name="${field.name}" ${requiredAttr}>
                                <option value="">Select ${field.label}</option>
                                ${options}
                            </select>
                        </div>
                    `;
                
                default:
                    return '';
            }
        }).join('');
    }

    // Dynamic table generation
    generateTableHeaders(sectionType) {
        const structure = this.contentStructure[sectionType];
        if (!structure) return '';

        const headers = structure.displayFields.map(field => {
            const fieldConfig = structure.fields.find(f => f.name === field);
            return `<th>${fieldConfig ? fieldConfig.label : field}</th>`;
        }).join('');
        
        return headers + '<th>Actions</th>';
    }

    generateTableRow(item, index, sectionType) {
        const structure = this.contentStructure[sectionType];
        if (!structure) return '';

        const cells = structure.displayFields.map(field => {
            const value = item[field] || '';
            
            if (field === 'image' && value) {
                return `<td><img src="${value}" alt="Preview" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>`;
            } else if (field.includes('Date') && value) {
                return `<td>${new Date(value).toLocaleDateString()}</td>`;
            } else if (typeof value === 'string' && value.length > 50) {
                return `<td>${value.substring(0, 50)}...</td>`;
            } else {
                return `<td>${value}</td>`;
            }
        }).join('');

        return `
            ${cells}
            <td>
                <button class="btn btn-sm btn-primary" onclick="admin.editItem('${sectionType}', ${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="admin.deleteItem('${sectionType}', ${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
    }
}

// Initialize admin panel
const admin = new AdminPanel();

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
}

// Add mobile menu functionality
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !toggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Show/hide mobile menu toggle based on screen size
function checkScreenSize() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (window.innerWidth <= 768) {
        toggle.style.display = 'block';
    } else {
        toggle.style.display = 'none';
        document.querySelector('.sidebar').classList.remove('active');
    }
}

window.addEventListener('resize', checkScreenSize);
document.addEventListener('DOMContentLoaded', checkScreenSize);




