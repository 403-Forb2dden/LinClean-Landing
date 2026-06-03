import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { HERO_SCAN_DURATION_MS } from '../src/heroConfig.js';

const heroSource = readFileSync(new URL('../src/components/Hero.jsx', import.meta.url), 'utf8');
const footerSource = readFileSync(new URL('../src/components/Footer.jsx', import.meta.url), 'utf8');
const featuresSource = readFileSync(new URL('../src/components/Features.jsx', import.meta.url), 'utf8');
const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const videoSource = readFileSync(new URL('../src/components/PromoVideo.jsx', import.meta.url), 'utf8');
const securitySource = readFileSync(new URL('../src/securitySimulation.js', import.meta.url), 'utf8');

test('keeps the hero phone scan on screen for five seconds and labels it as a 5-10 second scan', () => {
  assert.equal(HERO_SCAN_DURATION_MS, 5000);
  assert.equal(heroSource.includes('약 5-10초 정도 소요돼요'), true);
  assert.equal(heroSource.includes('약 4초 정도 소요돼요'), false);
});

test('removes the requested marketing lines and keeps the main add button as a link icon', () => {
  assert.equal(heroSource.includes('간편한 터치로 악성 링크를 사전에 차단하고'), false);
  assert.equal(footerSource.includes('세상의 모든 링크를 안전하고 편리하게'), false);
  assert.equal(footerSource.includes('Contact'), true);
  assert.equal(footerSource.includes('linclean2026@gmail.com'), true);
  assert.equal(footerSource.indexOf('linclean2026@gmail.com') < footerSource.indexOf('© 2026 LinClean. All rights reserved.'), true);
  assert.equal(heroSource.includes('icon-link-2'), true);
});

test('adds scan result reason and places the compact plus affordance on the main add button', () => {
  assert.equal(heroSource.includes('판정 이유'), true);
  assert.equal(heroSource.includes('위험 신호와 차단 이력이 발견되지 않아 안전합니다.'), true);
  assert.equal(heroSource.includes('aria-label="검사 결과 링크 추가"'), false);
  assert.equal(heroSource.includes('aria-label="링크 추가"'), true);
  assert.equal(heroSource.includes('absolute right-2 bottom-2'), true);
  assert.equal(heroSource.includes('absolute -right-1 -top-1'), false);
  assert.equal(heroSource.includes('rounded-full bg-white text-[#6C9E89] border'), false);
  assert.equal(heroSource.includes('bg-[#859E92] text-white flex items-center justify-center'), false);
  assert.equal(heroSource.includes('style={{ WebkitTextStroke: \'3px #859E92\', paintOrder: \'stroke fill\' }}'), true);
  assert.equal(heroSource.includes('text-[16px] font-black'), true);
  assert.equal(heroSource.includes('icon-plus'), false);
});

test('keeps the threat feature section focused on browser mockup, simplified steps, and service strengths', () => {
  assert.equal(featuresSource.includes('접속 차단됨'), false);
  assert.equal(featuresSource.includes('안전한 곳으로 돌아가기'), false);
  assert.equal(featuresSource.includes('검사 결과 확인'), true);
  assert.equal(featuresSource.includes('쉽고 직관적인 UI'), false);
  assert.equal(featuresSource.includes("title: '폴더'"), true);
  assert.equal(featuresSource.includes("title: '북마크'"), true);
});

test('balances the compact five-step threat layout with separated strengths content', () => {
  assert.equal(featuresSource.includes('lg:aspect-[5/4]'), true);
  assert.equal(featuresSource.includes('item.scoreDelta'), false);
  assert.equal(featuresSource.includes('더 쉽게 관리하세요'), true);
  assert.equal(featuresSource.includes('LinClean으로 더 쉽게 관리하세요'), false);
  assert.equal(featuresSource.includes('mt-32'), true);
});

test('adds detection-rate evidence before the easier management section', () => {
  const detectionIndex = featuresSource.indexOf('<DetectionRateSection />');
  const managementIndex = featuresSource.indexOf('더 쉽게 관리하세요');

  assert.equal(detectionIndex > -1, true);
  assert.equal(managementIndex > detectionIndex, true);
  assert.equal(featuresSource.includes('전체 악성 기준 탐지율'), true);
  assert.equal(featuresSource.includes('value: 91.23'), true);
  assert.equal(featuresSource.includes('판정 가능 악성 Recall'), true);
  assert.equal(featuresSource.includes('value: 100'), true);
  assert.equal(featuresSource.includes('F1 Score'), true);
  assert.equal(featuresSource.includes('99.52'), true);
  assert.equal(featuresSource.includes('requestAnimationFrame'), true);
  assert.equal(featuresSource.includes('AnimatedMetricValue'), true);
  assert.equal(featuresSource.includes('LinClean 보안 엔진은 실제 수집 URL과 자체 회귀 샘플을 함께 점검해'), true);
  assert.equal(featuresSource.includes('<br className="hidden sm:block" />'), true);
  assert.equal(featuresSource.includes('정상 URL 오탐'), false);
  assert.equal(featuresSource.includes('2026-05-31'), false);
  assert.equal(featuresSource.includes('날짜별 평가셋'), false);
  assert.equal(featuresSource.includes('미탐'), false);
});

