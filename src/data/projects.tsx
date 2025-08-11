import React from 'react';
import { FaCircleDot, FaCube, FaFolder, FaRocket } from 'react-icons/fa6';
import portfolioData from './portfolio.json';

const CheckStyleMarketplaceIcon = () => (
  <div
    style={{
      backgroundColor: '#ffd33d',
      color: 'white',
      borderRadius: '6px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px'
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  </div>
);

const ForbidMergeCommitsMarketplaceIcon = () => (
  <div
    style={{
      backgroundColor: '#ffd33d',
      color: 'white',
      borderRadius: '6px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px'
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  </div>
);

const iconMap = {
  FaCircleDot: <FaCircleDot size={24} />,
  FaCube: <FaCube size={24} />,
  FaFolder: <FaFolder size={24} />,
  FaRocket: <FaRocket size={24} />
};

const customIconMap = {
  CheckStyleMarketplaceIcon: <CheckStyleMarketplaceIcon />,
  ForbidMergeCommitsMarketplaceIcon: <ForbidMergeCommitsMarketplaceIcon />
};

export interface Link {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  repoUrl: string;
  description: string;
  links: Link[];
  role?: string;
  customMeta?: string[];
  techStack?: string[];
  features?: string[];
  githubRepo?: string;
  iconUrl?: string;
  customIcon?: React.JSX.Element;
  openGraphImageUrl?: string;
}

export interface EnhancedProject extends Project {
  stars?: number;
  pushedAt?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  icon: React.JSX.Element;
  projects: Project[];
}

export const projectSections: ProjectSection[] = portfolioData.sections.map(section => ({
  ...section,
  icon: iconMap[section.icon as keyof typeof iconMap],
  projects: section.projects.map(project => ({
    ...project,
    customIcon: project.customIcon ? customIconMap[project.customIcon as keyof typeof customIconMap] : undefined
  }))
}));
