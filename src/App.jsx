import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Simple Carousel Component
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/imgquote/liklikdrama-img5.jpg', // img5
    '/imgquote/liklikdrama-img2.jpg', // img2
    '/imgquote/liklikdrama-img8.jpg', // img8
    '/imgquote/liklikdrama-img1.jpg', // img1
    '/imgquote/liklikdrama-img9.jpg', // img9
    '/imgquote/liklikdrama-img6.jpg', // img6
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  function goToPrevious() {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  }

  function goToNext() {
    setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>&#10094;</button>
        <div className="carousel-image-container">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        </div>
        <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>&#10095;</button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button key={index} className={`indicator ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)} />
        ))}
      </div>
    </div>
  );
}

// Simple Nav Component with scroll-aware logo and mobile menu
function Nav({ showLogo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', key: 'home' },
    { path: '/production', label: 'Production', key: 'production' },
    { path: '/interaction', label: 'Interaction', key: 'interaction' },
    { path: '/about', label: 'About Us', key: 'about' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`main-nav ${showLogo ? 'show-logo' : 'hide-logo'}`}>
      <div className="nav-content">
        {showLogo && (
          <div className="nav-logo">
            <img src="/imgquote/liklikdrama-logo.png" alt="LiklikDrama Logo" className="nav-logo-image" />
          </div>
        )}
        
        {/* Mobile Menu Toggle */}
        <div className="nav-toggle" onClick={toggleMobileMenu}>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.key}>
              <a 
                href={item.path}
                className="nav-link"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Simple Header Component with Logo Image
function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-section">
          <img src="/imgquote/liklikdrama-logo.png" alt="LiklikDrama Logo" className="logo-image" />
        </div>
      </div>
    </header>
  );
}

// Simple WhatWeProvide Component with Enhanced Styling
function WhatWeProvide() {
  const services = [
    { 
      title: 'Film & Video Production', 
      description: 'From grassroots storytelling to polished short films, documentaries, and digital campaigns that capture authentic PNG narratives.',
      icon: '◆',
      features: ['Professional Equipment', 'Experienced Crew', 'High-Quality Output']
    },
    { 
      title: 'Design & Branding', 
      description: 'Authentic, youth-driven visuals and brand strategies that resonate locally and globally, creating meaningful connections.',
      icon: '◈',
      features: ['Creative Design', 'Brand Strategy', 'Visual Identity']
    },
    { 
      title: 'Digital Marketing', 
      description: 'Scalable campaigns that amplify voices, connect communities, and engage audiences online with measurable results.',
      icon: '◉',
      features: ['Social Media', 'Content Strategy', 'Analytics']
    },
    { 
      title: 'Creative Competitions', 
      description: 'Platforms for PNG youth to showcase talent, collaborate, and gain industry exposure in a supportive environment.',
      icon: '★',
      features: ['Talent Discovery', 'Skill Building', 'Recognition']
    },
    { 
      title: 'Training & Mentorship', 
      description: 'Beginner-friendly guidance and hands-on support to build skills in storytelling, design, and production.',
      icon: '◆',
      features: ['Workshops', 'One-on-One', 'Career Development']
    }
  ];

  return (
    <section className="what-we-provide">
      <div className="provide-header">
        <h2>◆ What We Provide</h2>
        <p className="provide-subtitle">Empowering PNG youth through creative excellence and cultural storytelling</p>
      </div>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card enhanced">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-features">
              {service.features.map((feature, idx) => (
                <span key={idx} className="feature-tag">{feature}</span>
              ))}
            </div>
            <button className="service-learn-more">Learn More</button>
          </div>
        ))}
      </div>
      
      <div className="provide-footer">
        <div className="provide-stats">
          <div className="stat-item">
            <h4>500+</h4>
            <p>Stories Created</p>
          </div>
          <div className="stat-item">
            <h4>50+</h4>
            <p>Creators Trained</p>
          </div>
          <div className="stat-item">
            <h4>100+</h4>
            <p>Community Members</p>
          </div>
        </div>
        <div className="provide-cta">
          <h3>Ready to Start Your Journey?</h3>
          <p>Join our creative community and bring your stories to life</p>
          <button className="cta-button">Get Started Today</button>
        </div>
      </div>
    </section>
  );
}

