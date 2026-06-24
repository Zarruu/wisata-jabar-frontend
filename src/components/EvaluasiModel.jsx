export default function EvaluasiModel() {
  return (
    <div className="evaluasi-container">
      <h2>Hasil Evaluasi & Profil Klaster K-Means</h2>
      <p>Model telah membagi 946 destinasi wisata di Pulau Jawa menjadi 3 kelompok utama berdasarkan popularitas dan kualitas.</p>

      {/* Bagian Metrik Kuantitatif */}
      <div className="metrik-box">
        <div className="metrik">
          <h3>Silhouette Score</h3>
          <p className="nilai">0.463</p>
          <small>Mendekati 1 berarti kelompok sudah sangat baik dan terpisah jelas.</small>
        </div>
        <div className="metrik">
          <h3>Inertia (WCSS)</h3>
          <p className="nilai">664.705</p>
          <small>Semakin kecil semakin baik tingkat kerapatan di dalam kelompoknya.</small>
        </div>
      </div>

      {/* Bagian Interpretasi Kualitatif */}
      <div className="interpretasi-section">
        <h3>Interpretasi Profil Klaster</h3>
        <div className="profil-grid">
          
          {/* Kartu Niche */}
          <div className="profil-card niche">
            <h4>🍃 Cluster Khusus / Niche</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 391 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.71</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 4.483</li>
            </ul>
            <p><strong>Makna:</strong> "Surga Tersembunyi" (Hidden Gem). Destinasi dengan rating tinggi namun belum terlalu padat pengunjung. Sangat direkomendasikan bagi wisatawan yang mencari ketenangan atau spot estetik baru di Pulau Jawa.</p>
          </div>

          {/* Kartu Sedang */}
          <div className="profil-card sedang">
            <h4>🏖️ Populer Sedang</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 532 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.36</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 3.967</li>
            </ul>
            <p><strong>Makna:</strong> "Wisata Mainstream". Kelompok terbesar dengan tempat wisata standar yang populer dan cukup ramai. Cocok untuk rombongan keluarga besar atau study tour yang mencari tempat aman, fasilitas lengkap, dan terjangkau.</p>
          </div>

          {/* Kartu Tinggi */}
          <div className="profil-card tinggi">
            <h4>🌟 Populer Tinggi</h4>
            <ul>
              <li><strong>Total Destinasi:</strong> 23 tempat</li>
              <li><strong>Rata-rata Rating:</strong> ⭐ 4.62</li>
              <li><strong>Rata-rata Ulasan:</strong> 💬 80.081</li>
            </ul>
            <p><strong>Makna:</strong> "Super Viral & Ikonik". Ujung tombak pariwisata Pulau Jawa dengan rata-rata 80 ribu+ ulasan. Hanya 23 destinasi elite dengan tingkat kunjungan skala nasional. Sangat direkomendasikan untuk turis yang baru pertama kali berkunjung ke Pulau Jawa.</p>
          </div>

        </div>
      </div>

      {/* Bagian Visualisasi */}
      <div className="visualisasi">
        <h3>Visualisasi Persebaran Klaster</h3>
        <img 
          src="/kmeans_pulau_jawa.png" 
          alt="Grafik K-Means Wisata Pulau Jawa" 
          style={{maxWidth: '100%', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)'}} 
        />
      </div>
    </div>
  );
}