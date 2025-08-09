import React from 'react';
import styles from './ProjectCard.module.css';
import { EnhancedProject } from '../../data/projects';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { FaGithub, FaBook, FaStore, FaGlobe, FaBlog, FaGamepad, FaHouse } from 'react-icons/fa6';
import { FaJava, FaPython, FaRust, FaPhp } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiKotlin, SiSwift, SiRuby, SiCplusplus, SiScala, SiClojure, SiLua, SiGo, SiCloudflare, SiFirebase, SiHtml5, SiReact, SiMdx, SiDocusaurus, SiApache, SiApachemaven, SiIntellijidea, SiHomebrew, SiGithubactions } from 'react-icons/si';
import Link from '@docusaurus/Link';
import Markdown from 'react-markdown';

interface ProjectCardProps {
  project: EnhancedProject;
}

const languageIcons: Record<string, React.ComponentType> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  Python: FaPython,
  'C++': SiCplusplus,
  Rust: FaRust,
  Go: SiGo,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  Ruby: SiRuby,
  PHP: FaPhp,
  Scala: SiScala,
  Clojure: SiClojure,
  Lua: SiLua
};

const techStackIcons: Record<string, React.ComponentType> = {
  'Cloudflare': SiCloudflare,
  'Cloudflare Pages': SiCloudflare,
  'Firebase': SiFirebase,
  'HTML5': SiHtml5,
  'HTML5 Canvas': SiHtml5,
  'React': SiReact,
  'MDX': SiMdx,
  'Docusaurus': SiDocusaurus,
  'Apache': SiApache,
  'Maven': SiApachemaven,
  'IntelliJ': SiIntellijidea,
  'Homebrew': SiHomebrew,
  'GitHub Actions': SiGithubactions
};

const licenseIcons: Record<string, React.ComponentType> = {
  'Apache-2.0': SiApache,
  'Apache License 2.0': SiApache
};

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const repos = useGitHubRepos();
  const repoData = project.githubRepo ? repos[project.githubRepo] : null;



  const description = repoData?.description || project.description;

  // Priority order: Play/Demo/Website links > Marketplace > Homepage > GitHub repo
  const priorityLabels = ['Play', 'Demo', 'Website', 'Marketplace', 'Homepage'];
  const priorityLink = project.links.find(link =>
    priorityLabels.includes(link.label)
  );

  const mainLink = priorityLink?.url || repoData?.homepage || project.repoUrl;

  const links = project.links;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on text or interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a') ||
        window.getSelection()?.toString() ||
        target.classList.contains(styles.matrixBadge)) {
      return;
    }

    if (mainLink) {
      if (e.ctrlKey || e.metaKey || e.button === 1) {
        window.open(mainLink, '_blank', 'noopener,noreferrer');
      } else {
        window.open(mainLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className={styles.projectCard} onClick={handleCardClick}>
      <div className={styles.project}>
        <div className={styles.projectContent}>
            <div className={styles.projectHeader}>
              {(project.customIcon || project.iconUrl) && (
                <div className={styles.projectLogo}>
                  {project.customIcon ? project.customIcon : (
                    <img
                      src={project.iconUrl}
                      alt={`${project.name} logo`}
                      className={styles.projectLogoImg}
                    />
                  )}
                </div>
              )}
              <span className={styles.projectTitle}>
                {project.name}
              </span>
            </div>

            <div className={styles.projectDescription}>
              <Markdown components={{
                p: ({children}) => <div className={styles.descriptionText}>{children}</div>
              }}>{description}</Markdown>
            </div>

            {project.openGraphImageUrl && (
              <div className={styles.socialMediaCard}>
                <img
                  src={project.openGraphImageUrl}
                  alt={`${project.name} social preview`}
                  className={styles.socialMediaImage}
                  loading="lazy"
                />
              </div>
            )}

            <div className={styles.badgesMatrix}>
              {links.length > 0 && (
                <>
                  <div className={styles.matrixLabel}>Links</div>
                  <div className={styles.matrixValues}>
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.url}
                        className={styles.matrixBadge}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label === 'GitHub' && <FaGithub className={styles.linkIcon} />}
                        {link.label === 'Docs' && <FaBook className={styles.linkIcon} />}
                        {link.label === 'Marketplace' && <FaStore className={styles.linkIcon} />}
                        {link.label === 'Website' && <FaGlobe className={styles.linkIcon} />}
                        {link.label === 'Blog' && <FaBlog className={styles.linkIcon} />}
                        {link.label === 'Play' && <FaGamepad className={styles.linkIcon} />}
                        {link.label === 'Homepage' && <FaHouse className={styles.linkIcon} />}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {project.features && project.features.length > 0 && (
                <>
                  <div className={styles.matrixLabel}>Features</div>
                  <div className={styles.matrixValues}>
                    {project.features.map((feature) => (
                      <span key={feature} className={styles.matrixBadge}>{feature}</span>
                    ))}
                  </div>
                </>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <>
                  <div className={styles.matrixLabel}>Tech Stack</div>
                  <div className={styles.matrixValues}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.matrixBadge}>
                        {techStackIcons[tech] && (
                          <span className={styles.linkIcon}>
                            {React.createElement(techStackIcons[tech])}
                          </span>
                        )}
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {repoData?.language && (
                <>
                  <div className={styles.matrixLabel}>Language</div>
                  <div className={styles.matrixValues}>
                    <span className={styles.matrixBadge}>
                      {languageIcons[repoData.language] && (
                        <span className={styles.linkIcon}>
                          {React.createElement(languageIcons[repoData.language])}
                        </span>
                      )}
                      {repoData.language}
                    </span>
                  </div>
                </>
              )}

              {repoData?.license && (
                <>
                  <div className={styles.matrixLabel}>License</div>
                  <div className={styles.matrixValues}>
                    <span className={styles.matrixBadge}>
                      {licenseIcons[repoData.license.spdx_id || repoData.license.name] && (
                        <span className={styles.linkIcon}>
                          {React.createElement(licenseIcons[repoData.license.spdx_id || repoData.license.name])}
                        </span>
                      )}
                      {repoData.license.spdx_id || repoData.license.name}
                    </span>
                  </div>
                </>
              )}

              {project.role && (
                <>
                  <div className={styles.matrixLabel}>Role</div>
                  <div className={styles.matrixValues}>
                    <span className={styles.matrixBadge}>{project.role}</span>
                  </div>
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
