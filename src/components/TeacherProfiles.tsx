import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Award, Phone, BookOpen } from 'lucide-react';

export const TeacherProfiles: React.FC = () => {
  const { teachers } = useApp();

  const handleContactTeacher = (phone: string, name: string) => {
    const text = encodeURIComponent(
      `Assalamu’alaikum Warahmatullahi Wabarakatuh ${name}. Saya orang tua calon siswa ingin bersilaturahmi dan bertanya mengenai kegiatan belajar di TK Lukman Hakim Purwokerto.`
    );
    window.open(`https://wa.me/62${phone.replace(/^0/, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="teachers" className="py-12 sm:py-16 bg-transparent">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-[#006699] font-bold px-2.5 py-1 rounded-sm">
                      {teacher.role}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold mt-1.5 text-white leading-snug drop-shadow-xs">
                      {teacher.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5">
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#006699] flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{teacher.education}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Pengalaman Mengajar: <strong>{teacher.experienceYears} Tahun</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700 font-semibold">{teacher.specialty}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed pt-3 border-t border-slate-100">
                    &ldquo;{teacher.bio}&rdquo;
                  </p>
                </div>
              </div>

              <div className="p-5 sm:px-6 pt-0">
                <button
                  onClick={() => handleContactTeacher(teacher.phone, teacher.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
