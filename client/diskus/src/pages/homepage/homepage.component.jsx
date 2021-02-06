import React from 'react';
import './homepage.styles.scss';
import { ReactComponent as HomeSvg } from '../../assets/home-svg.svg';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__content">
        <h1>
          Platform <span>Diskusi</span> dan Berita
        </h1>
        <p>
          <span>Diskus</span> adalah situs web diskusi dan berita. Anggota yang
          terdaftar dapat mengirimkan konten seperti tautan, kiriman teks, dan
          gambar, yang kemudian dapat dikomentari oleh anggota lain.
        </p>
        <button>Daftar Sekarang</button>
      </div>
      <div className="homepage__svg">
        <HomeSvg />
      </div>
    </div>
  );
};

export default HomePage;
