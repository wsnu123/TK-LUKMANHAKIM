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
    labelColor: '#76ae48',
    circleColor: '#7eb349',
    startAngle: 0,
    endAngle: 45,
  },
  {
    num: 2,
    title: 'PRESTASI',
    desc: 'Penghargaan tulus pada setiap usaha, keberanian mencoba, dan capaian perkembangan setiap anak.',
    wedgeColor: '#a6dbb8',
    labelColor: '#56a174',
    circleColor: '#52a166',
    startAngle: 45,
    endAngle: 90,
  },
  {
    num: 3,
    title: 'LIVING VALUES',
    desc: 'Pendidikan berbasis nilai kehidupan nyata: keimanan, kasih sayang, rasa syukur, dan kedamaian hati.',
    wedgeColor: '#b5e2f9',
    labelColor: '#48a8da',
    circleColor: '#3ea3d5',
    startAngle: 90,
    endAngle: 135,
  },
  {
    num: 4,
    title: 'LUGAS',
    desc: 'Orientasi pada kelugasan berpikir, kejujuran berekspresi secara santun, dan keberanian bertindak.',
    wedgeColor: '#a6bfe4',
    labelColor: '#5d8bc8',
    circleColor: '#f3e47c',
    startAngle: 135,
    endAngle: 180,
  },
  {
    num: 5,
    title: 'PROSES',
    desc: 'Pembelajaran adalah proses eksplorasi yang terbuka, partisipatif, dan menggembirakan bagi anak.',
    wedgeColor: '#9e93c1',
    labelColor: '#6d5ca6',
    circleColor: '#614f8f',
    startAngle: 180,
    endAngle: 225,
  },
  {
    num: 6,
    title: 'TOLERANSI',
    desc: 'Penghargaan dan toleransi pada perbedaan, saling menolong, serta melatih empati sosial sejak dini.',
    wedgeColor: '#f3bad2',
    labelColor: '#d36b93',
    circleColor: '#d6628a',
    startAngle: 225,
    endAngle: 270,
  },
  {
    num: 7,
    title: 'PRAKTEK OASE',
    desc: 'Olah Agama, Seni, dan Raga dipraktikkan langsung secara nyata dan menyenangkan setiap hari.',
    wedgeColor: '#f6aba3',
    labelColor: '#df7870',
    circleColor: '#df6c63',
    startAngle: 270,
    endAngle: 315,
  },
  {
    num: 8,
    title: 'DISIPLIN POSITIF',
    desc: 'Ditanamkan dari kebiasaan sehari-hari di sekolah dengan keteladanan dan kasih sayang tanpa paksaan.',
    wedgeColor: '#fcd299',
    labelColor: '#e6af5e',
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
    case 1: // Child face
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          {/* Hair & Head */}
          <circle cx="20" cy="20" r="11" fill="#fde2c4" />
          <path d="M9 18c0-7 5-11 11-11s11 4 11 11c-2-3-5-4-11-4s-9 1-11 4z" fill="#8d5524" />
          <circle cx="16" cy="20" r="1.4" fill="#1e293b" />
          <circle cx="24" cy="20" r="1.4" fill="#1e293b" />
          <path d="M16.5 24.5c2 2 5 2 7 0" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Collar */}
          <path d="M13 30l7 4 7-4" fill="#ffffff" />
        </g>
      );
    case 2: // Trophy
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M12 10h16v7a8 8 0 0 1-16 0v-7z" fill="#f5b841" />
          <path d="M12 12H9a3 3 0 0 0 0 6h3M28 12h3a3 3 0 0 1 0 6h-3" stroke="#f5b841" strokeWidth="2.2" fill="none" />
          <rect x="18" y="24" width="4" height="5" fill="#e09f2d" />
          <rect x="13" y="29" width="14" height="3.5" rx="1" fill="#f5b841" />
        </g>
      );
    case 3: // Hand & Heart
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path
            d="M20 22s-6.5-3.8-6.5-8.2A3.6 3.6 0 0 1 20 11a3.6 3.6 0 0 1 6.5 2.8C26.5 18.2 20 22 20 22z"
            fill="#e63946"
          />
          <path
            d="M10 26h13c2.5 0 4.5-1.5 6-3.2l1.5 1.5c-2 2.8-4.8 4.7-8.5 4.7H10v-3z"
            fill="#f4a261"
          />
        </g>
      );
    case 4: // Red head silhouette with bulb
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path
            d="M13 30v-4c-2-2-3-5-3-8a10 10 0 0 1 20 0l2 3-2 2v3c0 1.5-1.2 2.5-3 2.5h-4v1.5H13z"
            fill="#d64550"
          />
          <circle cx="20" cy="16" r="4.2" fill="#ffffff" />
          <rect x="18.5" y="20" width="3" height="2" fill="#fde047" />
        </g>
      );
    case 5: // Open head with glowing lightbulb
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <circle cx="20" cy="13" r="5" fill="#facc15" />
          <path d="M13 28c0-4 3-7 7-7s7 3 7 7" fill="#fde68a" />
          <rect x="15" y="26" width="10" height="5" rx="1" fill="#cbd5e1" />
        </g>
      );
    case 6: // Helping hands
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M9 26l8-8 4 4-8 8-4-4z" fill="#f6bd60" />
          <path d="M31 12l-8 8-4-4 8-8 4 4z" fill="#f5cac3" />
          <circle cx="20" cy="20" r="3" fill="#f6bd60" />
        </g>
      );
    case 7: // Artist palette & brush
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path
            d="M20 9c-6.5 0-11.5 4.8-11.5 11 0 5.8 4.8 10.8 10.5 10.8 1.8 0 3-.9 3-2.2 0-.6-.3-1.2-.6-1.7-.4-.5-.6-.9-.6-1.5 0-1.2.9-2 2.2-2h2.5c3.8 0 6.5-2.8 6.5-6.8C32 12 26.8 9 20 9z"
            fill="#ffffff"
          />
          <circle cx="14.5" cy="16.5" r="1.7" fill="#ef4444" />
          <circle cx="18.5" cy="13.5" r="1.7" fill="#f59e0b" />
          <circle cx="23" cy="14.5" r="1.7" fill="#10b981" />
          <circle cx="14.5" cy="21" r="1.7" fill="#6366f1" />
          <path d="M22 26l7-12" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    default: // 8: Green cross +
      return (
        <g transform={`translate(${x - 20}, ${y - 20})`}>
          <path d="M17 9h6v8h8v6h-8v8h-6v-8H9v-6h8V9z" fill="#2b9348" />
        </g>
      );
  }
};

