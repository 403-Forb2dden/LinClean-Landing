import { useEffect, useState } from 'react';
import { HERO_SCAN_DURATION_MS } from '../heroConfig.js';

const betaBuildUrl = 'https://expo.dev/accounts/dkdododo/projects/LinClean/builds/46e8127e-dc07-46aa-bec0-0c943a8ef9ed';

export default function Hero() {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, HERO_SCAN_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-14 pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white" data-name="Hero" data-file="src/components/Hero.jsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:translate-x-8 xl:translate-x-12 transition-transform">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-main)] mb-12 leading-tight">
              모든 링크를 한 곳에서<br />
              <span className="block h-4"></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">안전하고 편리하게</span>
            </h1>
            <div className="mt-12 flex flex-col items-center lg:items-start">
              <p className="text-sm font-bold text-emerald-700 mb-4">Android 베타 테스트</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 tracking-tight">
                앱 출시 전 LinClean을 먼저 사용해보세요
              </h2>
              <a
                href={betaBuildUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-2xl shadow-emerald-500/30 ring-1 ring-emerald-400/20 hover:from-emerald-600 hover:to-teal-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <span className="icon-rocket text-xl"></span>
                </span>
                <span>베타 테스트하러 가기</span>
                <span className="icon-arrow-up-right text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></span>
              </a>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0 flex justify-center">
            <div className="w-[300px] h-[600px] bg-white rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden relative flex flex-col">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-2xl mx-16 z-20"></div>

              <div className="flex-1 bg-[#F5F8F7] flex flex-col relative z-10 transition-colors duration-500">
                <div className="pt-12 pb-2 px-6 flex items-center gap-3 shrink-0">
                  <div className="icon-chevron-left text-xl text-gray-800 font-bold cursor-pointer"></div>
                  <h2 className="text-[17px] font-bold text-gray-800">
                    {isScanning ? '링크 검사 중' : '검사 완료'}
                  </h2>
                </div>

                {isScanning ? (
                  <div className="flex-1 flex flex-col items-center justify-center -mt-6 animate-in fade-in duration-300">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                      <div className="absolute inset-0 rounded-full border-[10px] border-[#DCE8E2]"></div>
                      <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-[#6C9E89] border-r-[#6C9E89] border-b-[#6C9E89] animate-spin" style={{ animationDuration: '1.5s' }}></div>
                      <div className="text-3xl text-gray-500 font-bold tracking-widest leading-none pb-2">...</div>
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">보안 검사 중입니다</h3>
                    <p className="text-[#84928A] text-[12px] font-medium mb-8">약 5-10초 정도 소요돼요</p>
                    <div className="w-[88%] bg-white rounded-[16px] p-3 shadow-sm">
                      <p className="text-[10px] text-gray-500 mb-1 font-medium">검사 대상</p>
                      <p className="text-[12px] font-bold text-gray-800 truncate">https://linclean.kr/docs</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center -mt-3 px-6 animate-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-[#E8F3EE] rounded-full flex items-center justify-center mb-3 shadow-inner border border-[#DCE8E2]">
                      <div className="icon-shield-check text-3xl text-[#6C9E89]"></div>
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-1">안전한 링크입니다</h3>

                    <div className="w-full bg-white rounded-[16px] p-3 shadow-sm mb-3 border border-[#E8EFEC]">
                      <p className="text-[10px] text-gray-500 mb-1 font-medium">판정 이유</p>
                      <p className="text-[12px] leading-relaxed text-[#5F6F67] font-medium">
                        위험 신호와 차단 이력이 발견되지 않아 안전합니다.
                      </p>
                    </div>

                    <div className="w-full bg-white rounded-[16px] p-3 shadow-sm mb-4">
                      <p className="text-[10px] text-gray-500 mb-1 font-medium">검사 대상</p>
                      <p className="text-[12px] font-bold text-gray-800 truncate text-[#6C9E89]">https://linclean.kr/docs</p>
                    </div>

                    <div className="w-full space-y-2">
                      <button className="w-full bg-[#6C9E89] hover:bg-[#5A8774] text-white rounded-xl py-3 font-bold text-[14px] shadow-sm transition-colors">
                        저장
                      </button>
                      <button className="w-full bg-white hover:bg-gray-50 text-[#6C9E89] border border-[#DCE8E2] rounded-xl py-3 font-bold text-[14px] transition-colors">
                        즉시 URL 접속
                      </button>
                    </div>
                  </div>
                )}

                <div className="h-[72px] bg-white flex justify-between items-center px-8 relative z-20 border-t border-gray-100 shrink-0">
                  <div className="flex flex-col items-center gap-1 text-[#8C9B93]">
                    <div className="icon-house text-xl"></div>
                    <span className="text-[9px] font-medium">홈</span>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 -top-5 flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="링크 추가"
                      className="relative w-[52px] h-[52px] bg-[#859E92] rounded-full flex items-center justify-center text-white border-[3px] border-[#F5F8F7] shadow-sm hover:scale-105 transition-transform cursor-pointer mb-0.5"
                    >
                      <div className="icon-link-2 text-2xl font-bold"></div>
                      <span className="absolute right-2 bottom-2 w-4 h-4 text-white flex items-center justify-center">
                        <span className="text-[16px] font-black leading-none" style={{ WebkitTextStroke: '3px #859E92', paintOrder: 'stroke fill' }}>+</span>
                      </span>
                    </button>
                    <span className="text-[9px] font-medium text-[#8C9B93] mt-1">링크 추가</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 text-[#8C9B93]">
                    <div className="icon-folder text-xl"></div>
                    <span className="text-[9px] font-medium">폴더</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
