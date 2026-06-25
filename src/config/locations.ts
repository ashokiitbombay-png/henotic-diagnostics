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

export const REAL_LOCATION_REVIEWS: Record<string, { ratingValue: string; reviewCount: string }> = {
  "kharghar": { ratingValue: "4.9", reviewCount: "1280" },
  "panvel": { ratingValue: "4.8", reviewCount: "940" },
  "vashi": { ratingValue: "4.9", reviewCount: "820" },
  "nerul": { ratingValue: "4.8", reviewCount: "620" },
  "cbd-belapur": { ratingValue: "4.7", reviewCount: "480" },
  "kamothe": { ratingValue: "4.8", reviewCount: "350" },
  "kalamboli": { ratingValue: "4.7", reviewCount: "290" },
  "taloja": { ratingValue: "4.6", reviewCount: "180" }
};

export const CITY_MICRO_NEIGHBORHOODS: Record<string, string[]> = {
  "kharghar": ["Sector 15", "Sector 20", "Sector 35", "DMart Road", "Central Park", "Kharghar Station", "Hiranandani Crystal Plaza"],
  "panvel": ["New Panvel East", "New Panvel West", "Adai Circle", "Matheran Road", "Panvel Station", "Palaspe Phata"],
  "vashi": ["Sector 17", "Inorbit Mall Road", "Mini Seashore", "Sector 9", "Vashi Station", "APMC Market"],
  "nerul": ["Sector 15", "Sector 50 Nerul", "LP Junction", "Nerul East", "Nerul West", "Nerul Station"],
  "cbd-belapur": ["Sector 15 Belapur", "Belapur Station", "CBD Artist Village", "Sakhar Bhavan Road"],
  "kamothe": ["Sector 11 Kamothe", "Sector 20 Kamothe", "Kamothe Highway Kid", "Mansarovar Station"],
  "kalamboli": ["Sector 1E Kalamboli", "Kalamboli Circle", "Steel Market Road", "Roadpali"],
  "taloja": ["Taloja Phase 1", "Taloja Phase 2", "Taloja MIDC", "Taloja Station"],
  "ghansoli": ["Ghansoli Station", "Sector 15 Ghansoli", "Reliance Corporate Park Road"],
  "kopar-khairane": ["Sector 5 Kopar Khairane", "Sector 11 Kopar Khairane", "Kopar Khairane Station"],
  "airoli": ["Sector 8 Airoli", "Sector 19 Airoli", "Airoli Station", "Mindspace Road"]
};