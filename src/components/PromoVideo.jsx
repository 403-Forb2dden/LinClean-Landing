import { useState } from 'react';

const videoUrl = 'https://www.youtube.com/watch?v=l_kftqMuXeM';
const embedUrl = 'https://www.youtube.com/embed/l_kftqMuXeM?autoplay=1&rel=0';
const thumbnailUrl = 'https://img.youtube.com/vi/l_kftqMuXeM/sddefault.jpg';
const fallbackThumbnailUrl = 'https://img.youtube.com/vi/l_kftqMuXeM/hqdefault.jpg';

export default function PromoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnailUrl);

  return (
    <section className="bg-white pt-24 pb-24 px-4 sm:px-6 lg:px-8" data-name="PromoVideo" data-file="src/components/PromoVideo.jsx">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[22px] min-[375px]:text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight break-keep leading-[1.6] sm:leading-tight">
            영상으로 만나보세요
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed">
            링크를 검사하고 정리하는 흐름을 짧은 영상으로 <span className="whitespace-nowrap">확인할 수 있습니다.</span>
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
      </div>
    </section>
  );
}
