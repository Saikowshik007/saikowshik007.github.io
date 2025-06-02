// portfolioService.js
import { db } from './firebaseConfig';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';

class GoogleDriveService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.googleapis.com/drive/v3';
    }

    async getResumeLink(folderId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch resume from Google Drive');
            }

            const data = await response.json();

            if (data.files && data.files.length > 0) {
                const resumeFile = data.files[0];
                return `https://drive.google.com/file/d/${resumeFile.id}/view`;
            }

            return null;
        } catch (error) {
            console.error('Error fetching resume from Google Drive:', error);
            return null;
        }
    }

    async getResumeDownloadLink(folderId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch resume from Google Drive');
            }

            const data = await response.json();

            if (data.files && data.files.length > 0) {
                const resumeFile = data.files[0];
                return `${this.baseUrl}/files/${resumeFile.id}?alt=media&key=${this.apiKey}`;
            }

            return null;
        } catch (error) {
            console.error('Error fetching resume download link from Google Drive:', error);
            return null;
        }
    }
}

class PortfolioService {
    constructor() {
        this.googleDriveService = null;
        this.driveConfig = null;
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    async initializeGoogleDrive() {
        if (!this.driveConfig) {
            try {
                const docRef = doc(db, 'portfolio', 'driveConfig');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.driveConfig = docSnap.data();
                    this.googleDriveService = new GoogleDriveService(this.driveConfig.apiKey);
                }
            } catch (error) {
                console.error('Error fetching Google Drive config:', error);
            }
        }
    }

    async getFromCacheOrFetch(key, fetchFunction) {
        const cached = this.cache.get(key);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < this.cacheExpiry) {
            return cached.data;
        }

