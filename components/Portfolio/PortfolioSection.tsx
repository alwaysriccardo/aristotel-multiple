import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Portfolio, Project, MediaItem } from '../../portfolioTypes';

export const PortfolioSection: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({ projects: [] });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio/get');
      const data = await response.json();
      setPortfolio(data);
      if (data.projects.length > 0) {
        setSelectedProjectId(data.projects[0].id);
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProject = portfolio.projects.find(p => p.id === selectedProjectId);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 200;
    const newScrollLeft = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.loading}>Loading portfolio...</div>
      </section>
    );
  }

  if (portfolio.projects.length === 0) {
    return null; // Don't show section if no projects
  }

  return (
    <>
      <section style={styles.section} id="portfolio">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>OUR PORTFOLIO</h2>
          
          {/* Project Tabs */}
          <div style={styles.tabsWrapper}>
            <button 
              onClick={() => scrollProjects('left')} 
              style={styles.scrollBtn}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div style={styles.tabsContainer} ref={scrollContainerRef}>
              {portfolio.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  style={{
                    ...styles.tab,
                    ...(selectedProjectId === project.id ? styles.tabActive : {}),
                  }}
                >
                  <span style={styles.tabTitle}>{project.title}</span>
                  {project.subtitle && (
                    <span style={styles.tabSubtitle}>{project.subtitle}</span>
                  )}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => scrollProjects('right')} 
              style={styles.scrollBtn}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Media Grid */}
          {selectedProject && (
            <div style={styles.mediaGrid}>
              {selectedProject.media.length === 0 ? (
                <p style={styles.emptyText}>No media available for this project</p>
              ) : (
                selectedProject.media.map((media, index) => (
                  <div
                    key={index}
                    style={styles.mediaItem}
                    onClick={() => setLightboxMedia(media)}
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={media.caption || ''}
                        style={styles.mediaImage}
                        loading="lazy"
                      />
                    ) : (
                      <div style={styles.videoWrapper}>
                        <video
                          src={media.url}
                          style={styles.mediaImage}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                        <div style={styles.playIcon}>▶</div>
                      </div>
                    )}
                    {media.caption && (
                      <div style={styles.mediaCaption}>{media.caption}</div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxMedia && (
        <div style={styles.lightbox} onClick={() => setLightboxMedia(null)}>
          <button 
            style={styles.closeBtn} 
            onClick={() => setLightboxMedia(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {lightboxMedia.type === 'image' ? (
              <img
                src={lightboxMedia.url}
                alt={lightboxMedia.caption || ''}
                style={styles.lightboxMedia}
              />
            ) : (
              <video
                src={lightboxMedia.url}
                style={styles.lightboxMedia}
                controls
                autoPlay
              />
            )}
            {lightboxMedia.caption && (
              <p style={styles.lightboxCaption}>{lightboxMedia.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  section: {
    padding: '80px 20px',
    background: '#f9f9f9',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: '700',
    textAlign: 'center' as const,
    marginBottom: '60px',
    letterSpacing: '2px',
  },
  tabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '50px',
    position: 'relative' as const,
  },
  scrollBtn: {
    padding: '12px',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tabsContainer: {
    display: 'flex',
    gap: '15px',
    overflowX: 'auto' as const,
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    flex: 1,
    padding: '10px 0',
  },
  tab: {
    padding: '16px 32px',
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    minWidth: 'fit-content',
  },
  tabActive: {
    background: '#2196F3',
    borderColor: '#2196F3',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
  },
  tabTitle: {
    fontSize: '16px',
    fontWeight: '600',
  },
  tabSubtitle: {
    fontSize: '12px',
    opacity: 0.8,
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  mediaItem: {
    position: 'relative' as const,
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  mediaImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover' as const,
    display: 'block',
  },
  videoWrapper: {
    position: 'relative' as const,
  },
  playIcon: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '48px',
    color: 'white',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    pointerEvents: 'none' as const,
  },
  mediaCaption: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center' as const,
    color: '#999',
    fontSize: '16px',
    padding: '40px',
    gridColumn: '1 / -1',
  },
  loading: {
    textAlign: 'center' as const,
    fontSize: '18px',
    color: '#666',
    padding: '60px 20px',
  },
  lightbox: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  },
  lightboxContent: {
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
  },
  lightboxMedia: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain' as const,
    borderRadius: '8px',
  },
  lightboxCaption: {
    color: 'white',
    fontSize: '16px',
    textAlign: 'center' as const,
  },
};
