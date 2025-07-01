// src/data/mockHcpData.js

export const nodes = [
  {
    id: 1,
    name: 'Dr. Alice Johnson',
    education: 'MD, Harvard Medical School',
    experience: '10 years at General Hospital',
    publications: '25+ research papers in cardiology',
  },
  {
    id: 2,
    name: 'Dr. Bob Smith',
    education: 'PhD, Stanford University',
    experience: '8 years at City Clinic',
    publications: '15 research papers in neurology',
  },
  {
    id: 3,
    name: 'Dr. Clara Lee',
    education: 'MBBS, Oxford University',
    experience: '12 years at Royal Medical Centre',
    publications: '30+ publications in epidemiology',
  },
  {
    id: 4,
    name: 'Dr. David Kim',
    education: 'DO, UCLA School of Medicine',
    experience: '6 years at Mercy Hospital',
    publications: '10 articles in oncology journals',
  },
  {
    id: 5,
    name: 'Dr. Emily Zhao',
    education: 'MD/PhD, Johns Hopkins University',
    experience: 'Lead researcher at Biomedical Lab',
    publications: '50+ papers in immunology',
  }
];

export const edges = [
  {
    from: 1,
    to: 2,
    label: 'Co-authored 3 papers',
    details: 'Worked together on neurocardiology joint studies',
  },
  {
    from: 1,
    to: 3,
    label: 'Shared workplace',
    details: 'General Hospital (2015–2019)',
  },
  {
    from: 2,
    to: 4,
    label: 'Attended same conference',
    details: 'Neurology World Congress 2021',
  },
  {
    from: 3,
    to: 5,
    label: 'Joint clinical trial',
    details: 'COVID-19 vaccine efficacy trial (2020–2022)',
  },
  {
    from: 4,
    to: 5,
    label: 'Published review',
    details: 'Oncology & Immunology 2023 review article',
  }
];