        const data = await fetchFunction();
        this.cache.set(key, { data, timestamp: now });
        return data;
    }

    async getSettings() {
        return this.getFromCacheOrFetch('settings', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'settings');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }

                // Fallback default
                return { isSplash: false };
            } catch (error) {
                console.error('Error fetching settings:', error);
                return { isSplash: false };
            }
        });
    }

    async getSEO() {
        return this.getFromCacheOrFetch('seo', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'seo');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }

                // Fallback default
                return {
                    title: "Portfolio",
                    description: "Personal Portfolio Website",
                    og: {
                        title: "Portfolio",
                        type: "website",
                        url: "http://localhost:3000/",
                    },
                };
            } catch (error) {
                console.error('Error fetching SEO data:', error);
                return {
                    title: "Portfolio",
                    description: "Personal Portfolio Website",
                    og: {
                        title: "Portfolio",
                        type: "website",
                        url: "http://localhost:3000/",
                    },
                };
            }
        });
    }

    async getGreeting() {
        return this.getFromCacheOrFetch('greeting', async () => {
            try {
                // Initialize Google Drive if not already done
                await this.initializeGoogleDrive();

                const docRef = doc(db, 'portfolio', 'greeting');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const greetingData = docSnap.data();

                    // Get resume link from Google Drive using config from Firebase
                    if (this.googleDriveService && this.driveConfig && this.driveConfig.resumeFolderId) {
                        const resumeLink = await this.googleDriveService.getResumeLink(this.driveConfig.resumeFolderId);
                        if (resumeLink) {
                            greetingData.resumeLink = resumeLink;
                        }
                    }

                    return greetingData;
                }

                return {};
            } catch (error) {
                console.error('Error fetching greeting data:', error);
                return {};
            }
        });
    }

    async getSocialMediaLinks() {
        return this.getFromCacheOrFetch('socialMedia', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'socialMediaLinks'), orderBy('order', 'asc'))
                );

                const links = [];
                querySnapshot.forEach((doc) => {
                    links.push({ id: doc.id, ...doc.data() });
                });

                return links;
            } catch (error) {
                console.error('Error fetching social media links:', error);
                return [];
            }
        });
    }

    async getSkills() {
        return this.getFromCacheOrFetch('skills', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'skills'), orderBy('order', 'asc'))
                );

                const skillsData = [];
                querySnapshot.forEach((doc) => {
                    skillsData.push({ id: doc.id, ...doc.data() });
                });

                return { data: skillsData };
            } catch (error) {
                console.error('Error fetching skills:', error);
                return { data: [] };
            }
        });
    }

    async getCompetitiveSites() {
        return this.getFromCacheOrFetch('competitiveSites', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'competitiveSites'), orderBy('order', 'asc'))
                );

                const sites = [];
                querySnapshot.forEach((doc) => {
                    sites.push({ id: doc.id, ...doc.data() });
                });

                return { competitiveSites: sites };
            } catch (error) {
                console.error('Error fetching competitive sites:', error);
                return { competitiveSites: [] };
            }
        });
    }

    async getDegrees() {
        return this.getFromCacheOrFetch('degrees', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'degrees'), orderBy('startYear', 'desc'))
                );

                const degreesData = [];
                querySnapshot.forEach((doc) => {
                    degreesData.push({ id: doc.id, ...doc.data() });
                });

                return { degrees: degreesData };
            } catch (error) {
                console.error('Error fetching degrees:', error);
                return { degrees: [] };
            }
        });
    }

    async getCertifications() {
        return this.getFromCacheOrFetch('certifications', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'certifications'), orderBy('date', 'desc'))
                );

                const certificationsData = [];
                querySnapshot.forEach((doc) => {
                    certificationsData.push({ id: doc.id, ...doc.data() });
                });

                return { certifications: certificationsData };
            } catch (error) {
                console.error('Error fetching certifications:', error);
                return { certifications: [] };
            }
        });
    }

    async getExperience() {
        return this.getFromCacheOrFetch('experience', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'experience');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const experienceData = docSnap.data();

                    // Fetch experience sections
                    const sectionsSnapshot = await getDocs(
                        query(collection(db, 'experienceSections'), orderBy('order', 'asc'))
                    );

                    const sections = [];
                    for (const sectionDoc of sectionsSnapshot.docs) {
                        const sectionData = sectionDoc.data();

                        // Fetch experiences for this section
                        const experiencesSnapshot = await getDocs(
                            query(
                                collection(db, 'experiences'),
                                orderBy('startDate', 'desc')
                            )
                        );

                        const experiences = [];
                        experiencesSnapshot.forEach((expDoc) => {
                            const expData = expDoc.data();
                            if (expData.sectionId === sectionDoc.id) {
                                experiences.push({ id: expDoc.id, ...expData });
                            }
                        });

                        sections.push({
                            id: sectionDoc.id,
                            ...sectionData,
                            experiences
                        });
                    }

                    return {
                        ...experienceData,
                        sections
                    };
                }

                return {};
            } catch (error) {
                console.error('Error fetching experience data:', error);
                return {};
            }
        });
    }

    async getProjectsHeader() {
        return this.getFromCacheOrFetch('projectsHeader', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'projectsHeader');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }

                return {};
            } catch (error) {
                console.error('Error fetching projects header:', error);
                return {};
            }
        });
    }

    async getPublicationsHeader() {
        return this.getFromCacheOrFetch('publicationsHeader', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'publicationsHeader');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }

                return {};
            } catch (error) {
                console.error('Error fetching publications header:', error);
                return {};
            }
        });
    }

    async getPublications() {
        return this.getFromCacheOrFetch('publications', async () => {
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, 'publications'), orderBy('date', 'desc'))
                );

                const publicationsData = [];
                querySnapshot.forEach((doc) => {
                    publicationsData.push({ id: doc.id, ...doc.data() });
                });

                return { data: publicationsData };
            } catch (error) {
                console.error('Error fetching publications:', error);
                return { data: [] };
            }
        });
    }

    async getContactPageData() {
        return this.getFromCacheOrFetch('contactPageData', async () => {
            try {
                const docRef = doc(db, 'portfolio', 'contactPageData');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }

                return {};
            } catch (error) {
                console.error('Error fetching contact page data:', error);
                return {};
            }
        });
    }

    // Method to get all portfolio data at once
    async getAllPortfolioData() {
        try {
            const [
                settings,
                seo,
                greeting,
                socialMediaLinks,
                skills,
                competitiveSites,
                degrees,
                certifications,
                experience,
                projectsHeader,
                publicationsHeader,
                publications,
                contactPageData
            ] = await Promise.all([
                this.getSettings(),
                this.getSEO(),
                this.getGreeting(),
                this.getSocialMediaLinks(),
                this.getSkills(),
                this.getCompetitiveSites(),
                this.getDegrees(),
                this.getCertifications(),
                this.getExperience(),
                this.getProjectsHeader(),
                this.getPublicationsHeader(),
                this.getPublications(),
                this.getContactPageData()
            ]);

            return {
                settings,
                seo,
                greeting,
                socialMediaLinks,
                skills,
                competitiveSites,
                degrees,
                certifications,
                experience,
                projectsHeader,
                publicationsHeader,
                publications,
                contactPageData
            };
        } catch (error) {
            console.error('Error fetching all portfolio data:', error);
            throw error;
        }
    }

    // Clear cache method
    clearCache() {
        this.cache.clear();
    }
}

export default PortfolioService;