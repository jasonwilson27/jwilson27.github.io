// js/main.js - This will render your resume
document.addEventListener('DOMContentLoaded', function() {
    renderResume(resumeData);
});

function renderResume(data) {
    const container = document.getElementById('resume-container');
    
    // Header section
    const header = document.createElement('div');
    header.className = 'resume-header';
    
    if (data.basics.image) {
        const img = document.createElement('img');
        img.src = data.basics.image;
        img.alt = data.basics.name;
        img.className = 'profile-pic';
        header.appendChild(img);
    }
    
    const name = document.createElement('h1');
    name.textContent = data.basics.name;
    header.appendChild(name);
    
    const label = document.createElement('h2');
    label.textContent = data.basics.label;
    header.appendChild(label);
    
    // Basic info
    const basicInfo = document.createElement('div');
    basicInfo.className = 'basics-info';
    
    if (data.basics.email) {
        const email = document.createElement('p');
        email.innerHTML = `<i class="fa fa-envelope"></i> <a href="mailto:${data.basics.email}">${data.basics.email}</a>`;
        basicInfo.appendChild(email);
    }
    
    if (data.basics.phone) {
        const phone = document.createElement('p');
        phone.innerHTML = `<i class="fa fa-phone"></i> ${data.basics.phone}`;
        basicInfo.appendChild(phone);
    }
    
    if (data.basics.url) {
        const website = document.createElement('p');
        website.innerHTML = `<i class="fa fa-globe"></i> <a href="${data.basics.url}" target="_blank">${data.basics.url}</a>`;
        basicInfo.appendChild(website);
    }
    
    if (data.basics.location) {
        const location = document.createElement('p');
        const locationText = [
            data.basics.location.address,
            data.basics.location.city,
            data.basics.location.region,
            data.basics.location.postalCode,
            data.basics.location.countryCode
        ].filter(Boolean).join(', ');
        
        location.innerHTML = `<i class="fa fa-map-marker"></i> ${locationText}`;
        basicInfo.appendChild(location);
    }
    
    header.appendChild(basicInfo);
    
    // Social profiles
    if (data.basics.profiles && data.basics.profiles.length > 0) {
        const socialLinks = document.createElement('div');
        socialLinks.className = 'social-links';
        
        data.basics.profiles.forEach(profile => {
            const link = document.createElement('a');
            link.href = profile.url;
            link.target = '_blank';
            link.className = 'social-link';
            
            let iconClass = 'fa-link';
            
            switch (profile.network.toLowerCase()) {
                case 'linkedin':
                    iconClass = 'fa-linkedin-square';
                    break;
                case 'github':
                    iconClass = 'fa-github';
                    break;
                case 'twitter':
                    iconClass = 'fa-twitter';
                    break;
                case 'facebook':
                    iconClass = 'fa-facebook-square';
                    break;
                case 'instagram':
                    iconClass = 'fa-instagram';
                    break;
            }
            
            link.innerHTML = `<i class="fa ${iconClass}"></i>`;
            link.title = profile.network;
            
            socialLinks.appendChild(link);
        });
        
        header.appendChild(socialLinks);
    }
    
    container.appendChild(header);
    
    // Summary
    if (data.basics.summary) {
        const summarySection = createSection('About Me');
        
        const summary = document.createElement('p');
        summary.textContent = data.basics.summary;
        summarySection.appendChild(summary);
        
        container.appendChild(summarySection);
    }
    
    // Work Experience
    if (data.work && data.work.length > 0) {
        const workSection = createSection('Work Experience');
        
        data.work.forEach(job => {
            const jobDiv = document.createElement('div');
            jobDiv.className = 'job';
            
            const jobHeader = document.createElement('div');
            jobHeader.className = 'job-header';
            
            const company = document.createElement('div');
            company.className = 'job-company';
            
            if (job.website) {
                company.innerHTML = `<a href="${job.website}" target="_blank">${job.company} <i class="fa fa-external-link"></i></a>`;
            } else {
                company.textContent = job.company;
            }
            
            jobHeader.appendChild(company);
            
            const position = document.createElement('div');
            position.className = 'job-position';
            position.textContent = job.position;
            jobHeader.appendChild(position);
            
            const dates = document.createElement('div');
            dates.className = 'job-date';
            dates.textContent = `${formatDate(job.startDate)} - ${job.endDate === 'Present' ? 'Present' : formatDate(job.endDate)}`;
            jobHeader.appendChild(dates);
            
            jobDiv.appendChild(jobHeader);
            
            if (job.summary) {
                const summary = document.createElement('div');
                summary.className = 'job-summary';
                summary.textContent = job.summary;
                jobDiv.appendChild(summary);
            }
            
            if (job.highlights && job.highlights.length > 0) {
                const highlights = document.createElement('ul');
                highlights.className = 'job-highlights';
                
                job.highlights.forEach(highlight => {
                    const item = document.createElement('li');
                    item.textContent = highlight;
                    highlights.appendChild(item);
                });
                
                jobDiv.appendChild(highlights);
            }
            
            workSection.appendChild(jobDiv);
        });
        
        container.appendChild(workSection);
    }
    
    // Education
    if (data.education && data.education.length > 0) {
        const educationSection = createSection('Education');
        
        data.education.forEach(edu => {
            const eduDiv = document.createElement('div');
            eduDiv.className = 'education';
            
            const eduHeader = document.createElement('div');
            eduHeader.className = 'education-header';
            
            const institution = document.createElement('div');
            institution.className = 'education-institution';
            institution.textContent = edu.institution;
            eduHeader.appendChild(institution);
            
            const area = document.createElement('div');
            area.className = 'education-area';
            area.textContent = `${edu.studyType} in ${edu.area}`;
            eduHeader.appendChild(area);
            
            const dates = document.createElement('div');
            dates.className = 'education-date';
            dates.textContent = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
            eduHeader.appendChild(dates);
            
            eduDiv.appendChild(eduHeader);
            
            if (edu.gpa) {
                const gpa = document.createElement('div');
                gpa.className = 'education-gpa';
                gpa.textContent = `GPA: ${edu.gpa}`;
                eduDiv.appendChild(gpa);
            }
            
            if (edu.courses && edu.courses.length > 0) {
                const coursesTitle = document.createElement('div');
                coursesTitle.className = 'education-courses-title';
                coursesTitle.textContent = 'Relevant Courses:';
                eduDiv.appendChild(coursesTitle);
                
                const courses = document.createElement('ul');
                courses.className = 'education-courses';
                
                edu.courses.forEach(course => {
                    const item = document.createElement('li');
                    item.textContent = course;
                    courses.appendChild(item);
                });
                
                eduDiv.appendChild(courses);
            }
            
            educationSection.appendChild(eduDiv);
        });
        
        container.appendChild(educationSection);
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
        const skillsSection = createSection('Skills');
        
        data.skills.forEach(skillGroup => {
            const group = document.createElement('div');
            group.className = 'skill-group';
            
            const groupName = document.createElement('div');
            groupName.className = 'skill-group-name';
            groupName.textContent = skillGroup.name;
            group.appendChild(groupName);
            
            if (skillGroup.keywords && skillGroup.keywords.length > 0) {
                const skillList = document.createElement('ul');
                skillList.className = 'skill-list';
                
                skillGroup.keywords.forEach(skill => {
                    const item = document.createElement('li');
                    item.className = 'skill-item';
                    item.textContent = skill;
                    skillList.appendChild(item);
                });
                
                group.appendChild(skillList);
            }
            
            skillsSection.appendChild(group);
        });
        
        container.appendChild(skillsSection);
    }
    
    // Languages
    if (data.languages && data.languages.length > 0) {
        const languagesSection = createSection('Languages');
        
        const languagesList = document.createElement('ul');
        languagesList.className = 'languages-list';
        
        data.languages.forEach(lang => {
            const item = document.createElement('li');
            item.textContent = `${lang.language} (${lang.fluency})`;
            languagesList.appendChild(item);
        });
        
        languagesSection.appendChild(languagesList);
        container.appendChild(languagesSection);
    }
    
    // Projects
    if (data.projects && data.projects.length > 0) {
        const projectsSection = createSection('Projects');
        
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            
            const projectHeader = document.createElement('div');
            projectHeader.className = 'project-header';
            
            const projectName = document.createElement('div');
            projectName.className = 'project-name';
            
            if (project.url) {
                projectName.innerHTML = `<a href="${project.url}" target="_blank">${project.name} <i class="fa fa-external-link"></i></a>`;
            } else {
                projectName.textContent = project.name;
            }
            
            projectHeader.appendChild(projectName);
            
            if (project.startDate || project.endDate) {
                const dates = document.createElement('div');
                dates.className = 'project-date';
                dates.textContent = `${project.startDate ? formatDate(project.startDate) : ''} - ${project.endDate ? formatDate(project.endDate) : 'Present'}`;
                projectHeader.appendChild(dates);
            }
            
            projectDiv.appendChild(projectHeader);
            
            if (project.description) {
                const description = document.createElement('div');
                description.className = 'project-description';
                description.textContent = project.description;
                projectDiv.appendChild(description);
            }
            
            if (project.highlights && project.highlights.length > 0) {
                const highlights = document.createElement('ul');
                highlights.className = 'project-highlights';
                
                project.highlights.forEach(highlight => {
                    const item = document.createElement('li');
                    item.textContent = highlight;
                    highlights.appendChild(item);
                });
                
                projectDiv.appendChild(highlights);
            }
            
            if (project.roles && project.roles.length > 0) {
                const roles = document.createElement('div');
                roles.className = 'project-roles';
                roles.textContent = `Roles: ${project.roles.join(', ')}`;
                projectDiv.appendChild(roles);
            }
            
            if (project.keywords && project.keywords.length > 0) {
                const keywords = document.createElement('div');
                keywords.className = 'project-keywords';
                keywords.textContent = `Technologies: ${project.keywords.join(', ')}`;
                projectDiv.appendChild(keywords);
            }
            
            projectsSection.appendChild(projectDiv);
        });
        
        container.appendChild(projectsSection);
    }
}

function createSection(title) {
    const section = document.createElement('div');
    section.className = 'section';
    
    const header = document.createElement('h3');
    header.className = 'section-header';
    header.textContent = title;
    section.appendChild(header);
    
    const content = document.createElement('div');
    content.className = 'section-content';
    section.appendChild(content);
    
    return content;
}

function formatDate(dateString) {
    if (!dateString) return '';
    
    const parts = dateString.split('-');
    if (parts.length < 2) return dateString;
    
    const year = parts[0];
    const month = parseInt(parts[1]);
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[month - 1]} ${year}`;
}
