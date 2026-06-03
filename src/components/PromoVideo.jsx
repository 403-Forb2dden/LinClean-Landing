import { useState } from 'react';

const videoUrl = 'https://www.youtube.com/watch?v=l_kftqMuXeM';
const embedUrl = 'https://www.youtube.com/embed/l_kftqMuXeM?autoplay=1&rel=0';
const thumbnailUrl = 'https://img.youtube.com/vi/l_kftqMuXeM/sddefault.jpg';
const fallbackThumbnailUrl = 'https://img.youtube.com/vi/l_kftqMuXeM/hqdefault.jpg';
const betaBuildUrl = 'https://expo.dev/accounts/dkdododo/projects/LinClean/builds/46e8127e-dc07-46aa-bec0-0c943a8ef9ed';

export default function PromoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnailUrl);

  return (
    <section className="bg-white pt-24 pb-24 px-4 sm:px-6 lg:px-8" data-name="PromoVideo" data-file="src/components/PromoVideo.jsx">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            LinClean을 영상으로 만나보세요
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            링크를 검사하고 정리하는 흐름을 짧은 영상으로 확인할 수 있습니다.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title="LinClean 소개 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <button
              type="button"
              className="absolute inset-0 w-full h-full group"
              onClick={() => setIsPlaying(true)}
              aria-label="LinClean 소개 영상 재생"
            >
              <img
                src={thumbnailSrc}
                alt="LinClean 소개 영상 미리보기"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setThumbnailSrc(fallbackThumbnailUrl)}
              />
              <div className="absolute inset-0 bg-gray-900/25 group-hover:bg-gray-900/35 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                  <div className="icon-play text-3xl md:text-4xl translate-x-0.5"></div>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="sr-only">
          <a href={videoUrl}>LinClean 소개 영상 보기</a>
        </div>

        <div className="mt-28 text-center">
          <p className="text-sm font-bold text-emerald-700 mb-4">Android 베타 테스트</p>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
            앱 출시 전 LinClean을 먼저 사용해보세요
          </h3>
          <div className="mt-8">
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
      </div>
    </section>
  );
}