// Page Components
function Home() {
  const [showNavLogo, setShowNavLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavLogo(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <Nav showLogo={showNavLogo} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to LiklikDrama</h1>
            <p className="hero-subtitle">Where PNG stories come to life through creative expression and cultural celebration</p>
            <div className="hero-cta">
              <button className="cta-button">Explore Our Stories</button>
              <button className="cta-button secondary">Join Our Community</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="featured-carousel">
        <div className="section-header">
          <h2>◆ Featured Stories</h2>
          <p>Explore our latest creative productions and cultural showcases</p>
        </div>
        <Carousel />
      </section>

      {/* What We Provide */}
      <WhatWeProvide />

      {/* Combined Sections - Side by Side */}
      <section className="combined-sections">
        <div className="sections-container">
          {/* Community Spotlight */}
          <div className="section-block spotlight-block">
            <div className="spotlight-header">
              <h2>◈ Community Spotlight</h2>
              <p>Highlighting talented creators and storytellers</p>
            </div>
            <div className="spotlight-content">
              <div className="spotlight-item">
                <div className="spotlight-icon">◆</div>
                <h3>Emerging Voices</h3>
                <p>Discover new talent from across PNG sharing unique perspectives</p>
              </div>
              <div className="spotlight-item">
                <div className="spotlight-icon">◉</div>
                <h3>Cultural Heritage</h3>
                <p>Preserving traditional stories through digital storytelling</p>
              </div>
              <div className="spotlight-item">
                <div className="spotlight-icon">★</div>
                <h3>Creative Innovation</h3>
                <p>Pushing boundaries with experimental formats</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="section-block events-block">
            <div className="events-header">
              <h2>◆ Upcoming Events</h2>
              <p>Join workshops, screenings, and gatherings</p>
            </div>
            <div className="events-content">
              <div className="event-card">
                <div className="event-icon">◈</div>
                <h4>Storytelling Workshop</h4>
                <p><strong>Date:</strong> Coming Soon</p>
                <p><strong>Location:</strong> Port Moresby</p>
                <p>Learn digital storytelling from experienced creators</p>
                <button className="event-button">Learn More</button>
              </div>
              <div className="event-card">
                <div className="event-icon">★</div>
                <h4>Creator Meetup</h4>
                <p><strong>Date:</strong> Bi-weekly</p>
                <p><strong>Location:</strong> Culture Sphere Hub</p>
                <p>Network with fellow creators</p>
                <button className="event-button">Join Us</button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="section-block cta-block">
            <div className="cta-content">
              <h2>◆ Be Part of Our Story</h2>
              <p>Join LiklikDrama today and help shape PNG digital storytelling</p>
              <div className="cta-buttons">
                <button className="cta-button large">Get Started</button>
                <button className="cta-button secondary large">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Production() {
  const [showNavLogo, setShowNavLogo] = useState(true);
  const [showVideoCriteria, setShowVideoCriteria] = useState(false);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    category: 'shortfilm',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    videoFile: null,
    videoUrl: '',
    duration: '',
    language: 'english',
    district: '',
    province: '',
    clan: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowNavLogo(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    
    // Create email submission
    const subject = encodeURIComponent(`Video Submission: ${videoData.title}`);
    const body = encodeURIComponent(
      `Video Submission Details:\n\n` +
      `Title: ${videoData.title}\n` +
      `Description: ${videoData.description}\n` +
      `Category: ${videoData.category}\n` +
      `Duration: ${videoData.duration}\n` +
      `Language: ${videoData.language}\n\n` +
      `Creator Information:\n` +
      `Name: ${videoData.contactName}\n` +
      `Email: ${videoData.contactEmail}\n` +
      `Phone: ${videoData.contactPhone}\n\n` +
      `Geographic Information:\n` +
      `District: ${videoData.district}\n` +
      `Province: ${videoData.province}\n` +
      `Clan: ${videoData.clan}\n\n` +
      `Video Information:\n` +
      `File: ${videoData.videoFile ? videoData.videoFile.name : 'URL provided'}\n` +
      `URL: ${videoData.videoUrl}\n\n` +
      `Please review this submission for consideration in our production portfolio.`
    );
    
    window.location.href = `mailto:info@culturesphere.com.au?subject=${subject}&body=${body}`;
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file is too large. Please upload a video smaller than 100MB or provide a URL instead.');
        return;
      }
      
      // Check file type
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid video format. Please upload MP4, AVI, MOV, WMV, FLV, or WebM files.');
        return;
      }
      
      setVideoData(prev => ({
        ...prev,
        videoFile: file
      }));
    }
  };

  const portfolioItems = [
    {
      title: "Island Dreams",
      category: "Short Film",
      description: "A captivating story of hope and ambition set against the backdrop of Papua New Guinea's stunning landscapes.",
      image: "liklikdrama-img1"
    },
    {
      title: "Market Voices",
      category: "Documentary",
      description: "An intimate look at the daily lives and stories of local market vendors in Port Moresby.",
      image: "liklikdrama-img2"
    },
    {
      title: "Digital Warriors",
      category: "Music Video",
      description: "A vibrant celebration of PNG's digital culture and the young creators shaping its future.",
      image: "liklikdrama-img3"
    }
  ];

  return (
    <>
      <Header />
      <Nav showLogo={showNavLogo} />
      
      {/* Production Hero Section */}
      <section className="production-hero">
        <div className="production-hero-content">
          <div className="production-hero-text">
            <div className="production-hero-cta" style={{ textAlign: 'center' }}>
              <button 
                className="cta-button" 
                onClick={() => {
                  const portfolioSection = document.querySelector('.portfolio-showcase');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Our Portfolio
              </button>
              <button 
                className="cta-button secondary" 
                onClick={() => {
                  const videoSection = document.querySelector('.video-submission');
                  if (videoSection) {
                    videoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Carousel />
        
        <div className="audition-info">
          <h2>◆ SHORT FILM CASTING CALL ◆</h2>
          <p>Be part of our next big production with Drama Liklik Culture Sphere</p>
          
          <div className="audition-details">
            <div className="detail-section">
              <h3>◈ Casting Requirements</h3>
              <ul>
                <li><strong>Gender:</strong> Males and Females</li>
                <li><strong>Age Range:</strong> 21 - 25 years</li>
                <li><strong>Experience:</strong> No prior experience required</li>
                <li><strong>Attitude:</strong> Passionate and committed individuals</li>
              </ul>
            </div>
            
            <div className="detail-section">
              <h3>◉ Audition Details</h3>
              <ul>
                <li><strong>Date:</strong> Coming Soon</li>
                <li><strong>Time:</strong> To be announced</li>
                <li><strong>Location:</strong> Port Moresby (Venue TBD)</li>
                <li><strong>Status:</strong> Auditions in preparation</li>
              </ul>
            </div>
            
            <div className="detail-section">
              <h3>✉ Contact Information</h3>
              <ul>
                <li><strong>Phone:</strong> 7002 1249</li>
                <li><strong>Email:</strong> info@culturesphere.com.au</li>
                <li><strong>Social:</strong> Follow us on TikTok & Facebook</li>
                <li><strong>Website:</strong> www.liklikdrama.com</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="services-showcase">
          <h2>◆ Our Production Services</h2>
          <div className="service-item">
            <h3>◆ Video Production</h3>
            <p>Corporate videos, event coverage, promotional content, interviews, training videos, documentaries</p>
          </div>
          <div className="service-item">
            <h3>◆ Photography</h3>
            <p>Event photography, corporate headshots, product photography, lifestyle photography, aerial photography</p>
          </div>
          <div className="service-item">
            <h3>◆ Graphic Design</h3>
            <p>Logo design, branding packages, marketing materials, social media graphics, print design, web graphics</p>
          </div>
          <div className="service-item">
            <h3>◆ Social Media Management</h3>
            <p>Content creation, social media strategy, community management, analytics and reporting, paid advertising</p>
          </div>
          <div className="service-item">
            <h3>◆ Live Streaming</h3>
            <p>Event live streaming, multi-camera setup, professional audio, virtual event production, webinar hosting</p>
          </div>
          <div className="service-item">
            <h3>◆ Audio Production</h3>
            <p>Voice recording, music production, podcast production, audio editing, sound design, mixing and mastering</p>
          </div>
        </div>

        {/* Traditional Video Call to Action */}
        <section className="traditional-video-cta">
          <div className="cta-content">
            <div className="cta-text">
              <h2>🌺 Share Your Cultural Heritage!</h2>
              <p class="cta-subtitle">Your traditional dances, cooking methods, and songs are treasures that deserve to be shared with the world!</p>
              <div className="cta-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">💃</span>
                  <div className="highlight-text">
                    <h3>Traditional Dances</h3>
                    <p>Showcase your cultural movements and rhythms</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🍳</span>
                  <div className="highlight-text">
                    <h3>Traditional Cooking</h3>
                    <p>Share ancestral recipes and cooking techniques</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎵</span>
                  <div className="highlight-text">
                    <h3>Traditional Songs</h3>
                    <p>Preserve your musical heritage and stories</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎭</span>
                  <div className="highlight-text">
                    <h3>Cultural Stories</h3>
                    <p>Tell tales passed down through generations</p>
                  </div>
                </div>
              </div>
              <div className="cta-message">
                <p><strong>🎬 Your Culture Deserves the Spotlight!</strong></p>
                <p>Every traditional dance move, every cooking technique, every song lyric - they're all part of Papua New Guinea's rich cultural tapestry. By sharing your videos, you're not just creating content - you're preserving heritage for future generations!</p>
                <div className="cta-features">
                  <div className="feature-point">
                    <span class="feature-icon">✨</span>
                    <span>Preserve Cultural Heritage</span>
                  </div>
                  <div className="feature-point">
                    <span class="feature-icon">🌍</span>
                    <span>Share with Global Audience</span>
                  </div>
                  <div className="feature-point">
                    <span class="feature-icon">🎯</span>
                    <span>Connect with PNG Creators</span>
                  </div>
                  <div className="feature-point">
                    <span class="feature-icon">🏆</span>
                    <span>Get Featured in Our Portfolio</span>
                  </div>
                </div>
              </div>
              <div className="cta-buttons">
                <button 
                  className="cta-button large primary"
                  onClick={() => {
                    // Scroll to video submission
                    const videoSection = document.querySelector('.video-submission');
                    if (videoSection) {
                      videoSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  🎬 Submit Your Traditional Video Now!
                </button>
                <button className="cta-button large secondary">
                  📖 Learn More About Our Mission
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Video Submission Section */}
        <section className="video-submission">
          <div className="submission-header">
            <h2>🎬 Submit Your Video</h2>
            <p>Share your creative work with our community. We welcome videos from Papua New Guinea creators.</p>
            <button className="criteria-button" onClick={() => setShowVideoCriteria(true)}>
              📋 View Video Submission Criteria
            </button>
          </div>
          
          <div className="submission-content">
            <div className="submission-form">
              <form onSubmit={handleVideoSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="videoTitle">Video Title *</label>
                    <input
                      type="text"
                      id="videoTitle"
                      value={videoData.title}
                      onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                      required
                      placeholder="Enter your video title"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="videoCategory">Category *</label>
                    <select
                      id="videoCategory"
                      value={videoData.category}
                      onChange={(e) => setVideoData({...videoData, category: e.target.value})}
                      required
                    >
                      <option value="shortfilm">Short Film</option>
                      <option value="documentary">Documentary</option>
                      <option value="musicvideo">Music Video</option>
                      <option value="commercial">Commercial</option>
                      <option value="animation">Animation</option>
                      <option value="experimental">Experimental</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoDescription">Video Description *</label>
                  <textarea
                    id="videoDescription"
                    value={videoData.description}
                    onChange={(e) => setVideoData({...videoData, description: e.target.value})}
                    required
                    rows="4"
                    placeholder="Describe your video, its story, and what makes it special..."
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="videoDuration">Duration *</label>
                    <input
                      type="text"
                      id="videoDuration"
                      value={videoData.duration}
                      onChange={(e) => setVideoData({...videoData, duration: e.target.value})}
                      required
                      placeholder="e.g., 5:30 (5 minutes 30 seconds)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="videoLanguage">Language *</label>
                    <select
                      id="videoLanguage"
                      value={videoData.language}
                      onChange={(e) => setVideoData({...videoData, language: e.target.value})}
                      required
                    >
                      <option value="english">English</option>
                      <option value="tokpisin">Tok Pisin</option>
                      <option value="tokpisin-english">Tok Pisin & English</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoFile">Upload Video File</label>
                  <input
                    type="file"
                    id="videoFile"
                    onChange={handleVideoFileChange}
                    accept="video/mp4,video/avi,video/mov,video/wmv,video/flv,video/webm"
                    className="file-input"
                  />
                  <p className="file-hint">Maximum file size: 100MB. Supported formats: MP4, AVI, MOV, WMV, FLV, WebM</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoUrl">Or provide video URL</label>
                  <input
                    type="url"
                    id="videoUrl"
                    value={videoData.videoUrl}
                    onChange={(e) => setVideoData({...videoData, videoUrl: e.target.value})}
                    placeholder="https://youtube.com/watch?v=... or other video URL"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactName">Your Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      value={videoData.contactName}
                      onChange={(e) => setVideoData({...videoData, contactName: e.target.value})}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={videoData.contactEmail}
                      onChange={(e) => setVideoData({...videoData, contactEmail: e.target.value})}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={videoData.contactPhone}
                    onChange={(e) => setVideoData({...videoData, contactPhone: e.target.value})}
                    placeholder="+675 XXX XXX XXX"
                  />
                </div>
                
                <div className="geographic-info">
                  <h3>Geographic Information *</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="district">District *</label>
                      <input
                        type="text"
                        id="district"
                        value={videoData.district}
                        onChange={(e) => setVideoData({...videoData, district: e.target.value})}
                        required
                        placeholder="Enter your district"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="province">Province *</label>
                      <input
                        type="text"
                        id="province"
                        value={videoData.province}
                        onChange={(e) => setVideoData({...videoData, province: e.target.value})}
                        required
                        placeholder="Enter your province"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="clan">Clan *</label>
                      <input
                        type="text"
                        id="clan"
                        value={videoData.clan}
                        onChange={(e) => setVideoData({...videoData, clan: e.target.value})}
                        required
                        placeholder="Enter your clan"
                      />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="submit-button">Submit Your Video</button>
              </form>
            </div>
            
            <div className="submission-info">
              <div className="info-card">
                <h3>◆ Video Guidelines</h3>
                <ul>
                  <li>Videos must be from Papua New Guinea creators</li>
                  <li>Content should be appropriate for all audiences</li>
                  <li>Maximum duration: 15 minutes recommended</li>
                  <li>Must include proper credits and permissions</li>
                  <li>Original content only (no copyrighted material)</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>◉ Why Submit Your Video?</h3>
                <ul>
                  <li>Showcase your creative talent to our community</li>
                  <li>Connect with other PNG creators</li>
                  <li>Get featured in our production portfolio</li>
                  <li>Potential collaboration opportunities</li>
                  <li>Share your cultural stories with the world</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Video Criteria Popup */}
        {showVideoCriteria && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            minHeight: '100vh',
            width: '100vw'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '2px solid rgba(212, 165, 116, 0.3)',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              zIndex: 100000
            }}>
              <h3 style={{
                color: '#d4a574',
                fontSize: '24px',
                marginBottom: '20px',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>🎬 Video Submission Criteria</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 25px 0'
              }}>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Must include the district, province, and clan of the creator
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Must include the name of the creator and their contact details
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Video must be from Papua New Guinea and reflect PNG culture
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Must be original work with proper permissions for all content
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Content should be appropriate for all ages and respectful
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> Maximum duration: 15 minutes recommended
                </li>
                <li style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '15px',
                  paddingLeft: '25px',
                  position: 'relative',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#ff8c42',
                    fontSize: '14px'
                  }}>◆</span> File size limit: 100MB (or provide URL for larger files)
                </li>
              </ul>
              <button 
                onClick={() => setShowVideoCriteria(false)}
                style={{
                  background: 'linear-gradient(135deg, #d4a574, #ff8c42)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 30px',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  display: 'block',
                  margin: '0 auto',
                  boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Production CTA */}
        <section className="production-cta">
          <div className="production-cta-content">
            <h2>★ Ready to Create Something Amazing?</h2>
            <p>Let us bring your story to life with our professional production services</p>
            <button className="cta-button large">Get Started Today</button>
          </div>
        </section>
      </div>
    </>
  );
}

function Interaction() {
  const [showNavLogo, setShowNavLogo] = useState(true);
  const [showCriteria, setShowCriteria] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [transcript, setTranscript] = useState('');
  const [formData, setFormData] = useState({
    story: '',
    name: '',
    email: '',
    category: 'traditional'
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowNavLogo(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Story Submission: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nStory:\n${formData.story}`
    );
    window.location.href = `mailto:info@culturesphere.com.au?subject=${subject}&body=${body}`;
  };

  // Simplified speech recognition
  const startRecording = () => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech-to-text is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;
    
    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('');
    };
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setTranscript(finalTranscript + interimTranscript);
    };
    
    recognition.onerror = (event) => {
      setIsRecording(false);
      const errorMessages = {
        'no-speech': 'No speech detected. Please try speaking clearly.',
        'audio-capture': 'Microphone access denied. Please allow microphone access.',
        'not-allowed': 'Microphone access denied. Please allow microphone access.',
        'network': 'Network error. Please check your internet connection.',
        'service-not-allowed': 'Speech recognition service unavailable. Please try again later.'
      };
      alert(errorMessages[event.error] || `Speech recognition error: ${event.error}`);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };

  const requestMicrophoneAccess = async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop the stream - we just wanted permission
      stream.getTracks().forEach(track => track.stop());
      
      // Now start speech recognition
      startRecording();
    } catch (error) {
      console.error('Microphone access error:', error);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        alert('🎤 Microphone access was denied.\n\nTo enable speech-to-text:\n1. Click the microphone icon in your browser\'s address bar\n2. Select "Allow" or "Allow while using this site"\n3. Refresh the page and try again');
      } else if (error.name === 'NotFoundError') {
        alert('🎤 No microphone found.\n\nPlease ensure you have a microphone connected and try again.');
      } else {
        alert('🎤 Microphone access error.\n\nPlease check your microphone settings and try again.');
      }
    }
  };

  // Simplified Tok Pisin processing
  const processTokPisinText = (text) => {
    if (!text) return '';
    
    // Common Tok Pisin corrections (simplified)
    const corrections = {
      'yumi': 'yumi', 'mi': 'mi', 'yu': 'yu', 'long': 'long', 'bilong': 'bilong',
      'wantok': 'wantok', 'lukim': 'lukim', 'go': 'go', 'kamap': 'kamap',
      'stori': 'stori', 'pait': 'pait', 'gutpela': 'gutpela', 'gut': 'gut',
      'nogut': 'nogut', 'tasol': 'tasol', 'olsem': 'olsem',
      'wanpela': 'wanpela', 'tupela': 'tupela', 'tripela': 'tripela',
      'haus': 'haus', 'kaikai': 'kaikai', 'kisim': 'kisim', 'manmeri': 'manmeri',
      'pikinini': 'pikinini', 'wok': 'wok', 'toktok': 'toktok', 'brata': 'brata',
      'sista': 'sista', 'mama': 'mama', 'papa': 'papa', 'bikpela': 'bikpela',
      'dispela': 'dispela', 'arere': 'arere', 'we': 'we', 'inap': 'inap',
      'bikos': 'bikos', 'kain': 'kain', 'wara': 'wara', 'wele': 'wele',
      'singsing': 'singsing', 'trabel': 'trabel', 'helpim': 'helpim',
      'giaman': 'giaman', 'save': 'save', 'lukautim': 'lukautim',
      'mekim': 'mekim', 'tokim': 'tokim', 'preim': 'preim', 'baimbai': 'baimbai'
    };
    
    return text.toLowerCase().split(' ').map(word => 
      corrections[word.trim()] || word
    ).join(' ');
  };

  const addTokPisinPunctuation = (text) => {
    if (!text) return '';
    return text.replace(/[?!.,:;]/g, match => ` ${match}`);
  };

  const detectLanguage = (text) => {
    if (!text) return 'english';
    
    // Simple Tok Pisin detection
    const tokPisinWords = ['yumi', 'mi', 'yu', 'long', 'bilong', 'wantok', 'lukim', 'go', 'kamap', 'stori', 'pait', 'gutpela', 'gut', 'nogut', 'tasol', 'olsem', 'wanpela', 'tupela', 'tripela', 'haus', 'kaikai', 'kisim', 'manmeri', 'pikinini', 'wok', 'toktok', 'brata', 'sista', 'mama', 'papa', 'bikpela', 'dispela', 'arere', 'we', 'inap', 'bikos', 'kain', 'wara', 'wele', 'singsing', 'trabel', 'helpim', 'giaman', 'save', 'lukautim', 'mekim', 'tokim', 'preim', 'baimbai'];
    
    const words = text.toLowerCase().split(' ').filter(w => w.length > 0);
    const tokPisinCount = words.filter(word => tokPisinWords.includes(word)).length;
    
    return words.length > 0 && tokPisinCount / words.length > 0.3 ? 'tokpisin' : 'english';
  };

  const smartProcessText = (text) => {
    if (!text) return '';
    
    const isTokPisin = detectLanguage(text) === 'tokpisin';
    return isTokPisin ? addTokPisinPunctuation(processTokPisinText(text)) : addTokPisinPunctuation(text);
  };

  const autoProcessText = () => {
    const currentText = formData.story;
    const processedText = smartProcessText(currentText);
    setFormData(prev => ({
      ...prev,
      story: processedText
    }));
  };

  return (
    <>
      <Header />
      <Nav showLogo={showNavLogo} />
      
      {/* Interaction Hero Section */}
      <section className="interaction-hero">
        <div className="interaction-hero-content">
          <div className="interaction-hero-text">
            <h1>◆ Share Your Story</h1>
            <p className="interaction-hero-subtitle">Every story matters. Share your unique PNG experience and connect with our community of storytellers</p>
            <div className="interaction-hero-cta">
              <button className="cta-button">Submit Your Story</button>
              <button className="cta-button secondary">Read Stories</button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Carousel />
        
        {/* Story Submission Section */}
        <section className="story-submission">
          <div className="submission-header">
            <h2>◈ Submit Your Story</h2>
            <p>We want traditional stories from Papua New Guinea. Share your cultural heritage with our community.</p>
            <button className="criteria-button" onClick={() => {
              console.log('Criteria button clicked');
              setShowCriteria(true);
            }}>
              📋 View Story Submission Criteria
            </button>
          </div>
          
          <div className="submission-content">
            <div className="submission-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Story Category *</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="traditional">Traditional Stories</option>
                    <option value="contemporary">Contemporary Stories</option>
                    <option value="everyday">Everyday Life</option>
                    <option value="cultural">Cultural Heritage</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="story">Your Story *</label>
                  <div className="story-input-container">
                    <textarea
                      id="story"
                      value={formData.story}
                      onChange={(e) => setFormData({...formData, story: e.target.value})}
                      required
                      rows="8"
                      placeholder="Share your story here. Tell us about the characters, setting, and what makes this story special to you and your community..."
                      className="story-textarea"
                    />
                    <div className="speech-controls">
                      <div className="language-selector">
                        <label>Language:</label>
                        <div className="language-options">
                          <label className="language-option">
                            <input
                              type="radio"
                              name="language"
                              value="en-US"
                              checked={selectedLanguage === 'en-US'}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                            />
                            <span className="language-label">English</span>
                          </label>
                          <label className="language-option">
                            <input
                              type="radio"
                              name="language"
                              value="en-PG"
                              checked={selectedLanguage === 'en-PG'}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                            />
                            <span className="language-label">Tok Pisin (PNG)</span>
                          </label>
                          <label className="language-option">
                            <input
                              type="radio"
                              name="language"
                              value="auto"
                              checked={selectedLanguage === 'auto'}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                            />
                            <span className="language-label">Auto-Detect</span>
                          </label>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={isRecording ? stopRecording : requestMicrophoneAccess}
                        className={`speech-button ${isRecording ? 'recording' : ''}`}
                      >
                        {isRecording ? '⏹️ Stop Recording' : '🎤 Tell Your Story'}
                      </button>
                      {isListening && (
                        <div className="listening-indicator">
                          <span className="listening-dot"></span>
                          Listening...
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={autoProcessText}
                        className="auto-process-button"
                      >
                        🔄 Auto-Process Text
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const processedText = smartProcessText(formData.story);
                          setFormData(prev => ({
                            ...prev,
                            story: processedText
                          }));
                        }}
                        className="tokpisin-process-button"
                      >
                        🌺 Process as Tok Pisin
                      </button>
                    </div>
                    <div className="microphone-instructions">
                      <p><strong>🎤 Speech-to-Text Features:</strong></p>
                      <ul>
                        <li><strong>English Mode:</strong> Standard English speech recognition</li>
                        <li><strong>Tok Pisin Mode:</strong> Recognizes Tok Pisin words and phrases</li>
                        <li><strong>Auto-Correction:</strong> Fixes common Tok Pisin spelling variations</li>
                        <li><strong>Process Button:</strong> Converts text to proper Tok Pisin format</li>
                      </ul>
                      <p><strong>🎤 First-time users:</strong></p>
                      <ol>
                        <li>Select your preferred language</li>
                        <li>Click "Tell Your Story" button</li>
                        <li>Allow microphone access when prompted</li>
                        <li>Speak clearly into your microphone</li>
                        <li>Watch your story appear as you speak!</li>
                        <li>Click "Process as Tok Pisin" for proper formatting</li>
                      </ol>
                      <p><em>If microphone access is denied, look for the microphone icon 🔴 in your browser's address bar and click "Allow"</em></p>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="submit-button">Submit Your Story</button>
              </form>
            </div>
            
            <div className="submission-info">
              <div className="info-card">
                <h3>◆ Story Guidelines</h3>
                <ul>
                  <li>Stories should be from Papua New Guinea</li>
                  <li>Focus on cultural significance and community values</li>
                  <li>Include traditional elements when applicable</li>
                  <li>Keep stories authentic and respectful</li>
                  <li>Length: 300-1000 words recommended</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>◉ Why Share Your Story?</h3>
                <ul>
                  <li>Preserve PNG's rich oral traditions</li>
                  <li>Connect with your cultural heritage</li>
                  <li>Inspire future generations</li>
                  <li>Build community understanding</li>
                  <li>Share your unique perspective</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="community-guidelines">
          <div className="guidelines-header">
            <h2>◆ Community Guidelines</h2>
            <p>Help us maintain a respectful and inclusive storytelling environment</p>
          </div>
          
          <div className="guidelines-content">
            <div className="guideline-item">
              <div className="guideline-icon">◈</div>
              <div className="guideline-text">
                <h3>Respect Cultural Traditions</h3>
                <p>Honor the cultural significance of stories and share them with authenticity and respect for their origins.</p>
              </div>
            </div>
            
            <div className="guideline-item">
              <div className="guideline-icon">◉</div>
              <div className="guideline-text">
                <h3>Be Authentic</h3>
                <p>Share stories from your personal experience or community knowledge. Avoid appropriating stories from other cultures.</p>
              </div>
            </div>
            
            <div className="guideline-item">
              <div className="guideline-icon">★</div>
              <div className="guideline-text">
                <h3>Community First</h3>
                <p>Consider how your stories contribute to community understanding and cultural preservation.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Story Criteria Popup - Simplified */}
      {showCriteria && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          minHeight: '100vh',
          width: '100vw'
        }}>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid rgba(212, 165, 116, 0.3)',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            zIndex: 100000
          }}>
            <h3 style={{
              color: '#d4a574',
              fontSize: '24px',
              marginBottom: '20px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>◆ Story Submission Criteria</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 25px 0'
            }}>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Must include the district, province, and clan of where the story originates
              </li>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Must include the name of the author and their contact details
              </li>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Story must be from Papua New Guinea and reflect cultural values
              </li>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Must be original work or properly attributed traditional stories
              </li>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Content should be appropriate for all ages and respectful
              </li>
              <li style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◆</span> Stories should be between 300-1000 words for optimal reading
              </li>
            </ul>
            
            <h3 style={{
              color: '#d4a574',
              fontSize: '20px',
              marginBottom: '15px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '25px'
            }}>◆ Community Guidelines</h3>
            <p style={{
              color: '#ffffff',
              fontSize: '16px',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>Help us maintain a respectful and inclusive storytelling environment</p>
            
            <div style={{
              marginBottom: '25px'
            }}>
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◈</span> Respect Cultural Traditions
                <p style={{
                  margin: '5px 0 0 0',
                  fontSize: '14px',
                  color: '#cccccc'
                }}>Honor the cultural significance of stories and share them with authenticity and respect for their origins.</p>
              </div>
              
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>◉</span> Be Authentic
                <p style={{
                  margin: '5px 0 0 0',
                  fontSize: '14px',
                  color: '#cccccc'
                }}>Share stories from your personal experience or community knowledge. Avoid appropriating stories from other cultures.</p>
              </div>
              
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: '#ff8c42',
                  fontSize: '14px'
                }}>★</span> Community First
                <p style={{
                  margin: '5px 0 0 0',
                  fontSize: '14px',
                  color: '#cccccc'
                }}>Consider how your stories contribute to community understanding and cultural preservation.</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                console.log('Close button clicked');
                setShowCriteria(false);
              }}
              style={{
                background: 'linear-gradient(135deg, #d4a574, #ff8c42)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 30px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto',
                boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function About() {
  const [showNavLogo, setShowNavLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavLogo(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <Nav showLogo={showNavLogo} />
      <div className="page-content">
        <h1 className="page-title">About Us</h1>
        <p className="page-description">LiklikDrama is the creative studio and agency arm of Culture Sphere, dedicated to empowering PNG youth through storytelling, design, and digital innovation.</p>
        <Carousel />
        
        {/* LiklikDrama Definition Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-left">
              <div className="about-header">
                <h2>◆ What is LiklikDrama?</h2>
                <p className="section-intro">Understanding the concept and cultural significance</p>
              </div>
              <div className="definition-card">
                <h3>◈ The LiklikDrama Concept</h3>
                <p>LiklikDrama represents the small-scale, community-driven storytelling and content creation that thrives on platforms like TikTok. It's where everyday Papua New Guineans share their stories, culture, and creativity in bite-sized, engaging formats.</p>
              </div>
            </div>
            <div className="about-right">
              <div className="origin-story">
                <h4>◆ Origin Story</h4>
                <p>The term emerged organically from TikTok content creators who labeled their videos "Liklik Drama" - meaning "small drama" or "little stories" in Tok Pisin. This grassroots movement has grown into a cultural phenomenon.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Impact Section */}
        <section className="about-section">
          <div className="impact-content">
            <div className="impact-header">
              <h2>◉ Cultural Impact</h2>
              <p className="section-intro">How LiklikDrama is transforming PNG's digital landscape</p>
            </div>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">◆</div>
                <h4>Digital Storytelling</h4>
                <p>Revolutionizing how PNG stories are told and shared in the digital age</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">◈</div>
                <h4>Cultural Preservation</h4>
                <p>Documenting and preserving traditional stories through modern technology</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">◉</div>
                <h4>Youth Empowerment</h4>
                <p>Giving young Papua New Guineans a platform to express their creativity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Origin and Evolution */}
        <section className="about-section">
          <div className="origin-content">
            <div className="origin-header">
              <h2>◆ Origin & Evolution</h2>
              <p className="section-intro">From casual sharing to cultural movement</p>
            </div>
            <div className="origin-timeline">
              <div className="origin-item">
                <div className="origin-icon">★</div>
                <div className="origin-text">
                  <h4>Early Days</h4>
                  <p>Started as individual creators sharing personal stories and cultural content on TikTok</p>
                </div>
              </div>
              <div className="origin-item">
                <div className="origin-icon">★</div>
                <div className="origin-text">
                  <h4>Community Building</h4>
                  <p>Creators began collaborating and supporting each other's content</p>
                </div>
              </div>
              <div className="origin-item">
                <div className="origin-icon">★</div>
                <div className="origin-text">
                  <h4>Organic Growth</h4>
                  <p>What started as casual sharing evolved into a movement, with TikTok accounts labeled "Liklik Drama" showing rapid, community-oriented content creation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Sphere Connection */}
        <section className="about-section">
          <div className="culture-sphere-content">
            <div className="about-left">
              <div className="about-header">
                <h2>◆ Branch of Culture Sphere</h2>
                <p className="section-intro">How LiklikDrama fits into the broader cultural ecosystem</p>
              </div>
              <div className="sphere-card">
                <h3>◈ Culture Sphere Concept</h3>
                <p>The "culture sphere" frames culture as a dynamic, cultivated space of practices, symbols, and productions that circulate within and between communities. LiklikDrama functions as a micro-sphere within PNG's larger cultural sphere.</p>
              </div>
            </div>
            <div className="about-right">
              <div className="sphere-features">
                <h4>◆ Key Mechanisms</h4>
                <div className="feature-list">
                  <div className="feature-item">
                    <strong>Localization:</strong> Adapts global short-form formats to PNG idioms and languages
                  </div>
                  <div className="feature-item">
                    <strong>Social Feedback:</strong> Likes, comments, and remixes create rapid cultural feedback loops
                  </div>
                  <div className="feature-item">
                    <strong>Community References:</strong> Motifs and characters become shared cultural touchstones
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>◆ Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/production">Production</a></li>
            <li><a href="/interaction">Interaction</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>◈ Contact</h3>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:info@culturesphere.com.au">info@culturesphere.com.au</a></li>
            <li><strong>Phone:</strong> +675 7002 1249</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>◉ Culture Sphere</h3>
          <p><a href="https://www.culturesphere.com.au" target="_blank">Visit us for more</a></p>
        </div>
        
        <div className="footer-section">
          <h3>★ Follow Us</h3>
          <ul>
            <li><strong>TikTok:</strong> <a href="https://www.tiktok.com/@liklik.drama" target="_blank">@liklik.drama</a></li>
            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/liklikmedia" target="_blank">liklikmedia</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 LiklikDrama Culture Sphere. All rights reserved. Made with ❤️ in Papua New Guinea</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/production" element={<Production />} />
          <Route path="/interaction" element={<Interaction />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
