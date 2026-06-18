export const initialProblemStatements = [
  {
    id: "PS-01",
    title: "Optimizing Urban Heat Mitigation and Cooling Strategies via AI/ML",
    category: "AI/ML & Urban Planning",
    description: "Utilize hyper-local thermal and multispectral satellite data to map municipal heat islands, modeling urban growth vectors and simulating optimal configuration for cooling networks using green-blue infrastructure inputs.",
    teamRatings: [4, 4, 3, 5],
    metrics: {
      innovation: 4,
      difficulty: 3,
      feasibility: 4,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "High social relevance. Standard remote sensing pipelines with AI modeling are readily accessible.",
    pros: ["Abundant public thermal imagery available", "Tangible social impact, appeals to judges"],
    cons: ["High dependency on urban structural vector files", "Model validation requires localized weather data"],
    ideas: "Incorporate localized open-source building geometry vectors to predict microclimate boundaries.",
    challenges: "Calibrating thermal indicators with local atmospheric moisture anomalies."
  },
  {
    id: "PS-02",
    title: "Generative AI-Based Cloud Removal and Reconstruction for LISS-IV Satellite Imagery",
    category: "Generative AI & Remote Sensing",
    description: "Architect conditional generative adversarial networks (cGANs) or spatial diffusion models to reconstruct cloud-occluded multispectral scenes using auxiliary historical imagery and temporal coherence vectors.",
    teamRatings: [5, 5, 4, 4],
    metrics: {
      innovation: 5,
      difficulty: 5,
      feasibility: 3,
      industryImpact: 5,
      learningOpportunity: 5
    },
    notes: "Highly cutting-edge domain. Reconstructing high-resolution LISS-IV details without introducing hallucinations is key.",
    pros: ["Massive portfolio-builder with Generative AI", "Direct applicability to ISRO's operational workflow"],
    cons: ["Very compute-intensive", "Ground truth mapping for training datasets is difficult"],
    ideas: "Utilize temporal inputs from SAR data (cloud-penetrating) to guide the optical reconstruction pathway.",
    challenges: "Preventing spatial hallucinations of land features in dense continuous clouds."
  },
  {
    id: "PS-03",
    title: "Development of Surface AQI & Identification of HCHO Hotspots",
    category: "Environmental Monitoring",
    description: "Deploy deep regression structures over Sentinel-5P, INSAT-3DR, and surface station configurations to model real-time surface-level Air Quality Index, targeting formaldehyde (HCHO) precursor industrial signatures.",
    teamRatings: [3, 4, 3, 3],
    metrics: {
      innovation: 3,
      difficulty: 3,
      feasibility: 5,
      industryImpact: 4,
      learningOpportunity: 3
    },
    notes: "Straightforward regression framework. Good data coverage from ESA and ISRO portals.",
    pros: ["Highly feasible within hackathon timelines", "Clear, well-defined mathematical target variables"],
    cons: ["HCHO data is noisy at high resolutions", "Requires spatial interpolation for uneven ground station networks"],
    ideas: "Implement Kriging-integrated deep learning models for seamless spatial continuous prediction maps.",
    challenges: "Aligning temporal differences between INSAT geostationary and Sentinel polar passes."
  },
  {
    id: "PS-04",
    title: "Route Resilience: Occlusion-Robust Road Extraction",
    category: "Computer Vision & Remote Sensing",
    description: "Extract road networks obscured by forest canopies, cloud cover, and shadows in high-resolution satellite datasets by chaining topological graphs and semantic segmentation frameworks (like LinkNet/D-LinkNet).",
    teamRatings: [4, 3, 4, 4],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 4,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "Combines network graph theory with standard computer vision segmentation models.",
    pros: ["Valuable application in disaster management", "Pre-trained models like DeepLabV3+ speed up base pipeline"],
    cons: ["Manual labeling required if vector ground truth is unaligned", "Heavily complex graph routing modules"],
    ideas: "Introduce structural road center-line predictions to force network connectivity.",
    challenges: "Maintaining continuity across severe structural mountain shadow occlusions."
  },
  {
    id: "PS-05",
    title: "AI-Powered Digital Twin of India's Climate",
    category: "Climate Science & AI",
    description: "Formulate neural surrogate models representing dynamic global circulation models to compile interactive, real-time projections for temperature, monsoonal precipitation profiles, and sea-level scenarios under CMIP6 frameworks.",
    teamRatings: [4, 5, 5, 3],
    metrics: {
      innovation: 5,
      difficulty: 5,
      feasibility: 2,
      industryImpact: 5,
      learningOpportunity: 5
    },
    notes: "Extremely ambitious project scope. Building a functional digital twin requires strict bounds setting.",
    pros: ["Unmatched wow-factor", "Integrates diverse earth science systems"],
    cons: ["Gigabyte-to-terabyte climate datasets", "High risk of failing to complete complex pipeline in 36 hours"],
    ideas: "Focus climate modeling exclusively on one specific coastal sub-region as a functional proof-of-concept.",
    challenges: "Ingesting NetCDF4 climate files quickly and setting up responsive UI visualizations."
  },
  {
    id: "PS-06",
    title: "AI-Driven Automated Crop Type and Moisture Stress Detection",
    category: "Smart Agriculture",
    description: "Build an ensemble temporal framework using Sentinel-1 SAR and Sentinel-2 multi-spectral data to establish micro-crop classifications and estimate moisture index variations for early drought alerts.",
    teamRatings: [3, 3, 4, 4],
    metrics: {
      innovation: 3,
      difficulty: 3,
      feasibility: 5,
      industryImpact: 4,
      learningOpportunity: 3
    },
    notes: "Very structured project with high success probability. Well-studied domain.",
    pros: ["High availability of crop libraries", "Straightforward integration of standard NDVI/NDWI formulas"],
    cons: ["Hard to distinguish overlapping crop profiles using spatial data alone", "Dynamic ground-truth validation is crucial"],
    ideas: "Employ LSTM or Temporal CNN models to track NDVI patterns over full seasonal horizons.",
    challenges: "Eliminating crop field speckle noise profiles inherent to SAR radar backscatter."
  },
  {
    id: "PS-07",
    title: "AI-enabled Detection of Exoplanets",
    category: "Space Science & Astrophysics",
    description: "Detect planetary transit signatures from space telescope photometric datasets (such as Kepler, TESS) by implementing multi-stage 1D CNNs, LSTM architectures, and wavelet transform filters to mitigate stellar noise profiles.",
    teamRatings: [5, 4, 4, 5],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 4,
      industryImpact: 3,
      learningOpportunity: 5
    },
    notes: "Brilliant project theme for an ISRO hackathon. Involves signal processing and deep sequence classification.",
    pros: ["Open access to NASA Exoplanet Archive database", "Clear signals with distinct transit dips in flux curves"],
    cons: ["Stellar flares create frequent false positives", "Little immediate localized 'earthly' commercial application"],
    ideas: "Construct a custom attention-based Transformer model to flag periodic transit anomalies.",
    challenges: "Handling highly imbalanced datasets where transit signals represent a fraction of the raw sequence."
  },
  {
    id: "PS-08",
    title: "Detection of Subsurface Ice in Lunar South Polar Regions",
    category: "Lunar Science & Remote Sensing",
    description: "Identify high-potential subsurface water-ice repositories in permanently shadowed craters of the Lunar South Pole by analyzing Chandrayaan-2 Dual-Frequency SAR (DFSAR) and Lunar Reconnaissance Orbiter data.",
    teamRatings: [5, 5, 5, 4],
    metrics: {
      innovation: 5,
      difficulty: 5,
      feasibility: 3,
      industryImpact: 5,
      learningOpportunity: 5
    },
    notes: "Perfect alignment with ISRO's active planetary exploration objectives. Extreme strategic relevance.",
    pros: ["Unique use of actual Chandrayaan DFSAR radar data", "High appeal for ISRO scientific evaluators"],
    cons: ["Extremely difficult radar backscatter signature modeling", "Virtually zero localized ground-truth confirmation"],
    ideas: "Compare radar return signatures with thermal simulation profiles of high-elevation shadow contours.",
    challenges: "Differentiating surface roughness returns from real sub-surface dielectric volume anomalies."
  },
  {
    id: "PS-09",
    title: "Wavefront Reconstruction and Turbulence Characterization",
    category: "Optics & Space Instrumentation",
    description: "Develop neural network alternatives to standard Shack-Hartmann wavefront calculations to forecast atmospheric turbulence patterns and reconstruct phase maps for ground stations communicating with deep space units.",
    teamRatings: [4, 3, 3, 3],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 3,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "Deep physical systems modeling. Involves numerical Fourier analysis and spatial wavefront reconstruction.",
    pros: ["Niche domain; low hackathon overlap", "High speed execution compared to iterative solvers"],
    cons: ["Highly theoretical and math-heavy", "Creating dynamic simulated turbulence datasets is difficult"],
    ideas: "Utilize Zernike polynomials as coordinate prediction targets for a compact CNN.",
    challenges: "Validating performance over fast, dynamic atmospheric phase mutations."
  },
  {
    id: "PS-10",
    title: "Infrared Image Colorization and Enhancement",
    category: "Image Processing & Infrared",
    description: "Convert thermal or nighttime infrared satellite perspectives into highly-interpretable simulated RGB outputs using translation architectures (like Pix2Pix GAN, cycleGAN, or diffusion-based models).",
    teamRatings: [4, 4, 3, 4],
    metrics: {
      innovation: 4,
      difficulty: 3,
      feasibility: 4,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "Highly visual and impressive outputs. Very rewarding dashboard-focused capabilities.",
    pros: ["Instantly demonstrates utility in defense and navigation", "Straightforward paired training datasets via daytime-nighttime images"],
    cons: ["Prone to artistic hallucinations of colors", "Struggles with extreme thermal variation boundaries"],
    ideas: "Incorporate edge preservation loss filters to enforce structural boundaries in converted imagery.",
    challenges: "Retaining exact micro-texture signatures across target conversion passes."
  },
  {
    id: "PS-11",
    title: "Cross-Modal Satellite Image Retrieval",
    category: "Computer Vision & Information Retrieval",
    description: "Construct joint embedding systems (such as CLIP-style text-image matching) enabling analysts to query dense repositories of Earth Observation data using conversational natural language descriptions.",
    teamRatings: [4, 4, 5, 4],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 4,
      industryImpact: 5,
      learningOpportunity: 4
    },
    notes: "Combines LLMs with Computer Vision. Highly valuable SaaS application potential.",
    pros: ["Provides an engaging UI/UX workspace module", "Leverages standard pre-trained foundation model encoders"],
    cons: ["Requires high-quality captioned satellite image pairs", "Difficult vector search optimization within timelines"],
    ideas: "Fine-tune a lightweight CLIP backbone on custom open datasets (like BigEarthNet).",
    challenges: "Teaching natural language models to process multi-scale spatial terminology."
  },
  {
    id: "PS-12",
    title: "Temporal Resolution Enhancement using Optical Flow",
    category: "Video Processing & Satellite Data",
    description: "Synthesize high-frequency geostationary frames using dense optical flow vectors and neural interpolators to transition 30-minute imagery down to simulated 5-minute update intervals.",
    teamRatings: [3, 3, 3, 4],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 3,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "Requires solid understanding of frame-to-frame flow mechanics.",
    pros: ["Significant value for tracking rapid weather events like cyclones", "Clear performance benchmarks (PSNR / SSIM metrics)"],
    cons: ["Rapidly moving clouds break basic constant brightness assumptions", "High mathematical complexity in deep optical frameworks"],
    ideas: "Leverage advanced bilateral motion estimation layers to manage overlapping weather currents.",
    challenges: "Avoiding ghosting and artifact streaks in dynamic atmospheric environments."
  },
  {
    id: "PS-13",
    title: "Air-Gapped Predictive Copilot",
    category: "AI & Cybersecurity / Software",
    description: "Develop a quantized, secure, localized predictive assistant LLM designed to operate entirely in offline infrastructure to assist engineers with rocket telemetry reviews and code recommendations.",
    teamRatings: [5, 4, 4, 4],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 3,
      industryImpact: 5,
      learningOpportunity: 5
    },
    notes: "Excellent software-focused systems engineering challenge. High utility in secure centers.",
    pros: ["Direct address of air-gapped secure operational demands", "Demonstrable on local offline hardware"],
    cons: ["Sourcing telemetry-focused manuals for training data is difficult", "Restricted by edge hardware performance bounds"],
    ideas: "Incorporate a secure Retrieval-Augmented Generation (RAG) tool powered by offline vector files.",
    challenges: "Quantizing 7B parameter models down to 4-bit configurations without losing contextual clarity."
  },
  {
    id: "PS-14",
    title: "Forecasting Energetic Particle Radiation Environment",
    category: "Space Weather & Heliophysics",
    description: "Utilize solar wind sensor readings and deep sequence networks to anticipate dangerous flux elevations of high-energy solar particles at orbital flight altitudes, safeguarding astronauts and satellites.",
    teamRatings: [4, 5, 4, 3],
    metrics: {
      innovation: 5,
      difficulty: 4,
      feasibility: 3,
      industryImpact: 4,
      learningOpportunity: 5
    },
    notes: "Deep space weather challenge. Direct bearing on upcoming Gaganyaan manned space missions.",
    pros: ["Extremely relevant to ISRO's human flight milestones", "Excellent temporal prediction challenge"],
    cons: ["Highly sparse solar anomaly events in historical records", "Input delays across sensors situated far from Earth"],
    ideas: "Employ LSTM models backed by temporal transformer networks to track solar storm trajectories.",
    challenges: "Reducing false alarms while capturing sudden explosive coronal outbursts."
  },
  {
    id: "PS-15",
    title: "Forecasting / Nowcasting of Solar Flares",
    category: "Space Weather & Heliophysics",
    description: "Develop deep learning visual classification models to process SDO (Solar Dynamics Observatory) magnetograms in real-time, predicting solar flare classes (C, M, X) hours before emergence.",
    teamRatings: [4, 5, 4, 4],
    metrics: {
      innovation: 4,
      difficulty: 4,
      feasibility: 4,
      industryImpact: 4,
      learningOpportunity: 4
    },
    notes: "Utilizes magnetic field image mapping to anticipate high-energy coronal discharges.",
    pros: ["Rich, highly structured solar magnetic datasets", "Clear metric metrics (F1-score for flare events)"],
    cons: ["X-class flares are rare occurrences", "Managing heavy multidimensional solar imagery"],
    ideas: "Incorporate a custom vision transformer attention map overlay displaying active solar regions.",
    challenges: "Achieving high accuracy predictions several hours in advance of rapid solar structure shifts."
  }
];
