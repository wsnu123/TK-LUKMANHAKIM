import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SliceData {
  num: number;
  title: string;
  desc: string;
  wedgeColor: string;
  labelColor: string;
  circleColor: string;
  startAngle: number;
  endAngle: number;
}

const SLICES: SliceData[] = [
  {
    num: 1,
    title: 'ANAK = UNIK',
    desc: 'Setiap individu anak adalah unik dengan potensi dan cara berkembang masing-masing untuk menjadi dirinya sendiri.',
    wedgeColor: '#d9e9b8',
    labelColor: '#4e8a2c',
    circleColor: '#7eb349',
    startAngle: 0,
    endAngle: 45,
  },
  {
    num: 2,
    title: 'PRESTASI',
    desc: 'Penghargaan tulus pada setiap usaha, keberanian mencoba, dan capaian perkembangan setiap anak.',
    wedgeColor: '#a6dbb8',
    labelColor: '#368056',
    circleColor: '#52a166',
    startAngle: 45,
    endAngle: 90,
  },
  {
    num: 3,
    title: 'LIVING VALUES',
    desc: 'Pendidikan berbasis nilai kehidupan nyata: keimanan, kasih sayang, rasa syukur, dan kedamaian hati.',
    wedgeColor: '#b5e2f9',
    labelColor: '#2282b8',
    circleColor: '#3ea3d5',
    startAngle: 90,
    endAngle: 135,
  },
  {
    num: 4,
    title: 'LUGAS',
    desc: 'Orientasi pada kelugasan berpikir, kejujuran berekspresi secara santun, dan keberanian bertindak.',
    wedgeColor: '#a6bfe4',
    labelColor: '#3a66a3',
    circleColor: '#f3e47c',
    startAngle: 135,
    endAngle: 180,
  },
  {
    num: 5,
    title: 'PROSES',
    desc: 'Pembelajaran adalah proses eksplorasi yang terbuka, partisipatif, dan menggembirakan bagi anak.',
    wedgeColor: '#c3b8e0',
    labelColor: '#5a498f',
    circleColor: '#614f8f',
    startAngle: 180,
    endAngle: 225,
  },
  {
    num: 6,
    title: 'TOLERANSI',
    desc: 'Penghargaan dan toleransi pada perbedaan, saling menolong, serta melatih empati sosial sejak dini.',
    wedgeColor: '#f3bad2',
    labelColor: '#b84673',
    circleColor: '#d6628a',
    startAngle: 225,
    endAngle: 270,
  },
  {
    num: 7,
    title: 'PRAKTEK OASE',
    desc: 'Olah Agama, Seni, dan Raga dipraktikkan langsung secara nyata dan menyenangkan setiap hari.',
    wedgeColor: '#f6aba3',
    labelColor: '#c74d44',
    circleColor: '#df6c63',
    startAngle: 270,
    endAngle: 315,
  },
  {
    num: 8,
    title: 'DISIPLIN POSITIF',
    desc: 'Ditanamkan dari kebiasaan sehari-hari di sekolah dengan keteladanan dan kasih sayang tanpa paksaan.',
    wedgeColor: '#fcd299',
    labelColor: '#b87b22',
    circleColor: '#eab364',
    startAngle: 315,
    endAngle: 360,
  },
];

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function createAnnularSectorPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) {
  const p1 = polarToCartesian(cx, cy, outerR, startAngle);
  const p2 = polarToCartesian(cx, cy, outerR, endAngle);
  const p3 = polarToCartesian(cx, cy, innerR, endAngle);
  const p4 = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}

function createTextArcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  reverse = false
) {
  if (!reverse) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  } else {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    return `M ${start.x} ${start.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`;
  }
}

