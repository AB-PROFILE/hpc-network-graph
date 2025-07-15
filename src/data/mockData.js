export const nodes = [
  { id: 1, name: 'Dr. Alice Smith', education: 'MD, Harvard', experience: '10 years at General Hospital', publications: 5 },
  { id: 2, name: 'Dr. Bob Johnson', education: 'PhD, Stanford', experience: '8 years at City Clinic', publications: 7 },
  { id: 3, name: 'Dr. Carol White', education: 'MD, Yale', experience: '5 years at County Hospital', publications: 3 },
  // add more...
];

export const edges = [
  { from: 1, to: 2, label: 'Co-authored 3 publications', details: 'Worked together on cancer research' },
  { from: 2, to: 3, label: 'Shared workplace at City Clinic', details: 'Colleagues from 2015 to 2020' },
];
