import { useState, useEffect } from 'react';

export default function RekomendasiWisata() {
  const [kategori, setKategori] = useState('Populer Tinggi');
  const [kota, setKota] = useState('Semua Kota'); // State baru untuk filter kota
  const [daftarWisata, setDaftarWisata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/rekomendasi?kategori=${encodeURIComponent(kategori)}`)
      .then((response) => response.json())
      .then((data) => {
        setDaftarWisata(data.data || []);
        setKota('Semua Kota'); // Reset pilihan kota setiap kali kategori diubah
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      });
  }, [kategori]);

  // Ekstraksi otomatis nama-nama kota yang tersedia di klaster saat ini
  const daftarKotaUnik = ['Semua Kota', ...new Set(daftarWisata.map(item => item.city))].sort();

  // Logika filter: Jika memilih "Semua Kota", tampilkan semua. Jika tidak, cocokkan dengan kotanya.
  const wisataDitampilkan = kota === 'Semua Kota' 
    ? daftarWisata 
    : daftarWisata.filter(wisata => wisata.city === kota);

  return (
    <div className="rekomendasi-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        <h2>Eksplorasi Keindahan Jawa Barat</h2>
        <p>Temukan destinasi wisata yang paling pas dengan preferensi liburanmu. Dari yang paling viral hingga surga tersembunyi.</p>
        
        {/* Kotak Filter yang Diperbarui */}
        <div className="filter-modern" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="filter-group">
            <label>Suasana Liburan: </label>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
              <option value="Populer Tinggi">🌟 Super Viral & Ramai (Populer Tinggi)</option>
              <option value="Populer Sedang">🏖️ Santai & Aman (Populer Sedang)</option>
              <option value="Cluster Khusus/Niche">🍃 Hidden Gem & Spesifik (Niche)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Pilih Wilayah: </label>
            <select value={kota} onChange={(e) => setKota(e.target.value)}>
              {daftarKotaUnik.map((namaKota, index) => (
                <option key={index} value={namaKota}>{namaKota}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hasil Rekomendasi */}
      <div className="hasil-section">
        <h3 className="section-title">
          Menampilkan {wisataDitampilkan.length} Rekomendasi di {kota === 'Semua Kota' ? 'Jawa Barat' : kota}
        </h3>
        
        {loading ? (
          <div className="loading-spinner">Mencarikan destinasi terbaik...</div>
        ) : wisataDitampilkan.length === 0 ? (
          <div className="empty-state">Belum ada data wisata untuk kriteria ini.</div>
        ) : (
          <div className="wisata-grid">
            {wisataDitampilkan.map((wisata) => (
              <div key={wisata.id} className="wisata-card">
                <div className="card-image-placeholder">
                  <span className="badge-kota">{wisata.city}</span>
                </div>
                <div className="card-content">
                  <span className="category-tag">{wisata.categoryName}</span>
                  <h4>{wisata.title}</h4>
                  <div className="stats">
                    <span className="rating">⭐ {wisata.totalScore}/5.0</span>
                    <span className="reviews">💬 {wisata.reviewsCount} Ulasan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}