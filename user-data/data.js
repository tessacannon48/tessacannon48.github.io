export const bio = [
  "Hey there, I'm Tessa Cannon!",
  "<strong>Data Scientist </strong> with 2+ years of experience building data-driven solutions. Currently pursuing an MSc in Artificial Intelligence for Sustainable Development at University College London.",
  "Skilled in Python, R, SQL, and data visualization tools. Advanced knowledge of the statistics and mathematics behind machine learning algorithms. Particularly interested in diffusion models and computer vision.",
  "Passionate about applying technical skills to promote sustainable development and build AI used for good.",
];

export const skills = [
  "Languages: Python, R, SQL",
  "Activities: Machine Learning, Deep Learning, Reinforcement Learning, Generative AI, Data Analysis, Web Scraping",
  "Specialties: Diffusion Models, Remote Sensing Data, Computer Vision, Strategic Data Analysis",
];

export const experience = [
  {
    title: "Valtech",
    duration: "Jul 2022 - May 2024",
    subtitle: "Data Science Analyst",
    details: [
      "Derived customer insights from raw data to enhance targeted decision-making for a Fortune Global 500 company",
      "Optimized marketing channels by constructing an automated end-to-end data pipeline with an estimated 12x ROI.",
      "Built ML models to predict customer behavior such as churn propensity and purchase likelihood.",
      "Created and automated dashboards in Tableau and Looker Studio to improve client’s data accessibility.",
      "Identified and resolved pipeline issues by monitoring data integrity in an AWS Redshift database.",
      "Automated manual data processing workflows to save the client over 2 hours of labor per week.",
    ],
    tags: ["Python", "SQL", "Google BigQuery", "AWS", "Tableau", "Strategic Data Analysis"],
    icon: "bar-chart",
  },
  {
    title: "Google + Rice University",
    duration: "May 2021 - Jul 2021",
    subtitle: "Data Science Research Intern",
    details: [
      "Designed ML model using DenseNet and PyTorch to recognize and identify housing types in satellite images.",
      "Processed large datasets of satellite imagery and coordinate labels using ArcGIS, Python, and SQL.",
      "Earned 1st Runner-Up prize for a research presentation judged by Google experts and Rice University faculty.",
    ],
    tags: [
      "Python",
      "ArcGIS",
      "Academic Research"
    ],
    icon: "google",
  },
  {
    title: "Rice University",
    duration: "Sep 2020 - Dec 2020",
    subtitle: "Political Science Research Assistant",
    details: [
      "Assisted a Rice University PhD candidate of Political Science in research into racially polarized voting systems.",
      "Designed and generated data visualizations in R to simulate and illustrate desired project outcomes.",
      "Independently automated data cleaning in R to reduce manual data processing.",
    ],
    tags: ["R", "Academic Research"],
    icon: "university",
  },
  {
    title: "Oregon League of Conservation Voters",
    duration: "Jan 2017 - Jun 2017",
    subtitle: "Intern",
    details: [
      "Researched and tracked proposed climate legislation at the congressional level in the state of Oregon for lobbyists.",
      "Informed voting citizens through phone banking about events and policies to combat climate change.",
    ],
    tags: ["Policy", "Environmental Lobbying"],
    icon: "tree",
  },
];

export const education = [
  {
    title: "MSc in Artificial Intelligence for Sustainable Development",
    duration: "2024 - 2025",
    subtitle: "University College London",
    details: [],
    tags: [
      "Foundations of AI",
      "Deep Learning",
      "Probabilistic Modeling",
      "Reinforcment Learning",
      "Large Language Models",
      "Computer Vision",
      "Applied AI",
      "AI for Sustainable Development",
      "AI for Earth Observation",
    ],
    icon: "graduation-cap",
  },
  {
    title: "Bachelor's of Political Science, Minor in Statistics, Minor in Business",
    duration: "2018 - 2022",
    subtitle: "Rice University",
    details: [],
    tags: ["Political Science", "Statistics", "Business", "Data Science", "Mathematics"],
    icon: "book",
  },
];

export const research = [
  {
    title: "Mapping Arctic Fast Ice Terrain Using Diffusion-Based 3D Super-Resolution of Satellite Imagery",
    date: "2025 - Present",
    description: "MSc thesis project focused on using diffusion models to enhance the resolution of satellite imagery for better mapping of Arctic fast ice terrain. Currently in development.",
    image: "./images/topography_map_diagram.jpg",
    tags: ["Machine Learning", "Remote Sensing", "Environmental Science"],
    links: [
      {
        text: "Details Pending Publication",
        url: "#"
      }
    ]
  },
  {
    title: "Detecting Multi-Family Housing in Satellite Imagery",
    date: "2021 - 2021",
    description: "Research project using DenseNet and PyTorch to identify multi-family housing in satellite images to improve U.S. Census Data of Harris County TX. This project was completed as part of a 10-week research internship sponsored by Google.",
    image: "./images/reu_diagram.jpg", 
    tags: ["Machine Learning", "Geospatial Data", "Political Science"],
    links: [
      {
        text: "View Research Poster",
        url: "./documents/research_poster.pdf"
      }
    ]
  }
];

export const youtubeVideos = [
  {
    title: "How to Remove Clouds from Sentinel-2 Arctic Images Using a Conditional Diffusion Model",
    url: "https://youtu.be/0CCpH0Z3Mrw?si=kpFj8gJMZqAxVpVA",
    thumbnail: "https://img.youtube.com/vi/0CCpH0Z3Mrw/0.jpg"
  },
  {
    title: "How to Classify Sea Ice and Leads Using AI",
    url: "https://www.youtube.com/watch?v=fLVKjpqdGwI",
    thumbnail: "https://img.youtube.com/vi/fLVKjpqdGwI/0.jpg"
  }
];

export const footer = [
  //   {
  //     label: "Dev Profiles",
  //     data: [
  //       {
  //         text: "GitHub",
  //         link: "https://github.com/tessacannon48",
  //       }
  //     ],
  //   },
  //   {
  //     label: "Resources",
  //     data: [
  //       {
  //         text: "Enable Dark/Light Mode",
  //         func: "enableDarkMode()",
  //       },
  //       {
  //         text: "Print this page",
  //         func: "window.print()",
  //       },
  //       {
  //         text: "Clone this page",
  //         link: "https://github.com/tessacannon48/tessacannon48.github.io",
  //       },
  //     ],
  //   },
  {
    label: "Links",
    data: [
      {
        text: "Resume",
        link: "./documents/Tessa Cannon Resume (2025).pdf",
      },
         {
           text: "Linkedin",
           link: "https://www.linkedin.com/in/tessa-cannon48/",
         },
      {
        text: "Github",
        link: "https://github.com/tessacannon48",
      },
    ],
  },
  {
    label: "copyright-text",
    data: ["Made with &hearts; by Tessa Cannon"],
  },
];
