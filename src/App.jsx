import { useState } from 'react';
import RekomendasiWisata from './components/RekomendasiWisata';
import EvaluasiModel from './components/EvaluasiModel';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [tabAktif, setTabAktif] = useState('dashboard');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistem Rekomendasi Wisata Jabar</h1>
        <nav className="nav-menu">
          <button 
            className={tabAktif === 'dashboard' ? 'aktif' : ''} 
            onClick={() => setTabAktif('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={tabAktif === 'rekomendasi' ? 'aktif' : ''} 
            onClick={() => setTabAktif('rekomendasi')}
          >
            Rekomendasi Wisata
          </button>
          <button 
            className={tabAktif === 'evaluasi' ? 'aktif' : ''} 
            onClick={() => setTabAktif('evaluasi')}
          >
            Evaluasi Data
          </button>
        </nav>
      </header>

      <main className="app-main">
        {/* Di sinilah layarnya berganti antara aplikasi asli dan hasil metrik */}
        {tabAktif === 'dashboard' && <Dashboard />}
        {tabAktif === 'rekomendasi' && <RekomendasiWisata />}
        {tabAktif === 'evaluasi' && <EvaluasiModel />}
      </main>
    </div>
  );
}

export default App;