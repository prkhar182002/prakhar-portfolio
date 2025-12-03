// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Testimonials',
    url: '#testimonials-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'X',
    url: 'https://x.com/prakhar',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/prakhar',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/prakhar',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/prakhar/',
  },
];

const resourceLinks = [
  {
    label: 'Design Resources',
    url: 'https://www.designresources.com',
  },
  {
    label: 'Code Snippets',
    url: 'https://www.codesnippets.com',
  },
];

const heroText =
  'Full-stack developer specializing in web & mobile applications. Building scalable solutions with React, Next.js, Vue.js, and iOS development.';

const locationPlace = `28°36'50.0"N 77°12'32.0"E`;
const locationCountry = 'New Delhi, India';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = 'brhoom/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#a855f7"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
