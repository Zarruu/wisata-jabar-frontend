export default function EvaluasiModel() {
  return (
    <div className="evaluasi-container">
      <h2>Hasil Evaluasi & Profil Klaster K-Means</h2>
      <p>Model telah membagi 312 destinasi wisata di Jawa Barat menjadi 3 kelompok utama berdasarkan popularitas dan kualitas.</p>

      {/* Bagian Metrik Kuantitatif */}
      <div className="metrik-box">
        <div className="metrik">
          <h3>Silhouette Score</h3>
          <p className="nilai">0.488</p>
          <small>Mendekati 1 berarti kelompok sudah sangat baik dan terpisah jelas.</small>
        </div>
        <div className="metrik">
          <h3>Inertia (WCSS)</h3>
          <p className="nilai">192.350</p>
          <small>Semakin kecil semakin baik tingkat kerapatan di dalam kelompoknya.</small>
        </div>
      </div>

      {/* Bagian Interpretasi Kualitatif (BARU) */}
      <div className="interpretasi-section">
        <h3>Interpretasi Profil Klaster</h3>
        <div className="profil-grid">
          
          {/* Kartu Niche */}
          <div className="profil-card niche">
            <h4>🍃 Cluster Khusus / Niche</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 172 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.73</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 2.495</li>
            </ul>
            <p><strong>Makna:</strong> "Surga Tersembunyi" (Hidden Gem). Destinasi yang belum terlalu padat pengunjung, namun memberikan kepuasan yang nyaris sempurna bagi yang datang. Sangat direkomendasikan bagi wisatawan yang mencari ketenangan atau spot estetik baru.</p>
          </div>

          {/* Kartu Sedang */}
          <div className="profil-card sedang">
            <h4>🏖️ Populer Sedang</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 135 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.39</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 3.334</li>
            </ul>
            <p><strong>Makna:</strong> "Wisata Mainstream". Tempat wisata standar yang populer dan cukup ramai. Sangat cocok direkomendasikan untuk rombongan keluarga besar atau study tour yang mencari tempat aman, fasilitas lengkap, dan terjangkau.</p>
          </div>

          {/* Kartu Tinggi */}
          <div className="profil-card tinggi">
            <h4>🌟 Populer Tinggi</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 5 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.56</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 85.860</li>
            </ul>
            <p><strong>Makna:</strong> "Super Viral & Ikonik". Ujung tombak pariwisata Jawa Barat dengan tingkat kunjungan skala nasional. Sangat direkomendasikan untuk turis luar daerah yang baru pertama kali berkunjung ke Jawa Barat.</p>
          </div>

        </div>
      </div>

      {/* Bagian Visualisasi */}
      <div className="visualisasi">
        <h3>Visualisasi Persebaran Klaster</h3>
        <img 
          src="/kmeans_jabar.png" 
          alt="Grafik K-Means Jawa Barat" 
          style={{maxWidth: '100%', borderRadius: '12px', border: '1px solid #e2e8f0'}} 
        />
      </div>
    </div>
  );
}