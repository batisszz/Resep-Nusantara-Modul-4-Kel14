// src/pages/ProfilePage.jsx
import anggota from "../data/anggota";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Profile Aplikasi
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Halaman ini menampilkan informasi profil aplikasi dan anggota kelompok.
          </p>
          <p className="text-gray-700 font-medium">Kelompok 14 - Shift 3</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Anggota Kelompok
        </h2>

        <div className="space-y-6">
          {anggota.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg transition"
            >
              <img
                src={item.foto}
                alt={item.nama}
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-500"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-800">{item.nama}</h3>
                <p className="text-gray-500 text-lg">{item.nim}</p>
                <p className="mt-2 text-sm text-gray-600">Anggota Kelompok 14</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
