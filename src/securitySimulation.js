export const SCORE_THRESHOLDS = {
  safeMax: 30,
  caution: 31,
  danger: 61,
  totalCap: 100
};

const rawSimulationSteps = [
  {
    engineStage: 'url_prepare',
    title: '1. URL 정리',
    subtitle: '입력 URL을 정규화하고 리다이렉트 최종 도착지를 확인합니다.',
    browserUrl: 'http://bit.ly/secure-bank-auth',
    icon: 'icon-link-2',
    scoreLabel: 'normalize + redirect',
    scoreDelta: 15,
    signals: ['URL 정규화', 'REDIRECT_CROSS_ORIGIN +15'],
    visualState: 'redirect'
  },
  {
    engineStage: 'threat_db',
    title: '2. 외부 위협 DB',
    subtitle: 'Google Safe Browsing과 URLhaus 캐시에서 알려진 악성 등록 여부를 확인합니다.',
    browserUrl: 'http://update-secure-bank.com/auth',
    icon: 'icon-database-zap',
    scoreLabel: 'GSB / URLhaus',
    scoreDelta: 0,
    signals: ['매치 없음', '다음 단계 계속'],
    visualState: 'database'
  },
  {
    engineStage: 'heuristic',
    title: '3. URL 휴리스틱',
    subtitle: 'open redirect 파라미터, 민감 경로, 브랜드 유사 URL을 가중치로 합산합니다.',
    browserUrl: 'http://update-secure-bank.com/auth?next=/login',
    icon: 'icon-radar',
    scoreLabel: 'URL pattern signals',
    scoreDelta: 51,
    signals: ['OPEN_REDIRECT_PARAM +31', 'SENSITIVE_PATH +20'],
    visualState: 'domain'
  },
  {
    engineStage: 'content_ai',
    title: '4. 콘텐츠와 AI 판정',
    subtitle: '로그인 폼, 외부 링크, 사칭 문구를 분석하고 AI 보조 판정을 더합니다.',
    browserUrl: 'http://update-secure-bank.com/auth',
    icon: 'icon-sparkles',
    scoreLabel: 'content + AI signals',
    scoreDelta: 75,
    signals: ['BRAND_IMPERSONATION_FORM +50', 'AI Verdict +45'],
    visualState: 'ai'
  },
  {
    engineStage: 'verdict',
    title: '5. 접속 및 저장 차단',
    subtitle: 'danger 판정이 확정되면 접속 버튼과 저장 흐름을 동시에 잠그고, 사용자가 위험 페이지를 열지 않도록 차단 안내를 표시합니다.',
    browserUrl: 'http://update-secure-bank.com/auth',
    icon: 'icon-shield-alert',
    scoreLabel: 'final verdict',
    scoreDelta: 0,
    signals: ['61점 이상 danger', '접속 및 저장 차단'],
    visualState: 'blocked',
    resultMessage: '이 페이지는 이메일과 비밀번호를 요구하며,\n외부 링크가 많아 주의가 필요합니다.'
  }
];

export function getVerdictForScore(score) {
  if (score >= SCORE_THRESHOLDS.danger) return 'danger';
  if (score >= SCORE_THRESHOLDS.caution) return 'caution';
  return 'safe';
}

export function getNextSimulationStep(currentStep, totalSteps) {
  return Math.min(currentStep + 1, totalSteps - 1);
}

export function getSimulationSteps() {
  let cumulativeScore = 0;

  return rawSimulationSteps.map((step) => {
    cumulativeScore = Math.min(
      cumulativeScore + step.scoreDelta,
      SCORE_THRESHOLDS.totalCap
    );

    return {
      ...step,
      cumulativeScore,
      verdict: getVerdictForScore(cumulativeScore)
    };
  });
}
