import { useEffect, useState } from 'react';
import { getNextSimulationStep, getSimulationSteps } from '../securitySimulation.js';

const scriptContent = '<script>eval(atob("c3RlYWxEYXRh()"));</script>';
const simulationSteps = getSimulationSteps();
const detectionMetrics = [
  {
    label: '전체 악성 기준 탐지율',
    value: 91.23,
    suffix: '%',
    decimals: 2,
    description: '실제 악성 샘플 114건 중 104건을 악성 판정까지 연결했습니다.'
  },
  {
    label: '판정 가능 악성 Recall',
    value: 100,
    suffix: '%',
    decimals: 2,
    description: '접근 가능한 악성 URL은 모두 악성 판정으로 연결했습니다.'
  },
  {
    label: 'Precision',
    value: 99.05,
    suffix: '%',
    decimals: 2,
    description: '악성으로 판정한 URL 중 실제 악성으로 확인된 비율입니다.'
  },
  {
    label: 'F1 Score',
    value: 99.52,
    suffix: '%',
    decimals: 2,
    description: '탐지 정확도와 재현율의 균형을 함께 보여주는 종합 지표입니다.'
  }
];
const managementFlow = [
  {
    icon: 'icon-shield-check',
    title: '검사 결과 확인',
    description: '검사 결과, 차단 이유, 다음 행동을 확인해 복잡한 보안 용어 없이 바로 판단할 수 있습니다.'
  },
  {
    icon: 'icon-folder',
    title: '폴더',
    description: '링크를 사용자가 생성한 폴더에 추가하고 필요할 때 빠르게 찾을 수 있습니다.'
  },
  {
    icon: 'icon-bookmark',
    title: '북마크',
    description: (
      <>
        자주 찾는 링크를 빠르게 저장하고 필요할 때
        <br />
        바로 다시 엽니다.
      </>
    )
  }
];

