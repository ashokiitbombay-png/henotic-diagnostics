// Unified Geographic Source of Truth for Henotic Diagnostics PSEO Architecture

export const REGION_NAMES: Record<string, string> = {
  "south-mumbai": "South Mumbai",
  "central-suburbs": "Central Suburbs",
  "western-suburbs": "Western Suburbs",
  "eastern-suburbs": "Eastern Suburbs",
  "navi-mumbai": "Navi Mumbai"
};

export const REGION_LOCATIONS: Record<string, string[]> = {
  "south-mumbai": [
    "colaba", "cuffe-parade", "fort", "churchgate", "marine-lines", 
    "nariman-point", "worli", "parel", "lower-parel", "mahalaxmi", 
    "byculla", "dadar", "sion"
  ],
  "central-suburbs": [
    "kurla", "chembur", "ghatkopar", "vikhroli", "kanjurmarg", 
    "bhandup", "mulund"
  ],
  "western-suburbs": [
    "bandra", "khar", "santacruz", "vile-parle", "andheri", 
    "jogeshwari", "goregaon", "malad", "kandivali", "borivali", 
    "dahisar"
  ],
  "eastern-suburbs": [
    "kurla-east", "chembur-east", "ghatkopar-east", "vikhroli-east", 
    "mulund-east"
  ],
  "navi-mumbai": [
    "vashi", "sanpada", "juinagar", "nerul", "seawoods", 
    "cbd-belapur", "kharghar", "kamothe", "kalamboli", "panvel", 
    "new-panvel", "taloja", "ghansoli", "kopar-khairane", "airoli", 
    "turbhe"
  ]
};

// Flat array representation generated dynamically from the region locations mapping
export const locations = Object.entries(REGION_LOCATIONS).flatMap(([region, cities]) =>
  cities.map((city) => ({
    city,
    region
  }))
);