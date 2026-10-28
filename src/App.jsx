import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Komponen Slider Gambar khusus untuk tiap Card Project
function ProjectImageSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="project-card-slider">
      <div className="slider-image-wrapper">
        <img src={images[currentIndex]} alt={`${title} slide ${currentIndex + 1}`} />
      </div>

      {images.length > 1 && (
        <>
          <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous Slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next Slide">
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="slider-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false); // State untuk Pop-up Biodata
  const containerRef = useRef(null);
  const aboutRef = useRef(null);

  // DETEKSI SCROLL YANG PRESISI
  useEffect(() => {
    const handleScroll = () => {
      const containerScroll = containerRef.current ? containerRef.current.scrollTop : 0;
      const windowScroll = window.scrollY || document.documentElement.scrollTop;
      const currentScroll = Math.max(containerScroll, windowScroll);

      if (currentScroll > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const targetEl = containerRef.current;
    if (targetEl) {
      targetEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (targetEl) targetEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    { 
      title: 'Smile Laundry',  
      images: ['/smile laundry 1.png', '/smile laundry 2.png', '/smile laundry 3.png'],
      fullDesc: 'Smile Laundry adalah aplikasi pemesanan layanan laundry yang saya kembangkan untuk memberikan pengalaman mencuci yang lebih praktis dan efisien. Aplikasi ini dilengkapi dengan sistem multi-aktor, pengelolaan saldo, serta fitur pelacakan pesanan secara real-time, sehingga pengguna dapat memesan layanan dan memantau proses laundry dengan lebih mudah dalam satu aplikasi.',
      tech: ['Flutter', 'Laravel REST API', 'Firebase FCM', 'Midtrans', 'Haversine'],
      siteUrl: null
    },
    { 
      title: 'Space Outdoor', 
      images: ['/spaceoutdoor 1.png', '/spaceoutdoor 2.png', '/spaceoutdoor 3.png'],
      fullDesc: 'Space Outdoor adalah website yang saya kembangkan untuk memudahkan para pecinta alam dalam menyewa perlengkapan pendakian dan camping. Pengguna dapat menjelajahi berbagai pilihan perlengkapan, melihat detail produk, serta menemukan peralatan yang sesuai dengan kebutuhan petualangan mereka, sehingga persiapan pendakian menjadi lebih praktis dan efisien.',
      tech: ['React',  'PHP', 'Mysql'],
      siteUrl: 'http://spaceoutdoor.infinityfreeapp.com/' 
    },
    { 
      title: 'Space Sound', 
      images: ['/spacesound 1.png', '/spacesound 2.png', '/spacesound 3.png'],
      fullDesc: 'Space Sound membawa pengalaman mendengarkan ambient sound antariksa ke level berikutnya. Antarmukanya futuristik, minimalis, dan dirancang khusus buat nemenin kamu fokus atau bersantai.',
      tech: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
      siteUrl: 'https://spacesound-da12f0g0s-farids-projects-5ef01fd6.vercel.app'
    },
{ 
      title: 'Space Trip', 
      images: ['/spacetrip 1.png', '/spacetrip 2.png', '/spacetrip 3.png'],
      fullDesc: 'Space Trip adalah aplikasi website yang saya kembangkan untuk memudahkan pengguna menemukan berbagai pilihan perjalanan wisata di Indonesia. Melalui website ini, pengguna dapat melihat informasi destinasi, detail perjalanan, ketersediaan kuota peserta, serta informasi penting lainnya sebelum mendaftar trip, sehingga proses mencari dan merencanakan perjalanan menjadi lebih mudah dan praktis.',
      tech: ['PHP', 'Tailwind CSS', 'JavaScript','Midtrans', 'MySQL'],
      siteUrl: 'https://spacetrip.infinityfreeapp.com/' // <-- Diperbarui dengan link website asli
    },
    { 
      title: 'Scorpion Production', 
      images: ['/spacetrip 2.png', '/spacetrip 1.png', '/spacetrip 3.png'],
      fullDesc: 'Scorpion Production adalah website yang saya kembangkan untuk memperkenalkan karya dan aktivitas produksi film dari salah satu komunitas broadcasting Universitas Mercu Buana. Platform ini menjadi wadah untuk menampilkan portofolio film, mendokumentasikan hasil produksi, serta memberikan informasi mengenai proyek dan kegiatan kreatif yang dikerjakan oleh tim.',
      tech: ['HTML', 'CSS', 'JS'],
      siteUrl: null
    }
  ];

  return (
    <div className="app-wrapper">
      <main className="app-container" ref={containerRef}>
        
        {/* NAVBAR DINAMIS */}
        <nav className={`top-center-dock ${isScrolled ? 'scrolled-oval-nav' : 'clean-top-nav'}`}>
          <div className="dock-brand">
            <img src="/RIDS.png" alt="RIDS Logo" className="navbar-rotating-logo" />
          </div>
          <div className="dock-right-group">
            <div className="dock-nav">
              <a href="#home" className="dock-link">Home</a>
              <a href="#about" className="dock-link">About</a>
              <a href="#projects" className="dock-link">Project</a>
              <a href="#contact" className="dock-link">Contact</a>
            </div>
          </div>
        </nav>

        {/* 1. HOME / HERO SECTION */}
        <section className="home-section" id="home">
          

          <div className="hero-content-center">
           {/* GANTI ATAU TAMBAHKAN DI DALAM HERO SECTION */}
<div className="hero-images-fade-container">
  <img src="/gambar 1.png" alt="Hero Left" className="hero-fade-img hero-img-left" />
  <img src="/gambar 2.png" alt="Hero Right" className="hero-fade-img hero-img-right" />
</div>
          </div>
        </section>

        {/* 2. ABOUT & SKILLS SECTION */}
        <div className="rounded-about-wrapper" id="about" ref={aboutRef}>
          <div className="about-embedded-photo-container">
            <img 
              src="/Pria Berjas Mengintip dari Sisi Kanan.png" 
              alt="Muhamad Farid Rivai" 
              className="about-embedded-photo" 
            />
          </div>

          <div className="about-inner-content">
            <h2 className="about-big-title">About me</h2>
            <div className="about-main-layout">
              
              {/* SISI KIRI: Foto Wisuda & Tombol-Tombol */}
              <div className="about-left-sidebar">
                <div className="about-photo-card">
                  <img 
                    src="/Potret Wisudawan Universitas Pamulang.png" 
                    alt="Muhamad Farid Rivai - Wisuda Universitas Pamulang" 
                    className="about-graduation-photo" 
                  />
                </div>

                {/* Tombol Membuka Pop-up Biodata */}
                <button className="btn-download-cv" onClick={() => setIsBioOpen(true)}>
                  <span>LIHAT BIODATA SAYA</span> 
                </button>
              </div>

              {/* SISI KANAN: Deskripsi & Skills */}
              <div className="about-right-content">
                <div className="about-text-desc">
                  <p>Saya seorang fresh graduate Teknik Informatika yang antusias dalam mengubah barisan kode menjadi aplikasi web & mobile yang fungsional dan user-friendly. Saya terbiasa membangun antarmuka yang rapi menggunakan React serta memperkuat sisi backend dengan Laravel.

Aktif sejak 2023, saya senang mengeksplorasi ide-ide kreatif dan menuangkannya ke dalam produk digital siap pakai, mulai dari platform e-commerce hingga sistem operasional harian yang solutif.</p>
                </div>

                <div className="skills-containers-grid">
                  <div className="skill-box large-box">
                    <h4 className="skill-box-title">SOFTWARE ENGINEER</h4>
                    <div className="skill-icons-grid">
                      <i className="fab fa-php"><span>PHP</span></i>
                      <i className="fab fa-laravel"><span>Laravel</span></i>
                      
                      {/* Ikon Firebase menggunakan tag img kustom */}
                      <div className="skill-custom-img-badge">
                        <img src="/firebase.png" alt="Firebase" />
                        <span>Firebase</span>
                      </div>

                      <i className="fas fa-database"><span>MySQL</span></i>
                      <i className="fab fa-html5"><span>HTML5</span></i>
                      <i className="fab fa-css3-alt"><span>CSS3</span></i>
                      <i className="fab fa-js"><span>JavaScript</span></i>
                      <i className="fab fa-bootstrap"><span>Bootstrap</span></i>
                      <i className="fab fa-css3"><span>Tailwind</span></i>
                      
                      {/* Ikon Flutter dengan tag img */}
                      <div className="skill-custom-img-badge">
                        <img src="/flutter.png" alt="Flutter" />
                        <span>Flutter</span>
                      </div>

                      {/* Ikon Dart dengan tag img */}
                      <div className="skill-custom-img-badge">
                        <img src="/dart.png" alt="Dart" />
                        <span>Dart</span>
                      </div>

                      <i className="fab fa-react"><span>React</span></i>
                      <i className="fab fa-node-js"><span>Next.js</span></i>
                      <i className="fas fa-code"><span>C++</span></i>
                      <i className="fas fa-infinity"><span>Arduino</span></i>
                      <i className="fas fa-robot"><span>AI Tools</span></i>
                      <i className="fas fa-microchip"><span>IoT</span></i>
                    </div>
                  </div>

                  <div className="skill-box small-box">
                    <h4 className="skill-box-title">TOOLS & SERVER</h4>
                    <div className="skill-icons-grid">
                      <i className="fab fa-git-alt"><span>Git</span></i>
                      <i className="fab fa-github"><span>GitHub</span></i>
                      
                      {/* Ikon Postman dengan tag img */}
                      <div className="skill-custom-img-badge">
                        <img src="/postman.png" alt="Postman" />
                        <span>Postman</span>
                      </div>

                      <i className="fas fa-terminal"><span>Terminal</span></i>
                      <i className="fas fa-server"><span>Server</span></i>
                    </div>
                  </div>

                  <div className="skill-box small-box">
                    <h4 className="skill-box-title">SOFT SKILLS</h4>
                    <div className="skill-icons-grid">
                      <i className="fas fa-lightbulb"><span>Problem Solving</span></i>
                      <i className="fas fa-rocket"><span>Fast Learner</span></i>
                      <i className="fas fa-users"><span>Team Player</span></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PROJECTS SECTION (5 CARD SELANG-SELING ZIGZAG) */}
        <section className="projects-section white-bg" id="projects">
          <div className="projects-container">
            <h2 className="section-title text-center dark-text">
              <span className="accent-glow-text">PROJECT SAYA</span>
            </h2>
            
            <div className="projects-cards-list">
              {projects.map((proj, idx) => (
                <div key={idx} className={`project-card ${idx % 2 === 1 ? 'reverse' : ''}`}>
                  
                  {/* Bagian Slider Gambar */}
                  <div className="project-card-media">
                    <ProjectImageSlider images={proj.images} title={proj.title} />
                  </div>

                  {/* Bagian Deskripsi, Tekno, & Button */}
                  <div className="project-card-content">
                    <h3 className="project-card-title">{proj.title}</h3>
                    <p className="project-card-desc">{proj.fullDesc}</p>
                    
                    <div className="project-card-tech">
                      <h4>Teknologi yang Digunakan:</h4>
                      <div className="tech-tags">
                        {proj.tech.map((t, i) => (
                          <span key={i} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-card-action">
                      {proj.siteUrl ? (
                        <a href={proj.siteUrl} target="_blank" rel="noreferrer" className="btn-visit">
                          Kunjungi Website 
                        </a>
                      ) : (
                        <span className="private-badge">*Aplikasi Mobile / Private Project</span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section className="contact-section white-contact-bg" id="contact">
          <div className="content-wrapper contact-wrapper-relative">
            
            {/* Judul di Kiri Atas */}
            <h2 className="section-title text-left dark-text">
              <span className="accent-glow-text">Let's Build the Future</span>
            </h2>

            {/* Layout Grid 2 Kolom Sebelahan */}
            <div className="contact-cards-layout">
              
              {/* KOTAK KIRI: Find Me (LinkedIn, Instagram, TikTok) */}
              <div className="contact-box social-box">
                <h3 className="box-header-title">Find Me</h3>
                <div className="social-icons-only-list">
                  <a href="https://www.linkedin.com/in/farid-rivai-433bb742b" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://instagram.com/faridrivaii" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>

              {/* KOTAK KANAN: Email & WhatsApp */}
              <div className="contact-box direct-box">
                <h3 className="box-header-title">Get in Touch</h3>
                <div className="social-icons-only-list">
                  <a href="mailto:faridrivai16@gmail.com" className="contact-icon-btn" aria-label="Email">
                    <i className="far fa-envelope"></i>
                  </a>
                  <a href="https://wa.me/6285798865352" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>

            </div>

            {/* Foto Nelpon di Pojok Kanan Bawah */}
            <div className="contact-phone-photo-container">
              <img src="/lagi nelpon.png" alt="Farid Nelpon" className="contact-phone-photo" />
            </div>

          </div>
        </section>

        {/* POP-UP MODAL BIODATA (SERASI DENGAN TEMA PORTOFOLIO) */}
        {isBioOpen && (
          <div className="bio-modal-overlay" onClick={() => setIsBioOpen(false)}>
            <div className="bio-modal-card" onClick={(e) => e.stopPropagation()}>
              
              {/* Tombol Close */}
              <button className="bio-close-btn" onClick={() => setIsBioOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
              
              {/* Header Modal */}
              <div className="bio-modal-header">
                <h3 className="bio-title">Biografi Lengkap</h3>
              </div>

              <div className="bio-modal-body">
                {/* Grid Informasi Utama */}
                <div className="bio-info-grid">
                  <div className="bio-info-box">
                    <span className="bio-label">NAMA LENGKAP</span>
                    <strong className="bio-value">Muhamad Farid Rivai</strong>
                  </div>
                  <div className="bio-info-box">
                    <span className="bio-label">TANGGAL LAHIR</span>
                    <strong className="bio-value">16 Januari 2003</strong>
                  </div>
                  <div className="bio-info-box">
                    <span className="bio-label">TEMPAT TINGGAL</span>
                    <strong className="bio-value">Jakarta, Indonesia</strong>
                  </div>
                  <div className="bio-info-box">
                    <span className="bio-label">UMUR</span>
                    <strong className="bio-value">23 Tahun</strong>
                  </div>
                </div>

                {/* Section Riwayat Pendidikan */}
                <div className="bio-section-group">
                  <h4 className="bio-section-title">RIWAYAT PENDIDIKAN</h4>
                  <div className="bio-education-list">
                    <div className="edu-card">
                      <div className="edu-year">2022 - 2026</div>
                      <div className="edu-details">
                        <h5>Universitas Pamulang</h5>
                        <p>S1 Teknik Informatika</p>
                      </div>
                    </div>

                    <div className="edu-card">
                      <div className="edu-year">2018 - 2021</div>
                      <div className="edu-details">
                        <h5>SMK Muhamadiyah 9 Jakarta</h5>
                        <p>Jurusan Multimedia</p>
                      </div>
                    </div>

                    <div className="edu-card">
                      <div className="edu-year">2015 - 2018</div>
                      <div className="edu-details">
                        <h5>SMP Negri 66 Jakarta</h5>
                      </div>
                    </div>

                    <div className="edu-card">
                      <div className="edu-year">2008 - 2014</div>
                      <div className="edu-details">
                        <h5>SD Grogol Selatan 01 Pagi</h5>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Hobi & Minat */}
                <div className="bio-section-group">
                  <h4 className="bio-section-title">HOBI & MINAT</h4>
                  <div className="bio-hobbies-list">
                    <span className="hobby-chip">Coding & Web Dev</span>
                    <span className="hobby-chip">Hiking</span>
                    <span className="hobby-chip">UI/UX Design</span>
                    <span className="hobby-chip">Mendengarkan Musik</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}