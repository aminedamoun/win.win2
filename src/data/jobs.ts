import { Job } from '../types';

export const jobs: Job[] = [
  {
    id: 'sales-advisor-field',
    title: 'Sales Advisor - Field Sales',
    type: 'field-sales',
    location: 'Trzin, Kranj, Nationwide',
    shortDescription: 'Present and sell telecommunications services (Internet, TV, Mobile) directly to customers in the field.',
    salaryRange: 'Base + Commission',
  },
  {
    id: 'sales-advisor-call-center',
    title: 'Sales Advisor - Call Center',
    type: 'call-center',
    location: 'Trzin, Kranj',
    shortDescription: 'Phone-based sales of telecommunications and ICT solutions to potential and existing customers.',
    salaryRange: 'Base + Commission',
  },
  {
    id: 'sales-team-leader',
    title: 'Sales Team Leader',
    type: 'team-leader',
    location: 'Trzin, Kranj',
    shortDescription: 'Lead and coach a team of sales advisors while driving performance and meeting KPIs.',
    salaryRange: '€2,000+ Base + Bonuses',
  },
];
