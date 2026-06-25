export const routesConfig = {
  home: "/",
  aboutUs: "/about-us",
  contact: "/contact",
  services: "/services",
  privacy: "/privacy",
  terms: "/terms",
  
  // Helpers to resolve URLs dynamically
  getServiceUrl: (service: string) => `/services/${service}`,
  getRegionUrl: (service: string, region: string) => `/services/${service}/${region}`,
  getLocationUrl: (service: string, region: string, location: string) => `/services/${service}/${region}/${location}`,
  getLpUrl: (service: string) => `/lp/${service}`,
};