export default function Features() {
  const [step, setStep] = useState(0);
  const [activeManagementStep, setActiveManagementStep] = useState(0);
  const currentStep = simulationSteps[step];

  useEffect(() => {
    const isFinalStep = step === simulationSteps.length - 1;
    if (isFinalStep) return undefined;

    const delay = step === 0 ? 3200 : 3600;
    const timerId = setTimeout(() => {
      setStep((previousStep) => getNextSimulationStep(previousStep, simulationSteps.length));
    }, delay);

    return () => clearTimeout(timerId);
  }, [step]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setActiveManagementStep((currentStep) => (currentStep + 1) % managementFlow.length);
    }, 1800);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section id="features" className="py-24 bg-white overflow-hidden border-t border-gray-100" data-name="Features" data-file="src/components/Features.jsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight break-keep leading-tight">
            보이지 않는 위협까지 찾아냅니다
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed">
            LinClean은 외부 위협 DB, 도메인 휴리스틱, 콘텐츠 분석과 AI 보조 판정을{' '}<br className="hidden sm:block" />
            하나의 점수로 합산해 접속 전 위험도를 판단합니다.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-14 items-center">
          <ThreatBrowserMockup currentStep={currentStep} step={step} />

          <div className="space-y-3">
            {simulationSteps.map((item, index) => (
              <WorkflowStep
                key={item.engineStage}
                item={item}
                state={index < step ? 'done' : index === step ? 'active' : 'waiting'}
              />
            ))}
            <div className="pt-3 text-xs text-gray-400 font-medium">
              누적 점수는 100점으로 제한되며 61점 이상이면 danger로 접속과 저장을 차단합니다.
            </div>
          </div>
        </div>

        <DetectionRateSection />

        <div className="mt-36 pt-20 border-t border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight break-keep leading-tight">
              더 쉽게 관리하세요
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed">
              사용자는 위험 링크를 걸러낸 뒤 저장, 분류, 재방문까지 이어지는
              <br className="hidden sm:block" /> 링크 관리 흐름을
              자연스럽게 이어갈 수 있습니다.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {managementFlow.map((item, index) => (
              <ServiceStrength
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isActive={index === activeManagementStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreatBrowserMockup({ currentStep, step }) {
  const showPage = step >= 2;
  const showContentSignals = step >= 3;

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/4] max-w-[500px] mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="ml-2 flex-1 bg-white rounded text-xs px-2 py-1 text-gray-500 font-mono truncate border border-gray-200">
          {currentStep.browserUrl}
        </div>
      </div>

      <div className="flex-1 relative bg-white p-5 flex flex-col items-center">
        <div className={`w-full transition-opacity duration-500 ${showPage ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="icon-building-2 text-2xl text-blue-600"></div>
          </div>
          <h4 className="text-center font-bold text-gray-800 mb-4">고객 정보 업데이트</h4>

          <div className="space-y-3">
            <div>
              <div className="h-2.5 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-9 w-full bg-gray-50 border border-gray-200 rounded"></div>
            </div>
            <div className="relative">
              <div className="h-2.5 w-24 bg-gray-200 rounded mb-2"></div>
              <div className={`h-9 w-full rounded border transition-colors duration-300 ${showContentSignals ? 'bg-red-50 border-red-400 ring-2 ring-red-200' : 'bg-gray-50 border-gray-200'}`}></div>

              <div className={`absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap transition-all duration-300 ${showContentSignals ? 'opacity-100 translate-x-[110%]' : 'opacity-0 translate-x-[80%] pointer-events-none'}`}>
                금융정보 입력 필드
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-transparent border-r-red-600"></div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-dashed border-gray-200">
            <div className={`p-2 font-mono text-[10px] break-all rounded transition-colors duration-300 ${showContentSignals ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
              {scriptContent}
            </div>
            <div className={`mt-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg text-center transition-all duration-300 ${showContentSignals ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              브랜드 사칭 폼과 난독화 스크립트 발견
            </div>
          </div>
        </div>

        {step < 2 && (
          <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[1px] flex flex-col items-center justify-center transition-opacity duration-500">
            <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border border-blue-100 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-bold text-blue-700">{currentStep.title}</span>
            </div>
          </div>
        )}

        <div className={`absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${currentStep.engineStage === 'verdict' ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <div className="icon-shield-alert text-5xl text-red-600"></div>
          </div>
          <h3 className="text-2xl font-black text-white mb-3">접속 및 저장 차단</h3>
          <p className="text-red-100 text-sm leading-relaxed max-w-[280px] whitespace-pre-line">
            {currentStep.resultMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceStrength({ icon, title, description, isActive }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white p-6 h-full transition-all duration-500 ${isActive ? 'border-emerald-300 shadow-xl -translate-y-1' : 'border-gray-200 shadow-sm'}`}>
      <div className={`absolute inset-x-0 top-0 h-1 transition-colors duration-500 ${isActive ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
          <div className={`${icon} text-xl`}></div>
        </div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed break-keep">{description}</p>
    </div>
  );
}

function DetectionRateSection() {
  return (
    <div className="mt-32 pt-20 border-t border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight break-keep leading-tight">
          검증된 탐지 성능
        </h2>
        <p className="text-base sm:hidden text-gray-500 max-w-3xl mx-auto break-keep leading-relaxed">
          LinClean 보안 엔진은 실제 수집 URL과 자체 회귀 샘플을
          <br />
          함께 점검해 악성 링크 판정의
          <br />
          정확도와 일관성을 검증합니다.
        </p>
        <p className="hidden sm:block text-lg text-gray-500 max-w-3xl mx-auto break-keep leading-relaxed">
          LinClean 보안 엔진은 실제 수집 URL과 자체 회귀 샘플을 함께
          <br />
          점검해 악성 링크 판정의 정확도와 일관성을 검증합니다.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {detectionMetrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500 mb-3">{metric.label}</p>
            <p className="text-3xl font-black text-gray-900 mb-3">
              <AnimatedMetricValue
                value={metric.value}
                suffix={metric.suffix}
                decimals={metric.decimals}
              />
            </p>
            <p className="text-sm text-gray-500 leading-relaxed break-keep">{metric.description}</p>
          </div>
        ))}
      </div>

      <p className="max-w-5xl mx-auto mt-4 text-xs text-gray-400 text-center">
        접근 불가 페이지는 별도 상태로 분리해 실제 판정 품질 지표와 구분합니다.
      </p>
    </div>
  );
}

function AnimatedMetricValue({ value, suffix, decimals }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return `${displayValue.toFixed(decimals)}${suffix}`;
}

function WorkflowStep({ item, state }) {
  const isActive = state === 'active';
  const isDone = state === 'done';

  return (
    <div className={`flex items-start gap-3 transition-all duration-300 ${state === 'waiting' ? 'opacity-40 grayscale' : 'opacity-100'}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-red-100 text-red-600 ring-4 ring-red-50' : isDone ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
        <div className={isDone ? 'icon-check' : item.icon}></div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className={`font-bold text-sm ${isActive ? 'text-red-600' : isDone ? 'text-gray-900' : 'text-gray-500'}`}>
            {item.title}
          </h4>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.subtitle}</p>
        {(isActive || isDone) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.signals.map((signal) => (
              <span key={signal} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-[11px] font-medium">
                {signal}
              </span>
            ))}
            <span className="px-2 py-1 rounded bg-gray-900 text-white text-[11px] font-semibold">
              누적 {item.cumulativeScore}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
