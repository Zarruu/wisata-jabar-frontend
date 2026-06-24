import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# ==========================================
# 1. LOAD DATA & FILTERING
# ==========================================
print("Memuat dataset...")
df = pd.read_csv('dataset_bersih_indo.csv')
print(f"Total data mentah: {len(df)} baris")

# Daftar kota/kabupaten yang BUKAN di Pulau Jawa (akan dibuang)
non_jawa_cities = [
    'Kota Singkawang', 'Kota Banjarmasin', 'Kota Samarinda',
    'Kabupaten Kotawaringin Timur', 'Kabupaten Banjar',
    'Kota Denpasar', 'Kabupaten Badung', 'Kabupaten Gianyar'
]

# Filter data hanya untuk wilayah Pulau Jawa
df_jawa = df[~df['city'].isin(non_jawa_cities)].copy()
print(f"Total data Pulau Jawa: {len(df_jawa)} baris")

# ==========================================
# 2. DATA PREPROCESSING
# ==========================================
# Menghapus baris yang memiliki nilai kosong pada kolom target
df_jawa = df_jawa.dropna(subset=['totalScore', 'reviewsCount'])

# Filter reviewsCount > 100
df_jawa = df_jawa[df_jawa['reviewsCount'] > 100]
print(f"Total data setelah preprocessing: {len(df_jawa)} baris\n")

# Menampilkan daftar kota yang tersedia
print("Kota/Kabupaten di Pulau Jawa yang tersedia:")
for i, city in enumerate(sorted(df_jawa['city'].unique()), 1):
    print(f"  {i}. {city}")
print()

# Memilih fitur (features) untuk clustering
X = df_jawa[['totalScore', 'reviewsCount']]

# Standarisasi data agar skala Total Score (1-5) dan Reviews (ribuan) seimbang
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ==========================================
# 3. PEMODELAN K-MEANS CLUSTERING
# ==========================================
# Menjalankan K-Means dengan K=3
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df_jawa['Cluster'] = kmeans.fit_predict(X_scaled)

# Mengurutkan cluster berdasarkan rata-rata jumlah ulasan agar penamaan konsisten
cluster_means = df_jawa.groupby('Cluster')['reviewsCount'].mean().sort_values()

# Mapping nama cluster
cluster_mapping = {
    cluster_means.index[0]: 'Cluster Khusus/Niche',
    cluster_means.index[1]: 'Populer Sedang',
    cluster_means.index[2]: 'Populer Tinggi'
}
df_jawa['Cluster_Name'] = df_jawa['Cluster'].map(cluster_mapping)

# ==========================================
# 4. EVALUASI MODEL
# ==========================================
sil_score = silhouette_score(X_scaled, df_jawa['Cluster'])
inertia = kmeans.inertia_

print("=" * 50)
print("          HASIL EVALUASI MODEL")
print("=" * 50)
print(f"Silhouette Score : {sil_score:.4f} (Mendekati 1 lebih baik)")
print(f"Inertia (WCSS)   : {inertia:.3f} (Lebih kecil lebih baik)")

print("\n--- DISTRIBUSI WISATA PER CLUSTER ---")
print(df_jawa['Cluster_Name'].value_counts().to_string())
print("-" * 40)

# Menampilkan sampel 5 data teratas beserta label clusternya
print("\nSampel Hasil Clustering:")
print(df_jawa[['title', 'city', 'totalScore', 'reviewsCount', 'Cluster_Name']].head(10).to_string())

# ==========================================
# 5. VISUALISASI HASIL
# ==========================================
plt.figure(figsize=(12, 7))

# Membuat Scatter Plot
palette_colors = {
    'Cluster Khusus/Niche': '#2ca02c',  # Hijau
    'Populer Sedang': '#ff7f0e',         # Oranye
    'Populer Tinggi': '#1f77b4'          # Biru
}

sns.scatterplot(
    x='totalScore',
    y='reviewsCount',
    hue='Cluster_Name',
    palette=palette_colors,
    data=df_jawa,
    alpha=0.7,
    s=100,
    edgecolor='black',
    linewidth=0.5
)

# Menambahkan elemen visual
plt.title('Pemetaan Klaster Wisata Pulau Jawa (K-Means K=3)', fontsize=14, fontweight='bold')
plt.xlabel('Total Score (Rating)', fontsize=12)
plt.ylabel('Jumlah Ulasan (Reviews Count)', fontsize=12)
plt.legend(title='Kategori Cluster', fontsize=10, title_fontsize=11)
plt.grid(True, linestyle='--', alpha=0.5)

# Menyesuaikan tata letak dan menyimpan grafik
plt.tight_layout()
plt.savefig('kmeans_pulau_jawa.png', dpi=300, bbox_inches='tight')
print("\n✅ Grafik tersimpan sebagai 'kmeans_pulau_jawa.png'")

plt.show()

# ==========================================
# 6. EKSPOR HASIL (Opsional)
# ==========================================
# Menyimpan hasil clustering ke dalam CSV baru
df_jawa.to_csv('hasil_clustering_pulau_jawa.csv', index=False)
print("✅ Hasil clustering tersimpan sebagai 'hasil_clustering_pulau_jawa.csv'")

# ==========================================
# 7. INTERPRETASI PROFIL KLASTER
# ==========================================
print("\n" + "=" * 50)
print("     PROFIL & INTERPRETASI KLASTER")
print("=" * 50)

# Menghitung nilai rata-rata rating dan ulasan untuk tiap klaster
cluster_profile = df_jawa.groupby('Cluster_Name')[['totalScore', 'reviewsCount']].mean().round(2)
cluster_profile['Jumlah_Destinasi'] = df_jawa['Cluster_Name'].value_counts()

print(cluster_profile)

print("\n--- INTERPRETASI ---")
for name in ['Cluster Khusus/Niche', 'Populer Sedang', 'Populer Tinggi']:
    subset = df_jawa[df_jawa['Cluster_Name'] == name]
    avg_score = subset['totalScore'].mean()
    avg_reviews = subset['reviewsCount'].mean()
    count = len(subset)

    if name == 'Cluster Khusus/Niche':
        emoji = '🍃'
        desc = 'Hidden Gem - Destinasi rating tinggi namun belum terlalu padat pengunjung'
    elif name == 'Populer Sedang':
        emoji = '🏖️'
        desc = 'Wisata Mainstream - Tempat wisata standar yang populer dan cukup ramai'
    else:
        emoji = '🌟'
        desc = 'Super Viral & Ikonik - Destinasi skala nasional dengan ulasan masif'

    print(f"\n{emoji} {name}")
    print(f"   Jumlah Destinasi : {count}")
    print(f"   Avg Rating       : {avg_score:.2f}")
    print(f"   Avg Reviews      : {avg_reviews:,.0f}")
    print(f"   Interpretasi     : {desc}")
