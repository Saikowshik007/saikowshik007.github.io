const portfolioService = new PortfolioService();

// Variables that will hold the data (same names as your original exports)
let settings = null;
let seo = null;
let greeting = null;
let socialMediaLinks = null;
let skills = null;
let competitiveSites = null;
let degrees = null;
let certifications = null;
let experience = null;
let projectsHeader = null;
let publicationsHeader = null;
let publications = null;
let contactPageData = null;

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

      // Assign to module-level variables with exact same names
      settings = data.settings;
      seo = data.seo;
      greeting = data.greeting;
      socialMediaLinks = data.socialMediaLinks;
      skills = data.skills;
      competitiveSites = data.competitiveSites;
      degrees = data.degrees;
      certifications = data.certifications;
      experience = data.experience;
      projectsHeader = data.projectsHeader;
      publicationsHeader = data.publicationsHeader;
      publications = data.publications;
      contactPageData = data.contactPageData;

      isDataLoaded = true;
      console.log('Portfolio data loaded successfully');

    } catch (error) {
      console.error('Error loading portfolio data:', error);

      // Set fallback default values to prevent crashes
      settings = { isSplash: false };
      seo = { title: "Portfolio", description: "", og: { title: "Portfolio", type: "website", url: "" } };
      greeting = { title: "", nickname: "", runnerText: [] };
      socialMediaLinks = [];
      skills = { data: [] };
      competitiveSites = { competitiveSites: [] };
      degrees = { degrees: [] };
      certifications = { certifications: [] };
      experience = { title: "", subtitle: "", description: [], sections: [] };
      projectsHeader = { title: "", description: "" };
      publicationsHeader = { title: "", description: "" };
      publications = { data: [] };
      contactPageData = { contactSection: {}, addressSection: {}, phoneSection: {} };
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

export const refreshPortfolioData = async () => {
  isDataLoaded = false;
  portfolioService.clearCache();
  await initializeData();
};