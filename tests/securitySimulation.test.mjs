import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SCORE_THRESHOLDS,
  getNextSimulationStep,
  getSimulationSteps,
  getVerdictForScore
} from '../src/securitySimulation.js';

test('models a simplified backend security pipeline for the landing simulation', () => {
  const steps = getSimulationSteps();

  assert.deepEqual(
    steps.map((step) => step.engineStage),
    [
      'url_prepare',
      'threat_db',
      'heuristic',
      'content_ai',
      'verdict'
    ]
  );
  assert.equal(steps.length, 5);
});

test('accumulates stage scores using the backend 0-100 cap and danger threshold', () => {
  const steps = getSimulationSteps();
  const finalStep = steps.at(-1);

  assert.equal(SCORE_THRESHOLDS.danger, 61);
  assert.equal(finalStep.cumulativeScore, 100);
  assert.equal(finalStep.verdict, 'danger');
  assert.equal(getVerdictForScore(30), 'safe');
  assert.equal(getVerdictForScore(31), 'caution');
  assert.equal(getVerdictForScore(61), 'danger');
});

test('provides a user-facing block reason instead of exposing raw score language', () => {
  const finalStep = getSimulationSteps().at(-1);

  assert.equal(finalStep.title, '5. 접속 및 저장 차단');
  assert.equal(
    finalStep.subtitle,
    'danger 판정이 확정되면 접속 버튼과 저장 흐름을 동시에 잠그고, 사용자가 위험 페이지를 열지 않도록 차단 안내를 표시합니다.'
  );
  assert.equal(finalStep.signals.includes('접속 및 저장 차단'), true);
  assert.equal(
    finalStep.resultMessage,
    '이 페이지는 이메일과 비밀번호를 요구하며,\n외부 링크가 많아 주의가 필요합니다.'
  );
  assert.equal(finalStep.resultMessage.includes('누적 위험 점수'), false);
});

test('uses AI Verdict wording for AI-based scoring signals', () => {
  const allSignals = getSimulationSteps().flatMap((step) => step.signals);

  assert.equal(allSignals.some((signal) => signal.includes('AI Verdict')), true);
  assert.equal(allSignals.some((signal) => signal.includes('AI phishing')), false);
});

test('keeps the landing simulation on the final step instead of looping', () => {
  const steps = getSimulationSteps();
  const finalStepIndex = steps.length - 1;

  assert.equal(getNextSimulationStep(0, steps.length), 1);
  assert.equal(getNextSimulationStep(finalStepIndex - 1, steps.length), finalStepIndex);
  assert.equal(getNextSimulationStep(finalStepIndex, steps.length), finalStepIndex);
});
