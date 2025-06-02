// portfolio.js - Safe version with better null checking
import PortfolioService from './portfolioService';

// Initialize the service
const portfolioService = new PortfolioService();

// Create reactive data objects
let portfolioData = {
  settings: { isSplash: false },
  seo: {
    title: "Portfolio",
    description: "Personal Portfolio Website",
    og: { title: "Portfolio", type: "website", url: "" }
  },
  greeting: {
    title: "",
    logo_name: "",
    nickname: "",
    runnerText: [],
    resumeLink: "",
    portfolio_repository: "",
    githubProfile: ""
  },
  socialMediaLinks: [],
  skills: { data: [] },
  competitiveSites: { competitiveSites: [] },
  degrees: { degrees: [] },
  certifications: { certifications: [] },
  experience: {
    title: "Experience",
    subtitle: "",
    description: [],
    sections: [],
    header_image_path: ""
  },
  projectsHeader: {
    title: "Projects",
    description: "",
    avatar_image_path: ""
  },
  publicationsHeader: {
    title: "Publications",
    description: "",
    avatar_image_path: ""
  },
  publications: { data: [] },
  projects: { data: [] },
  contactPageData: {
    contactSection: {
      title: "Contact Me",
      profile_image_path: "",
      description: ""
    },
    addressSection: {
      title: "Address",
      subtitle: "",
      locality: "",
      country: "",
      region: "",
      postalCode: "",
      streetAddress: "",
      avatar_image_path: "",
      location_map_link: ""
    },
    phoneSection: {
      title: "",
      subtitle: ""
    }
  }
};

// Loading state
let isDataLoaded = false;
let loadingPromise = null;

// Initialize data loading
const initializeData = async () => {
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      console.log('Loading portfolio data from Firebase...');
      const data = await portfolioService.getAllPortfolioData();

      // Safely update each piece of data
      if (data.settings) {
        Object.assign(portfolioData.settings, data.settings);
      }

      if (data.seo) {
        Object.assign(portfolioData.seo, data.seo);
      }

      if (data.greeting) {
        Object.assign(portfolioData.greeting, data.greeting);
      }

      if (data.skills) {
        Object.assign(portfolioData.skills, data.skills);
      }

      if (data.competitiveSites) {
        Object.assign(portfolioData.competitiveSites, data.competitiveSites);
      }

      if (data.degrees) {
        Object.assign(portfolioData.degrees, data.degrees);
      }

      if (data.certifications) {
        Object.assign(portfolioData.certifications, data.certifications);
      }

      if (data.experience) {
        Object.assign(portfolioData.experience, data.experience);
      }

      if (data.projectsHeader) {
        Object.assign(portfolioData.projectsHeader, data.projectsHeader);
      }

      if (data.publicationsHeader) {
        Object.assign(portfolioData.publicationsHeader, data.publicationsHeader);
      }

      if (data.publications) {
        Object.assign(portfolioData.publications, data.publications);
      }

      if (data.projects) {
        Object.assign(portfolioData.projects, data.projects);
      }

      if (data.contactPageData) {
        Object.assign(portfolioData.contactPageData, data.contactPageData);
      }

      // Handle social media links array
      if (data.socialMediaLinks && Array.isArray(data.socialMediaLinks)) {
        portfolioData.socialMediaLinks.length = 0;
        portfolioData.socialMediaLinks.push(...data.socialMediaLinks);
      }

      isDataLoaded = true;
      console.log('Portfolio data loaded successfully');

      // Force React re-render by dispatching a custom event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('portfolioDataLoaded'));
      }

    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Keep default values on error
    }

    return portfolioData;
  })();

  return loadingPromise;
};

// Start loading immediately
initializeData();

// Export direct references to the data objects
export const settings = portfolioData.settings;
export const seo = portfolioData.seo;
export const greeting = portfolioData.greeting;
export const socialMediaLinks = portfolioData.socialMediaLinks;
export const skills = portfolioData.skills;
export const competitiveSites = portfolioData.competitiveSites;
export const degrees = portfolioData.degrees;
export const certifications = portfolioData.certifications;
export const experience = portfolioData.experience;
export const projectsHeader = portfolioData.projectsHeader;
export const publicationsHeader = portfolioData.publicationsHeader;
export const publications = portfolioData.publications;
export const projects = portfolioData.projects;
export const contactPageData = portfolioData.contactPageData;

// Helper functions
export const waitForDataLoad = () => loadingPromise;
export const isPortfolioDataLoaded = () => isDataLoaded;
export const refreshPortfolioData = async () => {
  isDataLoaded = false;
  loadingPromise = null;
  portfolioService.clearCache();
  return initializeData();
};