test('shows the three requested strengths as separate cards', () => {
  assert.equal(featuresSource.includes("title: '검사 결과 확인'"), true);
  assert.equal(featuresSource.includes('title="쉽고 직관적인 UI"'), false);
  assert.equal(featuresSource.includes("title: '폴더'"), true);
  assert.equal(featuresSource.includes("title: '북마크'"), true);
  assert.equal(featuresSource.includes('title="접속 전 보호"'), false);
});

test('formats the block reason with a line break after the password request clause', () => {
  assert.equal(featuresSource.includes('whitespace-pre-line'), true);
});

test('uses access-and-save block wording in the threat simulation UI', () => {
  assert.equal(featuresSource.includes('접속 및 저장 차단'), true);
  assert.equal(featuresSource.includes('접속 차단</h3>'), false);
  assert.equal(securitySource.includes('사용자가 위험 페이지를 열지 않도록 차단 안내를 표시합니다.'), true);
  assert.equal(securitySource.includes('접속 전 차단 화면을 표시합니다.'), false);
});

test('adds a bottom video section with stable thumbnail handling and no YouTube promo wording', () => {
  assert.equal(appSource.includes('<PromoVideo />'), true);
  assert.equal(videoSource.includes('https://www.youtube.com/watch?v=l_kftqMuXeM'), true);
  assert.equal(videoSource.includes('https://www.youtube.com/embed/l_kftqMuXeM'), true);
  assert.equal(videoSource.includes('sddefault.jpg'), true);
  assert.equal(videoSource.includes('hqdefault.jpg'), true);
  assert.equal(videoSource.includes('유튜브 홍보 영상'), false);
});

test('lays out strength cards with horizontal icon-title headers and roomy spacing', () => {
  assert.equal(featuresSource.includes('max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5'), true);
  assert.equal(featuresSource.includes('rounded-2xl border border-gray-200 bg-white p-6'), true);
  assert.equal(featuresSource.includes('flex items-center gap-4 mb-5'), true);
  assert.equal(featuresSource.includes('shrink-0'), true);
  assert.equal(featuresSource.includes('break-keep'), true);
  assert.equal(featuresSource.includes('필요할 때'), true);
  assert.equal(featuresSource.includes('pl-14'), false);
  assert.equal(videoSource.includes('pt-24'), true);
});

test('applies management animation to the three strength cards without a separate preview section', () => {
  assert.equal(featuresSource.includes('managementFlow'), true);
  assert.equal(featuresSource.includes('ManagementFlowPreview'), false);
  assert.equal(featuresSource.includes('setActiveManagementStep'), true);
  assert.equal(featuresSource.includes('검사 결과 확인'), true);
  assert.equal(featuresSource.includes('폴더별 정리'), false);
  assert.equal(featuresSource.includes('북마크로 재방문'), false);
  assert.equal(featuresSource.includes('isActive={index === activeManagementStep}'), true);
  assert.equal(featuresSource.includes('검사 후 바로 이어지는 관리 흐름'), false);
  assert.equal(featuresSource.includes('사용자는 위험 링크를 걸러낸 뒤'), true);
  assert.equal(featuresSource.includes('한 화면에서'), false);
  assert.equal(featuresSource.includes('링크를 사용자가 생성한 폴더에 추가하고 필요할 때 빠르게 찾을 수 있습니다.'), true);
  assert.equal(featuresSource.includes('업무, 학습, 쇼핑 등의'), false);
  assert.equal(featuresSource.includes('업무, 학습, 쇼핑 링크를 폴더별로 나누고 필요한 링크 묶음을 빠르게 다시 찾습니다.'), false);
});

test('adds an Android-only beta test call to action below the video', () => {
  assert.equal(videoSource.includes('베타 테스트하러 가기'), true);
  assert.equal(videoSource.includes('현재 앱 심사 진행 중이라 Android 빌드로 먼저 체험할 수 있습니다.'), false);
  assert.equal(videoSource.includes('안드로이드 폰에서만 설치할 수 있습니다.'), false);
  assert.equal(videoSource.includes('https://expo.dev/accounts/dkdododo/projects/LinClean/builds/46e8127e-dc07-46aa-bec0-0c943a8ef9ed'), true);
  assert.equal(videoSource.includes('target="_blank"'), true);
  assert.equal(videoSource.includes('mt-28'), true);
  assert.equal(videoSource.includes('mt-8'), true);
  assert.equal(videoSource.includes('rounded-2xl border border-emerald-100 bg-emerald-50/70'), false);
  assert.equal(videoSource.includes('bg-[#859E92]'), false);
  assert.equal(videoSource.includes('bg-gradient-to-r from-emerald-500 to-teal-500'), true);
  assert.equal(videoSource.includes('hover:from-emerald-600 hover:to-teal-600'), true);
  assert.equal(videoSource.includes('bg-gray-950'), false);
  assert.equal(videoSource.includes('shadow-2xl shadow-emerald-500/30'), true);
});
