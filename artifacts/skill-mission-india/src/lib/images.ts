/**
 * Topic-based education & skill-development imagery for Skill Mission India.
 * Images sourced from Unsplash (free license) and matched to each program topic.
 */

export type EduImage = {
  src: string;
  alt: string;
  topic: string;
};

export function eduImage(id: string, width = 1200, crop?: string) {
  const cropParam = crop ? `&crop=${crop}` : "";
  return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop${cropParam}`;
}

function img(id: string, alt: string, topic: string, width = 1200, crop?: string): EduImage {
  return { src: eduImage(id, width, crop), alt, topic };
}

function localImg(src: string, alt: string, topic: string): EduImage {
  return { src, alt, topic };
}

export const EDU_IMAGES = {
  hero: localImg(
    "/images/hero.png",
    "Instructor leading a government skill development training session with students on laptops",
    "Skill Development Training"
  ),

  about: {
    main: localImg(
      "/images/about_main.png",
      "Trainer explaining a skill development program to a group of students",
      "Vocational Training"
    ),
    classroom: localImg(
      "/images/about_classroom.png",
      "Students attending classroom training and taking notes",
      "Classroom Learning"
    ),
    graduation: localImg(
      "/images/about_graduation.png",
      "Graduates celebrating after receiving government skill certificates",
      "Certification Ceremony"
    ),
    workshop: localImg(
      "/images/about_workshop.png",
      "Apprentice receiving hands-on vocational workshop training from instructor",
      "Vocational Workshop"
    ),
  },

  programs: {
    officeAutomation: localImg(
      "/images/program_office.png",
      "NIELIT office automation student learning accounting on laptop with calculator",
      "Office Automation & Accounting"
    ),
    unicef: localImg(
      "/images/program_unicef.png",
      "Youth learning digital skills on laptop for UNICEF E-Placement employment program",
      "UNICEF E-Placement"
    ),
    pmVikas: localImg(
      "/images/program_pmvikas.png",
      "Artisan and trainee in PM VIKAS vocational craftsman workshop",
      "PM VIKAS Artisan Training"
    ),
    msme: localImg(
      "/images/program_msme.png",
      "MSME industrial skill development with hands-on manufacturing workshop training",
      "MSME Skill Development"
    ),
    csr: localImg(
      "/images/program_csr.png",
      "CSR corporate IT training with team learning programming beside whiteboard",
      "CSR IT Skill Program"
    ),
  },

  benefits: {
    freeTraining: localImg(
      "/images/benefits_free.png",
      "Free government-sponsored skill training for eligible youth",
      "Free Training"
    ),
    certification: localImg(
      "/images/benefits_cert.png",
      "Government certification ceremony for skilled program graduates",
      "Government Certification"
    ),
    placement: localImg(
      "/images/benefits_job.png",
      "Graduate using digital job portal for employment and placement support",
      "Job Placement"
    ),
    digitalSkills: localImg(
      "/images/program_unicef.png",
      "Student building digital literacy and computer skills in training classroom",
      "Digital Skills"
    ),
    stipend: localImg(
      "/images/benefits_free.png",
      "Student studying with laptop and learning materials during sponsored program",
      "Stipend & Learning Support"
    ),
    entrepreneurship: localImg(
      "/images/program_csr.png",
      "Entrepreneurship mentorship and small business development training session",
      "Entrepreneurship"
    ),
  },

  stats: localImg(
    "/images/hero.png",
    "Large-scale skill development training with instructor and students",
    "Training Impact"
  ),

  testimonials: {
    background: localImg(
      "/images/about_graduation.png",
      "Group of skilled youth celebrating successful program completion",
      "Success Stories"
    ),
    avatars: [
      img("photo-1573496359142-b8d87734a5a2", "Priya Sharma, Office Automation graduate", "Graduate", 120, "faces"),
      img("photo-1507003211169-0a1dd7228f2d", "Rahul Meena, PM VIKAS graduate", "Graduate", 120, "faces"),
      img("photo-1580482116060-2b38f47b3c48", "Anjali Devi, UNICEF E-Placement graduate", "Graduate", 120, "faces"),
      img("photo-1506794778202-cad84cf45f1d", "Mohammed Ikbal, CSR program graduate", "Graduate", 120, "faces"),
      img("photo-1487412720507-e7ab37603c6f", "Kavitha Nair, MSME program graduate", "Graduate", 120, "faces"),
    ],
  },

  contact: localImg(
    "/images/about_classroom.png",
    "Skill Mission India education and training centre office",
    "Contact & Support"
  ),

  trainingPartner: localImg(
    "/images/about_main.png",
    "Training centre instructor delivering skill program to enrolled students",
    "Training Partner Centre"
  ),

  projects: {
    bksy: localImg(
      "/images/about_workshop.png",
      "Agricultural micro-irrigation mechanism and machine training",
      "Agricultural Irrigation (BKSY)"
    ),
    matirKotha: localImg(
      "/images/program_pmvikas.png",
      "Agriculture traditional soil advisor training",
      "Farmer Advisories (Matir Kotha)"
    ),
    alosree: localImg(
      "/images/program_csr.png",
      "Solar energy panels and LED lighting project discussion",
      "LED/Solar Lighting (Alosree)"
    ),
    skillTraining: localImg(
      "/images/hero.png",
      "Youth undergoing vocational skill training on computer laptops",
      "Skill Training"
    ),
    schoolProject: localImg(
      "/images/about_main.png",
      "Digital classroom setup with interactive board",
      "School Projects"
    ),
    digitization: localImg(
      "/images/about_classroom.png",
      "Records digitization and online database setup",
      "Digitization Projects"
    ),
    healthCamp: localImg(
      "/images/benefits_free.png",
      "Doctors conducting a free health camp in a rural village",
      "Free Health Camps"
    ),
    sanitaryDistribution: localImg(
      "/images/benefits_job.png",
      "Distribution of hygiene kits to female students",
      "Sanitary Napkin Distribution"
    ),
  },
} as const;

/** Program key → topic image (shared by Programs & Course Details) */
export const PROGRAM_TOPIC_IMAGES = {
  "Office Automation & Accounting": EDU_IMAGES.programs.officeAutomation,
  "UNICEF E-Placement": EDU_IMAGES.programs.unicef,
  "PM VIKAS": EDU_IMAGES.programs.pmVikas,
  "MSME Skill Development": EDU_IMAGES.programs.msme,
  "CSR Skill Programs": EDU_IMAGES.programs.csr,
} as const;
