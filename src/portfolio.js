// portfolio.js - Direct assignment approach (maintains existing import structure)
import PortfolioService from './portfolioService';

// Initialize the service (no parameters needed now)
const portfolioService = new PortfolioService();

// Variables that will hold the data (same names as your original exports)
// Initialize with safe default values to prevent null reference errors
let settings = { isSplash: false };
let seo = { title: "Portfolio", description: "", og: { title: "Portfolio", type: "website", url: "" } };
let greeting = { title: "", nickname: "", runnerText: [], resumeLink: "" };
let socialMediaLinks = [];
let skills = { data: [] };
let competitiveSites = { competitiveSites: [] };
let degrees = { degrees: [] };
let certifications = { certifications: [] };
let experience = { title: "", subtitle: "", description: [], sections: [] };
let projectsHeader = { title: "", description: "" };
let publicationsHeader = { title: "", description: "" };
let publications = { data: [] };
let contactPageData = {
  contactSection: {
    title: "",
    profile_image_path: "",
    description: ""
  },
  addressSection: {
    title: "",
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
};

// Loading state
let isDataLoaded = false;
let isLoading = false;
let loadingPromise = null;

// Initialize all data at module load
const initializeData = async () => {
  if (isLoading) {
    return loadingPromise;
  }

  if (isDataLoaded) {
    return;
  }

  isLoading = true;

  loadingPromise = (async () => {
    try {
      console.log('Loading portfolio data from Firebase...');

      const data = await portfolioService.getAllPortfolioData();

      // Update the existing objects instead of reassigning
      // This preserves references while updating content
      Object.assign(settings, data.settings);
      Object.assign(seo, data.seo);
      Object.assign(greeting, data.greeting);
      Object.assign(skills, data.skills);
      Object.assign(competitiveSites, data.competitiveSites);
      Object.assign(degrees, data.degrees);
      Object.assign(certifications, data.certifications);
      Object.assign(experience, data.experience);
      Object.assign(projectsHeader, data.projectsHeader);
      Object.assign(publicationsHeader, data.publicationsHeader);
      Object.assign(publications, data.publications);
      Object.assign(contactPageData, data.contactPageData);

      // For arrays, replace the contents
      socialMediaLinks.length = 0;
      socialMediaLinks.push(...data.socialMediaLinks);

      isDataLoaded = true;
      console.log('Portfolio data loaded successfully');

      // Trigger a re-render if in React environment
      if (typeof window !== 'undefined' && window.portfolioDataLoaded) {
        window.portfolioDataLoaded();
      }

    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Keep the default values that were already set
    } finally {
      isLoading = false;
    }
  })();

  return loadingPromise;
};

// Auto-initialize when module is imported
initializeData();

// Getter functions that ensure data is loaded before returning
const ensureDataLoaded = async () => {
  if (!isDataLoaded && !isLoading) {
    await initializeData();
  } else if (isLoading) {
    await loadingPromise;
  }
};

// Export the same variable names as your original file
// These are now initialized with safe defaults and will be updated when Firebase loads
export {
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

// Helper function to wait for data to be loaded (optional, for components that need to wait)
export const waitForDataLoad = () => ensureDataLoaded();

// Function to manually refresh all data
export const refreshPortfolioData = async () => {
  isDataLoaded = false;
  portfolioService.clearCache();
  await initializeData();
};

// Helper to check if data is loaded
export const isPortfolioDataLoaded = () => isDataLoaded;

// Helper to get loading promise
export const getLoadingPromise = () => loadingPromise;