export interface Skill {
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image?: string;
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
}