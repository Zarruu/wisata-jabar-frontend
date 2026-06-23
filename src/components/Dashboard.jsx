import { useState } from 'react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-badge">📊 Data Mining Project</div>
        <h2>Dashboard Metodologi</h2>
        <p>Analisis klasterisasi destinasi wisata Jawa Barat menggunakan algoritma K-Means Clustering</p>
        
        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-pill">
            <span className="stat-icon">📁</span>
            <div className="stat-info">
              <span className="stat-number">1.491</span>
              <span className="stat-label">Data Mentah</span>
            </div>
          </div>
          <div className="stat-pill">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-number">1.175</span>
              <span className="stat-label">Data Bersih</span>
            </div>
          </div>
          <div className="stat-pill">
            <span className="stat-icon">🎯</span>
            <div className="stat-info">
              <span className="stat-number">3</span>
              <span className="stat-label">Klaster</span>
            </div>
          </div>
          <div className="stat-pill">
            <span className="stat-icon">📈</span>
            <div className="stat-info">
              <span className="stat-number">0.488</span>
              <span className="stat-label">Silhouette</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Metodologi */}
      <div className="metodologi-timeline">

        {/* STEP 1: Data Preprocessing */}
        <div className={`timeline-step ${activeSection === 'preprocessing' ? 'expanded' : ''}`}>
          <div className="step-header" onClick={() => toggleSection('preprocessing')}>
            <div className="step-number">
              <span>1</span>
            </div>
            <div className="step-title-group">
              <h3>Data Preprocessing</h3>
              <p>Pembersihan dan persiapan data sebelum pemodelan</p>
            </div>
            <div className="step-toggle">
              <span>{activeSection === 'preprocessing' ? '▲' : '▼'}</span>
            </div>
          </div>
          
          <div className="step-content">
            {/* Dataset Overview */}
            <div className="content-card dataset-overview">
              <h4>📋 Gambaran Dataset</h4>
              <div className="dataset-comparison">
                <div className="dataset-box before">
                  <div className="dataset-label">Data Sebelum Cleaning</div>
                  <div className="dataset-value">1.491</div>
                  <div className="dataset-desc">Total baris data mentah dari scraping Google Maps</div>
                </div>
                <div className="dataset-arrow">
                  <span>→</span>
                  <small>cleaning</small>
                </div>
                <div className="dataset-box after">
                  <div className="dataset-label">Data Setelah Cleaning</div>
                  <div className="dataset-value">1.175</div>
                  <div className="dataset-desc">Data bersih siap digunakan untuk pemodelan</div>
                </div>
              </div>
              <div className="dataset-reduction">
                <span>📉 Data yang dihapus: <strong>316 baris</strong> (21.2%)</span>
              </div>
            </div>

            {/* Preprocessing Steps */}
            <div className="content-card">
              <h4>🔧 Tahapan Preprocessing</h4>
              <div className="preprocessing-steps">
                <div className="prep-step">
                  <div className="prep-icon check">✓</div>
                  <div className="prep-detail">
                    <h5>Pengecekan Nilai Null</h5>
                    <p>Memeriksa dan menghapus baris yang memiliki nilai kosong (null/NaN) pada kolom-kolom penting untuk memastikan kualitas data yang digunakan.</p>
                  </div>
                </div>
                <div className="prep-step">
                  <div className="prep-icon select">⬡</div>
                  <div className="prep-detail">
                    <h5>Seleksi Kolom (Feature Selection)</h5>
                    <p>Mengambil hanya kolom yang diperlukan untuk analisis:</p>
                    <div className="column-tags">
                      <span className="col-tag">title</span>
                      <span className="col-tag">categoryName</span>
                      <span className="col-tag">city</span>
                      <span className="col-tag">totalScore</span>
                      <span className="col-tag">reviewsCount</span>
                    </div>
                  </div>
                </div>
                <div className="prep-step">
                  <div className="prep-icon filter">⏏</div>
                  <div className="prep-detail">
                    <h5>Filter Data (reviewsCount &gt; 100)</h5>
                    <p>Mengambil hanya destinasi wisata yang memiliki jumlah ulasan lebih dari 100 untuk memastikan data yang dianalisis memiliki tingkat relevansi dan kepercayaan yang memadai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Modelling K-Means */}
        <div className={`timeline-step ${activeSection === 'modelling' ? 'expanded' : ''}`}>
          <div className="step-header" onClick={() => toggleSection('modelling')}>
            <div className="step-number modelling-num">
              <span>2</span>
            </div>
            <div className="step-title-group">
              <h3>Modelling K-Means</h3>
              <p>Pengelompokan destinasi wisata menggunakan algoritma K-Means Clustering</p>
            </div>
            <div className="step-toggle">
              <span>{activeSection === 'modelling' ? '▲' : '▼'}</span>
            </div>
          </div>

          <div className="step-content">
            <div className="content-card">
              <h4>⚙️ Konfigurasi K-Means</h4>
              <div className="config-grid">
                <div className="config-item">
                  <span className="config-label">Algoritma</span>
                  <span className="config-value">K-Means Clustering</span>
                </div>
                <div className="config-item">
                  <span className="config-label">Jumlah Klaster (K)</span>
                  <span className="config-value highlight">3</span>
                </div>
                <div className="config-item">
                  <span className="config-label">Fitur Input</span>
                  <span className="config-value">totalScore, reviewsCount</span>
                </div>
                <div className="config-item">
                  <span className="config-label">Normalisasi</span>
                  <span className="config-value">StandardScaler</span>
                </div>
                <div className="config-item">
                  <span className="config-label">Inisialisasi</span>
                  <span className="config-value">k-means++</span>
                </div>
                <div className="config-item">
                  <span className="config-label">Random State</span>
                  <span className="config-value">42</span>
                </div>
              </div>
            </div>

            <div className="content-card">
              <h4>📊 Alur Proses K-Means</h4>
              <div className="kmeans-flow">
                <div className="flow-step">
                  <div className="flow-num">1</div>
                  <div className="flow-text">
                    <strong>Normalisasi Data</strong>
                    <p>Fitur totalScore dan reviewsCount dinormalisasi menggunakan StandardScaler agar memiliki skala yang sama.</p>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step">
                  <div className="flow-num">2</div>
                  <div className="flow-text">
                    <strong>Inisialisasi Centroid</strong>
                    <p>Tiga titik centroid awal dipilih dengan metode k-means++ untuk optimalisasi konvergensi.</p>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step">
                  <div className="flow-num">3</div>
                  <div className="flow-text">
                    <strong>Iterasi & Assignment</strong>
                    <p>Setiap data dihitung jaraknya ke centroid, lalu di-assign ke klaster terdekat secara iteratif.</p>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step">
                  <div className="flow-num">4</div>
                  <div className="flow-text">
                    <strong>Konvergensi</strong>
                    <p>Proses berhenti ketika centroid tidak lagi berubah secara signifikan (konvergen).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Evaluasi Model */}
        <div className={`timeline-step ${activeSection === 'evaluasi' ? 'expanded' : ''}`}>
          <div className="step-header" onClick={() => toggleSection('evaluasi')}>
            <div className="step-number evaluasi-num">
              <span>3</span>
            </div>
            <div className="step-title-group">
              <h3>Evaluasi Model</h3>
              <p>Silhouette Score &amp; Interpretasi Klaster</p>
            </div>
            <div className="step-toggle">
              <span>{activeSection === 'evaluasi' ? '▲' : '▼'}</span>
            </div>
          </div>

          <div className="step-content">
            {/* Silhouette Score */}
            <div className="content-card silhouette-card">
              <h4>📏 Silhouette Score</h4>
              <div className="silhouette-display">
                <div className="score-circle">
                  <div className="score-ring">
                    <span className="score-value">0.488</span>
                    <span className="score-max">/ 1.0</span>
                  </div>
                </div>
                <div className="score-explanation">
                  <div className="score-bar-container">
                    <div className="score-bar-bg">
                      <div className="score-bar-fill" style={{width: '48.8%'}}></div>
                      <div className="score-bar-marker" style={{left: '48.8%'}}></div>
                    </div>
                    <div className="score-bar-labels">
                      <span>0 (Buruk)</span>
                      <span>0.5 (Cukup)</span>
                      <span>1.0 (Sempurna)</span>
                    </div>
                  </div>
                  <p className="score-interpretation">
                    <strong>Interpretasi:</strong> Nilai 0.488 menunjukkan bahwa klaster yang terbentuk memiliki pemisahan yang <strong>cukup baik</strong>. 
                    Setiap data point cenderung lebih dekat ke klasternya sendiri dibanding klaster lain, yang berarti pengelompokan cukup bermakna.
                  </p>
                </div>
              </div>
            </div>

            {/* Interpretasi Klaster */}
            <div className="content-card">
              <h4>🔍 Interpretasi Klaster</h4>
              <div className="cluster-interpretation">
                
                <div className="cluster-card niche-card">
                  <div className="cluster-header">
                    <div className="cluster-icon niche-bg">🍃</div>
                    <div>
                      <h5>Cluster Khusus / Niche</h5>
                      <span className="cluster-badge niche-badge">Hidden Gem</span>
                    </div>
                  </div>
                  <div className="cluster-stats-row">
                    <div className="cs-item">
                      <span className="cs-num">172</span>
                      <span className="cs-label">Destinasi</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">⭐ 4.73</span>
                      <span className="cs-label">Avg Rating</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">2.495</span>
                      <span className="cs-label">Avg Ulasan</span>
                    </div>
                  </div>
                  <p className="cluster-desc">
                    Destinasi yang belum terlalu padat pengunjung, namun memberikan kepuasan nyaris sempurna. 
                    Cocok untuk wisatawan yang mencari ketenangan dan spot estetik baru.
                  </p>
                </div>

                <div className="cluster-card sedang-card">
                  <div className="cluster-header">
                    <div className="cluster-icon sedang-bg">🏖️</div>
                    <div>
                      <h5>Populer Sedang</h5>
                      <span className="cluster-badge sedang-badge">Wisata Mainstream</span>
                    </div>
                  </div>
                  <div className="cluster-stats-row">
                    <div className="cs-item">
                      <span className="cs-num">135</span>
                      <span className="cs-label">Destinasi</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">⭐ 4.39</span>
                      <span className="cs-label">Avg Rating</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">3.334</span>
                      <span className="cs-label">Avg Ulasan</span>
                    </div>
                  </div>
                  <p className="cluster-desc">
                    Tempat wisata standar yang populer dan cukup ramai. Cocok untuk rombongan keluarga atau study tour 
                    yang mencari fasilitas lengkap dan terjangkau.
                  </p>
                </div>

                <div className="cluster-card tinggi-card">
                  <div className="cluster-header">
                    <div className="cluster-icon tinggi-bg">🌟</div>
                    <div>
                      <h5>Populer Tinggi</h5>
                      <span className="cluster-badge tinggi-badge">Super Viral & Ikonik</span>
                    </div>
                  </div>
                  <div className="cluster-stats-row">
                    <div className="cs-item">
                      <span className="cs-num">5</span>
                      <span className="cs-label">Destinasi</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">⭐ 4.56</span>
                      <span className="cs-label">Avg Rating</span>
                    </div>
                    <div className="cs-item">
                      <span className="cs-num">85.860</span>
                      <span className="cs-label">Avg Ulasan</span>
                    </div>
                  </div>
                  <p className="cluster-desc">
                    Ujung tombak pariwisata Jawa Barat dengan tingkat kunjungan skala nasional. 
                    Sangat direkomendasikan untuk turis luar daerah yang baru pertama kali berkunjung.
                  </p>
                </div>

              </div>
            </div>

            {/* Visualisasi */}
            <div className="content-card">
              <h4>📈 Visualisasi Persebaran Klaster</h4>
              <div className="viz-container">
                <img 
                  src="/kmeans_jabar.png" 
                  alt="Grafik K-Means Jawa Barat" 
                  className="viz-image"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
