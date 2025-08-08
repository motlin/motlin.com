import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProjectSection } from '../../components/portfolio/ProjectSection';
import { projectSections } from '../../data/projects';
import { FaRocket, FaFolder } from 'react-icons/fa6';

const meta = {
  title: 'Portfolio/ProjectSection',
  component: ProjectSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const webApplicationsSection = projectSections[0];
const majorProjectsSection = projectSections[1];

export const WebApplications: Story = {
  args: {
    section: webApplicationsSection,
  },
};

export const WebApplicationsDark: Story = {
  args: {
    section: webApplicationsSection,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const MajorProjects: Story = {
  args: {
    section: majorProjectsSection,
  },
};

export const MajorProjectsDark: Story = {
  args: {
    section: majorProjectsSection,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const SingleProject: Story = {
  args: {
    section: {
      id: 'single-project-section',
      title: 'Featured Project',
      icon: <FaRocket />,
      projects: [webApplicationsSection.projects[0]],
    },
  },
};

export const SingleProjectDark: Story = {
  args: {
    section: {
      id: 'single-project-section',
      title: 'Featured Project',
      icon: <FaRocket />,
      projects: [webApplicationsSection.projects[0]],
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const EmptySection: Story = {
  args: {
    section: {
      id: 'empty-section',
      title: 'Coming Soon',
      icon: <FaFolder />,
      projects: [],
    },
  },
};

export const EmptySectionDark: Story = {
  args: {
    section: {
      id: 'empty-section',
      title: 'Coming Soon',
      icon: <FaFolder />,
      projects: [],
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
