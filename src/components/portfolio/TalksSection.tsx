import React from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { FaVideo } from 'react-icons/fa6';

interface Talk {
  id: string;
  event: string;
  eventUrl?: string;
  title: string;
  year?: number;
}

interface TalksSectionProps {
  talks: Talk[];
}

export function TalksSection({ talks }: TalksSectionProps): React.JSX.Element {
  return (
    <section style={{
      marginTop: '60px',
      padding: '60px 20px',
      background: 'var(--ifm-background-surface-color)',
      borderRadius: '60px 60px 30px 30px',
      position: 'relative'
    }}>
      <Heading as="h2" style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '60px',
        position: 'relative'
      }}>
        Conference Talks
      </Heading>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {talks.map((talk, index) => {
          const cardStyle: React.CSSProperties = {
            background: 'var(--ifm-background-color)',
            padding: '30px',
            borderRadius: index === 0 ? '40px 20px 20px 20px' :
                         index === 1 ? '20px 40px 20px 20px' :
                         index === 2 ? '20px 20px 40px 20px' : '20px',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            display: 'block',
            position: 'relative'
          };

          return (
            <div
              key={talk.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                if (talk.eventUrl) {
                  e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-200)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (talk.eventUrl) {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              {talk.year && (
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--ifm-color-emphasis-500)',
                  marginBottom: '5px'
                }}>
                  {talk.year}
                </div>
              )}
              <Heading as="h3" style={{
                fontWeight: '600',
                fontSize: '1.2rem',
                marginBottom: '10px'
              }}>
                {talk.event}
              </Heading>
              <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-700)' }}>
                {talk.title}
              </p>
              {talk.eventUrl && (
                <Link
                  href={talk.eventUrl}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: 'var(--ifm-color-primary)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <FaVideo />
                  <span>Watch Video</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