const SliceIcon: React.FC<{ num: number; x: number; y: number }> = ({ num, x, y }) => {
  switch (num) {
    case 1:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <circle cx="20" cy="20" r="11" fill="#fde2c4" />
          <path d="M9 18c0-7 5-11 11-11s11 4 11 11c-2-3-5-4-11-4s-9 1-11 4z" fill="#8d5524" />
          <circle cx="16" cy="20" r="1.4" fill="#1e293b" />
          <circle cx="24" cy="20" r="1.4" fill="#1e293b" />
          <path d="M16.5 24.5c2 2 5 2 7 0" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M13 30l7 4 7-4" fill="#ffffff" />
        </g>
      );
    case 2:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M12 10h16v7a8 8 0 0 1-16 0v-7z" fill="#f5b841" />
          <path d="M12 12H9a3 3 0 0 0 0 6h3M28 12h3a3 3 0 0 1 0 6h-3" stroke="#f5b841" strokeWidth="2.2" fill="none" />
          <rect x="18" y="24" width="4" height="5" fill="#e09f2d" />
          <rect x="13" y="29" width="14" height="3.5" rx="1" fill="#f5b841" />
        </g>
      );
    case 3:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M20 22s-6.5-3.8-6.5-8.2A3.6 3.6 0 0 1 20 11a3.6 3.6 0 0 1 6.5 2.8C26.5 18.2 20 22 20 22z" fill="#e63946" />
          <path d="M10 26h13c2.5 0 4.5-1.5 6-3.2l1.5 1.5c-2 2.8-4.8 4.7-8.5 4.7H10v-3z" fill="#f4a261" />
        </g>
      );
    case 4:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M13 30v-4c-2-2-3-5-3-8a10 10 0 0 1 20 0l2 3-2 2v3c0 1.5-1.2 2.5-3 2.5h-4v1.5H13z" fill="#d64550" />
          <circle cx="20" cy="16" r="4.2" fill="#ffffff" />
          <rect x="18.5" y="20" width="3" height="2" fill="#fde047" />
        </g>
      );
    case 5:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <circle cx="20" cy="13" r="5" fill="#facc15" />
          <path d="M13 28c0-4 3-7 7-7s7 3 7 7" fill="#fde68a" />
          <rect x="15" y="26" width="10" height="5" rx="1" fill="#cbd5e1" />
        </g>
      );
    case 6:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M9 26l8-8 4 4-8 8-4-4z" fill="#f6bd60" />
          <path d="M31 12l-8 8-4-4 8-8 4 4z" fill="#f5cac3" />
          <circle cx="20" cy="20" r="3" fill="#f6bd60" />
        </g>
      );
    case 7:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M20 9c-6.5 0-11.5 4.8-11.5 11 0 5.8 4.8 10.8 10.5 10.8 1.8 0 3-.9 3-2.2 0-.6-.3-1.2-.6-1.7-.4-.5-.6-.9-.6-1.5 0-1.2.9-2 2.2-2h2.5c3.8 0 6.5-2.8 6.5-6.8C32 12 26.8 9 20 9z" fill="#ffffff" />
          <circle cx="14.5" cy="16.5" r="1.7" fill="#ef4444" />
          <circle cx="18.5" cy="13.5" r="1.7" fill="#f59e0b" />
          <circle cx="23" cy="14.5" r="1.7" fill="#10b981" />
          <circle cx="14.5" cy="21" r="1.7" fill="#6366f1" />
          <path d="M22 26l7-12" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    default:
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M17 9h6v8h8v6h-8v8h-6v-8H9v-6h8V9z" fill="#2b9348" />
        </g>
      );
  }
};

