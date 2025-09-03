export const cards = [
  {
    id: "m01",
    imageSrc: "/images/garage/01.webp",
    title: "TLM01I",
    description: `Lorem ipsum odor amet, consectetuer adipiscing elit. 
                      Ac purus in massa egestas mollis varius; dignissim elementum.`,
    detailsLink: "/garage/m01",
    video: "/videos/garage/details/desktop/m01.mp4",
    stats: [
      { name: "Max Power", value: 39, max: 80, unit: "cv" },
      { name: "Speed", value: 192, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 4, max: 4, unit: "s" },
      { name: "Torque", value: 24, max: 40, unit: "Nm" },
    ],
    historyText: `The TLM01i is a combustion motorcycle equipped with a 250cc, 4-stroke engine from Sherco. 
        Structurally, the bike features a twin spar frame made of trellised aluminum. In 2014, the motorcycle weighed
        approximately 105kg and boasted a top speed of around 170km/h. Since its debut in
        the Motostudent 2014 competition, the TLM01i has undergone several modifications to enhance its performance.`,
  },
  {
    id: "m02",
    imageSrc: "/images/garage/02.webp",
    title: "TLM02E",
    description: `Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.`,
    detailsLink: "/garage/m02",
    video: "/videos/garage/details/desktop/sun/m02_sun.mp4",
    stats: [
      { name: "Max Power", value: 39, max: 80, unit: "kW" },
      { name: "Speed", value: 160, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 5, max: 5, unit: "s" },
      { name: "Torque", value: 60, max: 80, unit: "Nm" },
    ],
    historyText: `The TLM02e, crafted between 2017-2018, marked a pioneering venture for the team. Born amidst the rise 
        of electric mobility in MotoStudent, this prototype showcased Portugal's entry into the electrifying arena. 
        With sleek design and groundbreaking technology, it proudly competed in the 2018 edition, capturing hearts and minds. 
        Today, it stands as a testament to the ingenuity and ambition of its creators, heralding a new era of innovation in 
        Portuguese engineering.`,
  },
  {
    id: "m03",
    imageSrc: "/images/garage/03.webp",
    title: "TLM03E",
    description: `Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue.`,
    detailsLink: "/garage/m03",
    video: "/videos/garage/details/desktop/red/m03_red.mp4",
    stats: [
      { name: "Max Power", value: 36, max: 80, unit: "kW" },
      { name: "Speed", value: 178, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 4.2, max: 4.2, unit: "s" },
      { name: "Torque", value: 90, max: 110, unit: "Nm" },
    ],
    historyText: `The TLM03e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
        engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
        Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
        This milestone underscores the global recognition of their innovation.`,
  },
  {
    id: 'm04',
    imageSrc: '/images/garage/04.webp',
    title: 'TLM04E',
    description: `Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue.`,
    detailsLink: "/garage/m04",
    video: "/videos/garage/details/desktop/marlboro/m04_marlboro.mp4",
    stats: [
      { name: "Max Power", value: 57, max: 57, unit: "kW" },
      { name: "Speed", value: 204, max: 204, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 3.6, max: 3.6, unit: "s" },
      { name: "Torque", value: 120, max: 120, unit: "Nm" },
    ],
    historyText: `The TLM04e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
        engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
        Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
        This milestone underscores the global recognition of their innovation.`,
  },
];

export const backgrounds = {
  m01: ["/videos/garage/details/desktop/m01.mp4"],
  m02: ["/videos/garage/details/desktop/sun/m02_sun.mp4"],
  m03: [
    "/videos/garage/details/desktop/red/m03_red.mp4",
    "/videos/garage/details/desktop/marlboro/m03_marlboro.mp4",
  ],
  m04: [
    "/videos/garage/details/desktop/red/m04_red.mp4",
    "/videos/garage/details/desktop/marlboro/m04_marlboro.mp4",
    "/videos/garage/details/desktop/gulf/m04_gulf.mp4",
    "/videos/garage/details/desktop/bordeaux/m04_bordeaux.mp4",
  ],
};

export const themeColors = {
  m01: "0,82,212", // azul
  m02: "255,204,0", // amarelo
  m03: "255,0,0", // vermelho
  m04: "255,0,0", // vermelho
};