export const CharacterAndEightBasesSection: React.FC = () => {
  const { schoolIdentity } = useApp();
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const cx = 280;
  const cy = 280;
  const innerR = 88;
  const outerR = 232;
  const labelArcR = 244;

  const selectedSlice = SLICES.find((s) => s.num === selectedNum) || null;

  return (
    <section id="karakter-dan-8-basis" className="relative w-full bg-white py-6 sm:py-10 overflow-hidden">
      {/* Subtle decorative blue circle ring peeking top-right like screenshot */}
      <div className="hidden sm:block absolute right-[10%] top-1 w-14 h-14 rounded-full border-[4px] border-[#9ab7db] pointer-events-none z-0" />

      {/* Rounded Slate-Blue Main Container matching Screenshot 1 */}
      <div className="w-full bg-[#5a6b7c] rounded-[28px] sm:rounded-[38px] py-14 sm:py-20 px-4 sm:px-8 relative z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* 8 Basis Pembelajaran Circular Wheel */}
          <div className="w-full max-w-[360px] sm:max-w-[460px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 560 560" className="w-full h-full select-none overflow-visible">
              <defs>
                {SLICES.map((slice) => {
                  // Bottom slices (90 to 270 deg) reverse path so text isn't upside down, or follow exact wheel orientation
                  const isBottom = slice.startAngle >= 135 && slice.endAngle <= 225;
                  return (
                    <path
                      key={`arc-${slice.num}`}
                      id={`text-arc-${slice.num}`}
                      d={createTextArcPath(cx, cy, labelArcR, slice.startAngle + 3, slice.endAngle - 3, isBottom)}
                    />
                  );
                })}
                {/* Inner arc for "8 BASIS PEMBELAJARAN" inside the center hub */}
                <path
                  id="center-hub-arc"
                  d={createTextArcPath(cx, cy, 62, 260, 100, true)}
                />
              </defs>

              {/* 8 Wedge Slices */}
              {SLICES.map((slice) => {
                const midAngle = (slice.startAngle + slice.endAngle) / 2;
                const iconPos = polarToCartesian(cx, cy, 160, midAngle);
                const badgePos = polarToCartesian(cx, cy, 114, midAngle);
                const isSelected = selectedNum === slice.num;

                return (
                  <g
                    key={slice.num}
                    onClick={() => setSelectedNum(isSelected ? null : slice.num)}
                    className="cursor-pointer transition-transform duration-200 hover:opacity-95"
                  >
                    {/* Wedge Sector */}
                    <path
                      d={createAnnularSectorPath(cx, cy, innerR, outerR, slice.startAngle, slice.endAngle)}
                      fill={slice.wedgeColor}
                      stroke="#5a6b7c"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />

                    {/* Outer Curved Title */}
                    <text
                      fill={slice.labelColor}
                      fontSize="15"
                      fontWeight="800"
                      letterSpacing="0.04em"
                    >
                      <textPath
                        href={`#text-arc-${slice.num}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {slice.title}
                      </textPath>
                    </text>

                    {/* Inner Icon Circle */}
                    <circle
                      cx={iconPos.x}
                      cy={iconPos.y}
                      r="38"
                      fill={slice.circleColor}
                    />

                    {/* Slice Illustration */}
                    <SliceIcon num={slice.num} x={iconPos.x} y={iconPos.y} />

                    {/* Red Number Badge (1 - 8) */}
                    <circle
                      cx={badgePos.x}
                      cy={badgePos.y}
                      r="11.5"
                      fill="#e63946"
                    />
                    <text
                      x={badgePos.x}
                      y={badgePos.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="800"
                    >
                      {slice.num}
                    </text>
                  </g>
                );
              })}

              {/* Center Hub Circle */}
              <circle cx={cx} cy={cy} r={innerR} fill="#5a6b7c" />

              {/* Center 5-Petal Emblem */}
              <g transform={`translate(${cx - 45}, ${cy - 52}) scale(0.9)`}>
                <path d="M50,50 C38,32 30,12 48,6 C66,0 68,26 50,50 Z" fill="#a2d240" />
                <path d="M50,50 C68,38 88,30 94,48 C100,66 74,68 50,50 Z" fill="#0084d6" />
                <path d="M50,50 C62,68 70,88 52,94 C34,100 32,74 50,50 Z" fill="#00a896" />
                <path d="M50,50 C32,62 12,70 6,52 C0,34 26,32 50,50 Z" fill="#29a9e1" />
                <path d="M50,50 C25,36 18,14 36,10 C50,8 54,32 50,50 Z" fill="#6ab04c" />
                <circle cx="50" cy="50" r="6" fill="#5a6b7c" />
              </g>

              {/* Curved "8 BASIS PEMBELAJARAN" inside Center Hub */}
              <text
                fill="#29a9e1"
                fontSize="13.5"
                fontWeight="800"
                letterSpacing="0.05em"
              >
                <textPath href="#center-hub-arc" startOffset="50%" textAnchor="middle">
                  8 BASIS PEMBELAJARAN
                </textPath>
              </text>
            </svg>
          </div>

          {/* Optional Interactive Detail Pill when a slice is clicked */}
          {selectedSlice && (
            <div className="mt-2 mb-4 bg-white/15 backdrop-blur-xs border border-white/25 rounded-2xl px-5 py-3 max-w-xl text-center text-white transition-all">
              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-200 block">
                Basis #{selectedSlice.num} — {selectedSlice.title}
              </span>
              <p className="text-xs sm:text-sm text-white/95 mt-1 leading-relaxed">
                {selectedSlice.desc}
              </p>
            </div>
          )}

          {/* Centered Title & Subtitle Matching Screenshot 1 */}
          <div className="text-center max-w-4xl mx-auto mt-6 sm:mt-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight">
              Pendidikan Karakter di {schoolIdentity.nama}
            </h2>
            <p className="text-white/95 text-xs sm:text-[14.5px] leading-relaxed font-normal max-w-3xl mx-auto">
              Bersekolah di {schoolIdentity.nama} akan membentuk siswa menjadi individu yang memiliki iman dan ketaqwaan kepada Allah SWT, integritas, harga diri, dan kepekaan terhadap lingkungan, baik lingkungan fisik maupun sosial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