export const CharacterAndEightBasesSection: React.FC = () => {
  const { schoolIdentity } = useApp();
  const [selectedNum, setSelectedNum] = useState<number>(1);

  const cx = 280;
  const cy = 280;
  const innerR = 88;
  const outerR = 232;
  const labelArcR = 248;

  const selectedSlice = SLICES.find((s) => s.num === selectedNum) || SLICES[0];

  return (
    <section
      id="karakter-dan-8-basis"
      className="relative w-full bg-[#F2F7FB] pb-8 sm:pb-20 px-3.5 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto">
        <div className="w-full bg-[#092338] rounded-3xl sm:rounded-[40px] py-8 px-4 sm:py-16 sm:px-10 lg:px-14 relative overflow-hidden shadow-[0_28px_70px_-28px_rgba(9,35,56,0.5)] border border-white/10 editorial-hairline-grid">
          {/* Subtle Ambient Radial Light */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#006699]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
            {/* Left 6 Cols: Interactive 8-Basis Circular Wheel */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[265px] sm:max-w-[430px] aspect-square flex items-center justify-center">
                <svg viewBox="0 0 560 560" className="w-full h-full select-none overflow-visible">
                  <defs>
                    {SLICES.map((slice) => {
                      const isBottom = slice.startAngle >= 135 && slice.endAngle <= 225;
                      return (
                        <path
                          key={`arc-${slice.num}`}
                          id={`text-arc-${slice.num}`}
                          d={createTextArcPath(
                            cx,
                            cy,
                            labelArcR,
                            slice.startAngle + 3,
                            slice.endAngle - 3,
                            isBottom
                          )}
                        />
                      );
                    })}
                    <path
                      id="center-hub-arc"
                      d={createTextArcPath(cx, cy, 62, 260, 100, true)}
                    />
                  </defs>

                  {SLICES.map((slice) => {
                    const midAngle = (slice.startAngle + slice.endAngle) / 2;
                    const iconPos = polarToCartesian(cx, cy, 160, midAngle);
                    const badgePos = polarToCartesian(cx, cy, 114, midAngle);
                    const isSelected = selectedNum === slice.num;

                    return (
                      <g
                        key={slice.num}
                        onClick={() => setSelectedNum(slice.num)}
                        className="cursor-pointer transition-opacity duration-200"
                        style={{ opacity: isSelected ? 1 : 0.78 }}
                      >
                        <path
                          d={createAnnularSectorPath(
                            cx,
                            cy,
                            innerR,
                            isSelected ? outerR + 7 : outerR,
                            slice.startAngle,
                            slice.endAngle
                          )}
                          fill={slice.wedgeColor}
                          stroke={isSelected ? '#fbbf24' : '#092338'}
                          strokeWidth={isSelected ? '5' : '6'}
                          strokeLinejoin="round"
                        />

                        <text
                          fill={isSelected ? '#fbbf24' : '#cbd5e1'}
                          fontSize="14"
                          fontWeight="800"
                          letterSpacing="0.06em"
                        >
                          <textPath
                            href={`#text-arc-${slice.num}`}
                            startOffset="50%"
                            textAnchor="middle"
                          >
                            {slice.title}
                          </textPath>
                        </text>

                        <circle cx={iconPos.x} cy={iconPos.y} r="36" fill={slice.circleColor} />
                        <SliceIcon num={slice.num} x={iconPos.x} y={iconPos.y} />

                        <circle
                          cx={badgePos.x}
                          cy={badgePos.y}
                          r="11.5"
                          fill={isSelected ? '#fbbf24' : '#092338'}
                        />
                        <text
                          x={badgePos.x}
                          y={badgePos.y + 4}
                          textAnchor="middle"
                          fill={isSelected ? '#092338' : '#ffffff'}
                          fontSize="11.5"
                          fontWeight="800"
                        >
                          {slice.num}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Hub Circle */}
                  <circle cx={cx} cy={cy} r={innerR} fill="#092338" />

                  {/* Center 5-Petal Emblem */}
                  <g transform={`translate(${cx - 45}, ${cy - 52}) scale(0.9)`}>
                    <path d="M50,50 C38,32 30,12 48,6 C66,0 68,26 50,50 Z" fill="#a2d240" />
                    <path d="M50,50 C68,38 88,30 94,48 C100,66 74,68 50,50 Z" fill="#0084d6" />
                    <path d="M50,50 C62,68 70,88 52,94 C34,100 32,74 50,50 Z" fill="#00a896" />
                    <path d="M50,50 C32,62 12,70 6,52 C0,34 26,32 50,50 Z" fill="#29a9e1" />
                    <path d="M50,50 C25,36 18,14 36,10 C50,8 54,32 50,50 Z" fill="#6ab04c" />
                    <circle cx="50" cy="50" r="6" fill="#092338" />
                  </g>

                  <text
                    fill="#38bdf8"
                    fontSize="12.5"
                    fontWeight="800"
                    letterSpacing="0.06em"
                  >
                    <textPath href="#center-hub-arc" startOffset="50%" textAnchor="middle">
                      8 BASIS PEMBELAJARAN
                    </textPath>
                  </text>
                </svg>
              </div>
              <p className="text-[10.5px] sm:text-xs text-sky-200/75 mt-2">
                Ketuk salah satu segmen roda untuk membaca penjelasannya
              </p>
            </div>

            {/* Right 6 Cols: Editorial Title + Live Interactive Insight Panel */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Roda Karakter Interaktif <span className="text-white/30 mx-1">·</span> 8 Basis Fitrah
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.12] [text-wrap:balance]">
                  Pendidikan Karakter di {schoolIdentity.nama}
                </h2>
                <p className="text-sky-100/85 text-xs sm:text-[15px] leading-relaxed">
                  Bersekolah di {schoolIdentity.nama} membentuk ananda menjadi pribadi yang memiliki iman dan takwa kepada Allah SWT, integritas, harga diri, serta kepekaan terhadap lingkungan fisik maupun sosial.
                </p>
              </div>

              {/* Active Slice Detail Card */}
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300">
                    Basis #{selectedSlice.num} · {selectedSlice.title}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full ring-2 ring-white/30 shrink-0"
                    style={{ backgroundColor: selectedSlice.wedgeColor }}
                  />
                </div>
                <p className="font-serif italic text-sm sm:text-lg text-white leading-relaxed">
                  &ldquo;{selectedSlice.desc}&rdquo;
                </p>
              </div>

              {/* Quick 1-8 Interactive Selector Buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {SLICES.map((s) => {
                  const active = s.num === selectedNum;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setSelectedNum(s.num)}
                      className={`px-2 py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer truncate border ${
                        active
                          ? 'bg-amber-400 text-[#092338] border-amber-300 shadow-md'
                          : 'bg-white/[0.05] text-sky-100/80 border-white/10 hover:bg-white/12 hover:text-white'
                      }`}
                    >
                      {s.num}. {s.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
