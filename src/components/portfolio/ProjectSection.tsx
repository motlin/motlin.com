import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectSection as ProjectSectionType, EnhancedProject } from '../../data/projects';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import Heading from '@theme/Heading';

interface ProjectSectionProps {
  section: ProjectSectionType;
}

export function ProjectSection({ section }: ProjectSectionProps): React.JSX.Element {
  const repos = useGitHubRepos();

  const enhancedProjects: EnhancedProject[] = section.projects.map(project => {
    if (project.githubRepo && repos[project.githubRepo]) {
      const repoData = repos[project.githubRepo];
      return {
        ...project,
        stars: repoData.stargazers_count,
        pushedAt: repoData.pushed_at,
      };
    }
    return project;
  });

  return (
    <section style={{ marginBottom: '3.75rem' }}>
      <Heading as="h2" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        marginBottom: '1.25rem',
        paddingBottom: '0.625rem',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)'
      }}>
        <span style={{ width: '1.5rem', height: '1.5rem', opacity: 0.7 }}>
          {section.icon}
        </span>
        {section.title}
      </Heading>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {enhancedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
