import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProjectCard } from '../../components/portfolio/ProjectCard';
import { projectSections } from '../../data/projects';

const meta = {
  title: 'Portfolio/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const factorioPrintsProject = projectSections[0].projects[0];
const eclipseCollectionsProject = projectSections[1].projects[0];
const liftwizardProject = projectSections[1].projects[1];

export const WebApplication: Story = {
  args: {
    project: factorioPrintsProject,
  },
};

export const WebApplicationDark: Story = {
  args: {
    project: factorioPrintsProject,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const MajorFramework: Story = {
  args: {
    project: eclipseCollectionsProject,
  },
};

export const MajorFrameworkDark: Story = {
  args: {
    project: eclipseCollectionsProject,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const WithOpenGraphImage: Story = {
  args: {
    project: liftwizardProject,
  },
};

export const WithOpenGraphImageDark: Story = {
  args: {
    project: liftwizardProject,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const WithCustomIcon: Story = {
  args: {
    project: {
      id: 'custom-icon-project',
      name: 'Custom Icon Project',
      repoUrl: 'https://github.com/example/project',
      description: 'A project with a custom icon component instead of an image URL.',
      links: [
        { url: 'https://github.com/example/project', label: 'GitHub' },
        { url: 'https://example.com', label: 'Website' },
      ],
      techStack: ['React', 'TypeScript'],
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      customIcon: <div style={{ fontSize: '2rem' }}>🚀</div>,
    },
  },
};

export const WithCustomIconDark: Story = {
  args: {
    project: {
      id: 'custom-icon-project',
      name: 'Custom Icon Project',
      repoUrl: 'https://github.com/example/project',
      description: 'A project with a custom icon component instead of an image URL.',
      links: [
        { url: 'https://github.com/example/project', label: 'GitHub' },
        { url: 'https://example.com', label: 'Website' },
      ],
      techStack: ['React', 'TypeScript'],
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      customIcon: <div style={{ fontSize: '2rem' }}>🚀</div>,
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const MinimalProject: Story = {
  args: {
    project: {
      id: 'minimal-project',
      name: 'Minimal Project',
      repoUrl: 'https://github.com/example/minimal',
      description: 'A project with minimal required fields.',
      links: [],
    },
  },
};

export const MinimalProjectDark: Story = {
  args: {
    project: {
      id: 'minimal-project',
      name: 'Minimal Project',
      repoUrl: 'https://github.com/example/minimal',
      description: 'A project with minimal required fields.',
      links: [],
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const MultipleProjects: Story = {
  args: {
    project: factorioPrintsProject,
  },
  render: () => (
    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
      <ProjectCard project={factorioPrintsProject} />
      <ProjectCard project={eclipseCollectionsProject} />
      <ProjectCard project={liftwizardProject} />
    </div>
  ),
};

export const MultipleProjectsDark: Story = {
  args: {
    project: factorioPrintsProject,
  },
  render: () => (
    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
      <ProjectCard project={factorioPrintsProject} />
      <ProjectCard project={eclipseCollectionsProject} />
      <ProjectCard project={liftwizardProject} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
