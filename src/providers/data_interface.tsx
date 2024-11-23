export interface User {
  namalengkap: string;
  telepon: number;
  alamat: string;
  NIK: string;
  tanggal_lahir: string;
  pekerjaan: string;
}

export interface JenisPengaduan {
  _id: string;
  jenis: string;
}

export interface Report {
  _id: string;
  idUser: User;
  idJenisPengaduan: JenisPengaduan;
  no_telepon: number;
  kronologi: string;
  nomorLaporan: string;
  kodeVerifikasi: string;
  alamat: string;
  status: number;
  tanggal: string;
}

export interface Berita {
  _id: string;
  judul: string;
  publikasi: string;
  deskripsi: string;
  publishedAt: string;
  image: string;
}
