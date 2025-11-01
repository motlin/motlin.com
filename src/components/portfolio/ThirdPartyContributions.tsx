import React from 'react';
import styles from './ThirdPartyContributions.module.css';
import { FaStar, FaCodeBranch } from 'react-icons/fa';
import Heading from '@theme/Heading';
import { Project } from '../../data/projects';

interface ThirdPartyContributionsProps {
  projects: Project[];
}

export function ThirdPartyContributions({ projects }: ThirdPartyContributionsProps): React.JSX.Element {
  const sortedProjects = [...projects].sort((a, b) => (b.stars || 0) - (a.stars || 0));

  const handleCardClick = (project: Project) => () => {
    if (window.getSelection()?.toString()) {
      return;
    }

    const myContributionsUrl = project.links.find(link => link.label === 'My Contributions')?.url;

    if (myContributionsUrl) {
      window.open(myContributionsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles.contributionsList}>
      {sortedProjects.map(project => (
          <div
            key={project.id}
            className={styles.contributionItem}
            onClick={handleCardClick(project)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.projectHeader}>
              <Heading as="h3" className={styles.projectName}>
                {project.name}
              </Heading>
              <div className={styles.projectStats}>
                {project.stars && project.stars > 0 && (
                  <span className={styles.stars}>
                    <FaStar /> {project.stars.toLocaleString()}
                  </span>
                )}
                {project.contributionCount && project.contributionCount > 0 && (
                  <span className={styles.contributions}>
                    <FaCodeBranch /> My {project.contributionCount} PR{project.contributionCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        ))}
    </div>
  );
}
