// Browser Console Migration Script
// Copy and paste this entire script into your browser console on any webpage

// First, load Firebase from CDN
(async () => {
    // Load Firebase scripts
    const firebaseApp = await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js');
    const firebaseFirestore = await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js');

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDwcZ_AczUMFMpAqRnu2B7IqtLY394s9T0",
        authDomain: "portfolio-66a8e.firebaseapp.com",
        projectId: "portfolio-66a8e",
        storageBucket: "portfolio-66a8e.firebasestorage.app",
        messagingSenderId: "132640135889",
        appId: "1:132640135889:web:48ef29cf428cb46521c3f0",
        measurementId: "G-Q8ZEVD1RGC"
    };

    const app = firebaseApp.initializeApp(firebaseConfig);
    const db = firebaseFirestore.getFirestore(app);

    // Your original portfolio data
    const originalData = {
        settings: {
            isSplash: false,
        },

        seo: {
            title: "Sai Ananthula's Portfolio",
            description: "A dynamic and passionate innovator, always eager to tackle end-to-end projects that build sustainable and scalable social and technical systems, driving meaningful impact and positive change.",
            og: {
                title: "Sai Ananthula Portfolio",
                type: "website",
                url: "http://saianantula.com/",
            },
        },

        greeting: {
            title: "Sai Kowshik Ananthula",
            logo_name: "Sai Kowshik Ananthula",
            nickname: "Sai",
            runnerText: [
                "A dynamic and passionate innovator 🙋",
                "Senior Software Engineer @IBM 👨‍💻",
                "Master of Computer Science Graduate from GSU 👨‍🎓",
                "Open Source Contributor 💻",
                "Competitive Gamer 🎮",
            ],
            portfolio_repository: "https://github.com/Saikowshik007/saikowshik007.github.io",
            githubProfile: "https://github.com/Saikowshik007",
        },

        socialMediaLinks: [
            {
                name: "Github",
                link: "https://github.com/Saikowshik007",
                fontAwesomeIcon: "fa-github",
                backgroundColor: "#181717",
                order: 1,
            },
            {
                name: "LinkedIn",
                link: "https://www.linkedin.com/in/ask7",
                fontAwesomeIcon: "fa-linkedin-in",
                backgroundColor: "#0077B5",
                order: 2,
            },
            {
                name: "Mail",
                link: "mailto:askowshik@outlook.com",
                fontAwesomeIcon: "fa-google",
                backgroundColor: "#D14836",
                order: 3,
            },
        ],

        skills: {
            data: [
                {
                    title: "Full Stack Development",
                    fileName: "FullStackImg",
                    order: 1,
                    skills: [
                        "⚡ Utilize my expertise in Java, Python, React.js, and Spring Boot to develop robust backend services, create responsive web applications, and build solutions that cater to business needs.",
                        "⚡ With my proficiency in AWS tech stack, and databases, I design and implement scalable cloud solutions, optimize performance, and ensure reliability of infrastructure for various applications.",
                        "⚡ I love solving Leetcode problems and had solved 320+ problems",
                    ],
                    softwareSkills: [
                        {
                            skillName: "Java",
                            fontAwesomeClassname: "logos:java",
                            style: { color: "#E34F26" },
                        },
                        {
                            skillName: "Python",
                            fontAwesomeClassname: "logos-python",
                        },
                        {
                            skillName: "SpringBoot",
                            fontAwesomeClassname: "simple-icons:springboot",
                        },
                        {
                            skillName: "JavaScript",
                            fontAwesomeClassname: "simple-icons:javascript",
                            style: {
                                backgroundColor: "#000000",
                                color: "#F7DF1E",
                            },
                        },
                        {
                            skillName: "ReactJS",
                            fontAwesomeClassname: "simple-icons:react",
                            style: { color: "#61DAFB" },
                        },
                        {
                            skillName: "Airflow",
                            fontAwesomeClassname: "simple-icons:apacheairflow",
                            style: { color: "#339933" },
                        },
                        {
                            skillName: "OpenShift",
                            fontAwesomeClassname: "simple-icons:redhatopenshift",
                            style: { color: "#CB3837" },
                        },
                        {
                            skillName: "Postman",
                            fontAwesomeClassname: "simple-icons:postman",
                            style: { color: "#EF5B25" },
                        },
                        {
                            skillName: "Elastic Search",
                            fontAwesomeClassname: "simple-icons:elastic",
                            style: { color: "#663399" },
                        },
                        {
                            skillName: "Gradle",
                            fontAwesomeClassname: "simple-icons:gradle",
                            style: { color: "#02569B" },
                        },
                        {
                            skillName: "Git",
                            fontAwesomeClassname: "simple-icons:git",
                            style: { color: "#02569B" },
                        },
                        {
                            skillName: "Android",
                            fontAwesomeClassname: "simple-icons:android",
                            style: { color: "#add827" },
                        },
                    ],
                },
                {
                    title: "Infra-Architecture and Cloud",
                    fileName: "CloudInfraImg",
                    order: 2,
                    skills: [
                        "⚡ Owned Openshift-OCP dev and QA environments, fixing bugs , and enhancements, improving environment reliability for India and US teams in IBM.",
                        "⚡ Implemented CI/CD pipelines using Jenkins, enabling faster deployment cycles and reducing operational costs through efficient cloud-based solutions on AWS.",
                        "⚡ Developed a highly efficient, low-latency client transaction pipeline using Airflow, Kubernetes, Kafka, and Docker, significantly improving batch-processing efficiency",
                    ],
                    softwareSkills: [
                        {
                            skillName: "AWS",
                            fontAwesomeClassname: "simple-icons:amazonaws",
                            style: { color: "#FF9900" },
                        },
                        {
                            skillName: "PostgreSQL",
                            fontAwesomeClassname: "logos:postgresql",
                            style: { color: "#336791" },
                        },
                        {
                            skillName: "Docker",
                            fontAwesomeClassname: "simple-icons:docker",
                            style: { color: "#1488C6" },
                        },
                        {
                            skillName: "Kubernetes",
                            fontAwesomeClassname: "logos:kubernetes",
                            style: { color: "#326CE5" },
                        },
                        {
                            skillName: "Jenkins",
                            fontAwesomeClassname: "logos:jenkins",
                            style: { color: "#326CE5" },
                        },
                        {
                            skillName: "OpenShift",
                            fontAwesomeClassname: "simple-icons:redhatopenshift",
                            style: { color: "#CB3837" },
                        },
                        {
                            skillName: "Linux",
                            fontAwesomeClassname: "simple-icons:linux",
                            style: { color: "#ffcc33" },
                        },
                    ],
                },
            ],
        },

        competitiveSites: {
            competitiveSites: [
                {
                    siteName: "LeetCode",
                    iconifyClassname: "simple-icons:leetcode",
                    style: { color: "#F79F1B" },
                    profileLink: "https://leetcode.com/u/saikowshik007/",
                    order: 1,
                },
                {
                    siteName: "HackerRank",
                    iconifyClassname: "simple-icons:hackerrank",
                    style: { color: "#2EC866" },
                    profileLink: "https://www.hackerrank.com/profile/saikowshik",
                    order: 2,
                },
            ],
        },

        degrees: {
            degrees: [
                {
                    title: "Georgia State University, Atlanta",
                    subtitle: "M.S. in Computer Science",
                    logo_path: "gsu.png",
                    alt_name: "Georgia State University, Atlanta",
                    duration: "2021 - 2023",
                    startYear: 2021,
                    endYear: 2023,
                    descriptions: [
                        "🏆 Awarded with full tuition waiver for masters degree based on merit.",
                        "🏆 An active member of MORSE Studio which conducts experiments on real-world scenarios.",
                    ],
                    website_link: "https://www.gsu.edu/",
                },
                {
                    title: "Gandhi Institute of Science and Technology, Visakhapatnam",
                    subtitle: "B.Tech. in Computer Science",
                    logo_path: "gitam.png",
                    alt_name: "GITAM Visakhapatnam",
                    duration: "2017 - 2021",
                    startYear: 2017,
                    endYear: 2021,
                    descriptions: [
                        "🏆 I have studied core software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
                        "🏆 Apart from this, I have done courses on Deep Learning, Android App Development, Python programming and Full Stack Development.",
                        "🏆 I was awarded 'Over Achiever' for Merit and awarded with scholarship which is given to top 1% of students in college worth 10k rupees.",
                    ],
                    website_link: "https://www.gitam.edu/",
                },
            ],
        },

        certifications: {
            certifications: [
                {
                    title: "Enterprise Design Thinking Practitioner",
                    subtitle: "- IBM",
                    logo_path: "ibm_logo.png",
                    certificate_link: "https://www.credly.com/badges/f74735a5-60d3-4386-9884-ee59349032b9/public_url",
                    alt_name: "IBM",
                    color_code: "#D83B0199",
                    date: "2024-01-01",
                },
                {
                    title: "Agile Explorer",
                    subtitle: "- IBM",
                    logo_path: "ibm_logo.png",
                    certificate_link: "https://www.credly.com/badges/3177fef3-d6bd-477f-bfff-ecd888fd723a/public_url",
                    alt_name: "GCP",
                    color_code: "#4285F499",
                    date: "2024-01-01",
                },
                {
                    title: "Trustworthy AI and AI Ethics",
                    subtitle: "- IBM",
                    logo_path: "ibm_logo.png",
                    certificate_link: "https://www.credly.com/badges/4e978c70-512d-4e61-8c6e-bfeaad370906/public_url",
                    alt_name: "Ai",
                    color_code: "#FFBB0099",
                    date: "2024-01-01",
                },
                {
                    title: "Clean Code",
                    subtitle: "- Udemy",
                    logo_path: "udemy.png",
                    certificate_link: "https://www.udemy.com/certificate/UC-733f7b7f-0e3c-42c3-b924-32176b8d0fcc/",
                    alt_name: "GCP",
                    color_code: "#4285F499",
                    date: "2023-01-01",
                },
                {
                    title: "Machine Learning",
                    subtitle: "- Andrew Ng",
                    logo_path: "stanford_logo.png",
                    certificate_link: "https://www.coursera.org/account/accomplishments/verify/WHR8V4TPWKZG",
                    alt_name: "Stanford University",
                    color_code: "#8C151599",
                    date: "2023-01-01",
                },
                {
                    title: "Deep Learning Specialization",
                    subtitle: "- Andrew Ng",
                    logo_path: "deeplearning_ai_logo.png",
                    certificate_link: "https://www.coursera.org/account/accomplishments/specialization/6P7P6NABEVC9",
                    alt_name: "deeplearning.ai",
                    color_code: "#00000099",
                    date: "2023-01-01",
                },
                {
                    title: "Android App Development",
                    subtitle: "- Vanderbilt University",
                    logo_path: "vanderbilt.png",
                    certificate_link: "https://www.coursera.org/account/accomplishments/specialization/2XLHXHUM9PE2",
                    alt_name: "Android",
                    color_code: "#0C9D5899",
                    date: "2022-01-01",
                },
                {
                    title: "Python 3 Specialization",
                    subtitle: "- University of Michigan",
                    logo_path: "michigan.png",
                    certificate_link: "https://www.coursera.org/account/accomplishments/specialization/NSFMKMEKDNZR",
                    alt_name: "IBM",
                    color_code: "#1F70C199",
                    date: "2022-01-01",
                },
                {
                    title: "Problem Solving (Basic)",
                    subtitle: "- HackerRank",
                    logo_path: "hackerrank.png",
                    certificate_link: "https://www.hackerrank.com/certificates/84612ed39039",
                    alt_name: "Hacker rank",
                    color_code: "#D83B0199",
                    date: "2022-01-01",
                },
                {
                    title: "Problem Solving (Intermediate)",
                    subtitle: "- HackerRank",
                    logo_path: "hackerrank.png",
                    certificate_link: "https://www.hackerrank.com/certificates/17a9b3979fbb",
                    alt_name: "IBM",
                    color_code: "#1F70C199",
                    date: "2022-01-01",
                },
                {
                    title: "Java (Basic)",
                    subtitle: "- HackerRank",
                    logo_path: "hackerrank.png",
                    certificate_link: "https://www.hackerrank.com/certificates/2534850ea350",
                    alt_name: "Google",
                    color_code: "#0C9D5899",
                    date: "2021-01-01",
                },
                {
                    title: "Java (Intermediate)",
                    subtitle: "- HackerRank",
                    logo_path: "hackerrank.png",
                    certificate_link: "https://www.hackerrank.com/certificates/9641d699bd0a",
                    alt_name: "deeplearning.ai",
                    color_code: "#00000099",
                    date: "2021-01-01",
                },
            ],
        },

        experience: {
            title: "Professional Experience",
            subtitle: "Full-time, Internship and Assistantship",
            description: [
                "Software Engineer @IBM working on cloud and cybersecurity products.",
                "Ex-Software Engineer @Global Payments, developed enterprise applications and transaction pipelines.",
                "Graduate Research Assistant @GSU, published in IEEE on collision detection algorithms.",
                "Graduate Teaching Assistant @GSU for Computer Science courses.",
            ],
            header_image_path: "experience.svg",
        },

        experienceSections: [
            {
                title: "Full-time",
                work: true,
                order: 1,
                id: "fulltime"
            },
            {
                title: "Internships",
                work: false,
                order: 2,
                id: "internships"
            },
            {
                title: "Research and Teaching",
                work: false,
                order: 3,
                id: "research"
            },
        ],

        experiences: [
            {
                title: "Software Engineer",
                company: "International Business Machines (IBM)",
                company_url: "https://www.ibm.com/us-en",
                logo_path: "ibm.png",
                duration: "January 2024 - Present",
                startDate: "2024-01-01",
                location: "Austin, Texas, USA",
                description: [
                    "Led OCP development and QA environments, implementing automated testing frameworks and CI/CD pipelines that improved system reliability by 40% across US and India teams.",
                    "Upgraded Maas360vpn from 2.5.6 to 2.6.10, enhancing security for enterprise clients including NASA and Pfizer, while optimizing tunnel speed by 20% through MTU parameter optimization.",
                    "Designed and implemented distributed notification system using AWS IoT Core, Apache Kafka, and Spring Boot microservices, achieving 30% improvement in device verification efficiency.",
                    "Optimized system architecture using shared subscription patterns in distributed systems, reducing status update processing load by 50%.",
                ],
                color: "#000000",
                sectionId: "fulltime",
            },
            {
                title: "Software Engineer",
                company: "Global Payments Inc",
                company_url: "https://www.globalpayments.com/",
                logo_path: "global-payments.png",
                duration: "January 2023 - December 2023",
                startDate: "2023-01-01",
                location: "Columbus, Georgia",
                description: [
                    "Architected enterprise applications using Java/Spring Boot microservices, implementing RESTful APIs that improved data processing speed by 30% and system efficiency by 50%.",
                    "Developed high-performance transaction pipeline using Apache Airflow, Kubernetes, Kafka, and Docker, achieving 60% increase in batch-processing throughput.",
                    "Implemented comprehensive cloud infrastructure on AWS (EC2, S3, Lambda) with automated CI/CD pipelines using Jenkins, reducing operational costs by 30% and improving deployment speed by 40%.",
                ],
                color: "#0879bf",
                sectionId: "fulltime",
            },
            {
                title: "Software Engineer Intern",
                company: "Global Payments Inc",
                company_url: "https://www.globalpayments.com/",
                logo_path: "global-payments.png",
                duration: "June 2022 - August 2022",
                startDate: "2022-06-01",
                location: "Alpharetta, Georgia",
                description: [
                    "Engineered high-performance REST APIs using Spring Boot microservices and Java features (Collections, Multi-Threading, JDBC), improving system efficiency by 60%.",
                    "Developed and optimized Correspondence API with comprehensive unit and integration testing using JUnit and Mockito, reducing lookup time by 40%.",
                ],
                color: "#000000",
                sectionId: "internships",
            },
            {
                title: "Graduate Software Engineer (Research)",
                company: "Georgia State University",
                company_url: "https://www.gsu.edu/",
                logo_path: "gsu.png",
                duration: "August 2021 - May 2023",
                startDate: "2021-08-01",
                location: "Atlanta, Georgia",
                description: [
                    "Published IEEE paper on collision detection algorithm using TensorFlow and computer vision, achieving 80% improved accuracy over baseline models and generating $1.6M in research funding.",
                    "Developed scalable IoT system using Python, MQTT, and TensorFlow for real-time object detection, reducing system power consumption by 30%.",
                    "Created automated grading system using Python and REST APIs, reducing evaluation time by 95% and improving faculty productivity.",
                ],
                color: "#000000",
                sectionId: "research",
            },
        ],

        projectsHeader: {
            title: "Projects",
            description: "My projects leverage a wide range of cutting-edge technologies. I specialize in creating software engineering solutions and deploying and automating them on cloud infrastructure.",
            avatar_image_path: "projects_image.svg",
        },

        publicationsHeader: {
            title: "Publications",
            description: "Some of my published Articles, Blogs and Research.",
            avatar_image_path: "projects_image.svg",
        },

        publications: {
            data: [],
        },

        contactPageData: {
            contactSection: {
                title: "Contact Me",
                profile_image_path: "sai.png",
                description: "I am available on almost every social media platform and would be delighted to connect with you. Feel free to send me a message, and I will respond within 24 hours. I specialize in React, Android, Cloud, and Open Source Development, and I'm here to assist you with any queries or projects you may have. Looking forward to connecting with you!",
            },
            addressSection: {
                title: "Address",
                subtitle: "Wells Branch Pkwy, Austin, TX, USA 78728",
                locality: "Austin",
                country: "USA",
                region: "Texas",
                postalCode: "78728",
                streetAddress: "Wells Branch Pkwy",
                avatar_image_path: "address_image.svg",
                location_map_link: "https://maps.app.goo.gl/KZTYLybDGVZWeKns5",
            },
            phoneSection: {
                title: "",
                subtitle: "",
            },
        },
    };

    // Migration class for browser console
    class BrowserFirebaseMigration {
        constructor(db, firestore) {
            this.db = db;
            this.firestore = firestore;
        }

        async migratePortfolioData() {
            console.log('🚀 Starting Firebase migration...');

            try {
                // 1. Add Google Drive configuration (REPLACE WITH YOUR ACTUAL VALUES)
                console.log('📝 Adding Google Drive configuration...');
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'driveConfig'), {
                    apiKey: "YOUR_GOOGLE_DRIVE_API_KEY", // Replace with your actual API key
                    resumeFolderId: "YOUR_RESUME_FOLDER_ID" // Replace with your actual folder ID
                });

                // 2. Migrate single documents
                console.log('📄 Migrating portfolio documents...');
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'settings'), originalData.settings);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'seo'), originalData.seo);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'greeting'), originalData.greeting);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'experience'), originalData.experience);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'projectsHeader'), originalData.projectsHeader);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'publicationsHeader'), originalData.publicationsHeader);
                await this.firestore.setDoc(this.firestore.doc(this.db, 'portfolio', 'contactPageData'), originalData.contactPageData);

                // 3. Migrate social media links
                console.log('🔗 Migrating social media links...');
                for (const link of originalData.socialMediaLinks) {
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'socialMediaLinks'), link);
                }

                // 4. Migrate skills
                console.log('💼 Migrating skills...');
                for (const skill of originalData.skills.data) {
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'skills'), skill);
                }

                // 5. Migrate competitive sites
                console.log('🏆 Migrating competitive sites...');
                for (const site of originalData.competitiveSites.competitiveSites) {
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'competitiveSites'), site);
                }

                // 6. Migrate degrees
                console.log('🎓 Migrating degrees...');
                for (const degree of originalData.degrees.degrees) {
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'degrees'), degree);
                }

                // 7. Migrate certifications
                console.log('📜 Migrating certifications...');
                for (const cert of originalData.certifications.certifications) {
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'certifications'), cert);
                }

                // 8. Migrate experience sections
                console.log('📋 Migrating experience sections...');
                const sectionRefs = {};
                for (const section of originalData.experienceSections) {
                    const docRef = await this.firestore.addDoc(this.firestore.collection(this.db, 'experienceSections'), section);
                    sectionRefs[section.id] = docRef.id;
                }

                // 9. Migrate experiences with section references
                console.log('💼 Migrating experiences...');
                for (const exp of originalData.experiences) {
                    const expWithSectionRef = {
                        ...exp,
                        sectionId: sectionRefs[exp.sectionId] || exp.sectionId
                    };
                    await this.firestore.addDoc(this.firestore.collection(this.db, 'experiences'), expWithSectionRef);
                }

                // 10. Migrate publications (empty for now)
                console.log('📚 Migrating publications...');
                // Publications array is empty, so nothing to migrate

                console.log('✅ Migration completed successfully!');
                console.log('🎉 Your portfolio data has been migrated to Firebase!');
                console.log('📝 Don\'t forget to update the Google Drive API key and folder ID in the driveConfig document');

            } catch (error) {
                console.error('❌ Migration failed:', error);
                throw error;
            }
        }
    }

    // Run the migration
    console.log('🔧 Initializing migration...');
    const migration = new BrowserFirebaseMigration(db, firebaseFirestore);
    await migration.migratePortfolioData();

})().catch(error => {
    console.error('❌ Script execution failed:', error);
});