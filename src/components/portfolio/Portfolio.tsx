import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { ProjectSection } from './ProjectSection';
import { TalksSection } from './TalksSection';
import { projectSections } from '../../data/projects';
import { useGitHubUserProfile } from '../../hooks/useGitHubUserProfile';
import { FaGithub, FaStackOverflow, FaLinkedinIn, FaMedium, FaLink, FaXTwitter } from 'react-icons/fa6';
import portfolioData from '../../data/portfolio.json';
import styles from './Portfolio.module.css';

function ProfileImage() {
  const profile = useGitHubUserProfile();
  return (
    <img
      className={styles.profileImage}
      src={profile?.avatar_url || portfolioData.profile.avatarUrl}
      alt={portfolioData.profile.name}
    />
  );
}

function ProfileName() {
  const profile = useGitHubUserProfile();
  return profile?.name || portfolioData.profile.name;
}

function ProfileBio() {
  const profile = useGitHubUserProfile();
  return profile?.bio || portfolioData.profile.bio;
}

const iconMap = {
  FaGithub: <FaGithub />,
  FaStackOverflow: <FaStackOverflow />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaMedium: <FaMedium />,
  FaLink: <FaLink />,
  FaXTwitter: <FaXTwitter />
};

export function Portfolio() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileSection}>
          <div className={styles.profileImageContainer}>
            <ProfileImage />
          </div>
          <div className={styles.socialLinks}>
            {portfolioData.profile.socialLinks.map(link => (
              <Link key={link.platform} href={link.url} className={styles.socialLink}>
                {iconMap[link.icon]}
                <span>{link.platform}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.headerContent}>
          <Heading as="h1" className={styles.title}><ProfileName /></Heading>
          <strong className={styles.subtitle}>{portfolioData.profile.tagline}</strong>
          <div className={styles.bio}>
            <ProfileBio />
          </div>
        </div>
      </div>

      <Heading as="h2">Projects</Heading>

      {projectSections.map((section) => (
        <ProjectSection key={section.id} section={section} />
      ))}

      <hr />

      <Heading as="h2">Conference Talks</Heading>

      <TalksSection talks={portfolioData.talks} />
    </div>
  );
}
