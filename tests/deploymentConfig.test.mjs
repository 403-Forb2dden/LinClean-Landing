import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const viteConfigSource = readFileSync(new URL('../vite.config.js', import.meta.url), 'utf8');
const deployWorkflowSource = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');

test('configures Vite base path only for GitHub Pages project deployment', () => {
  assert.equal(viteConfigSource.includes("process.env.GITHUB_PAGES === 'true'"), true);
  assert.equal(viteConfigSource.includes("'/LinClean-Landing/'"), true);
  assert.equal(viteConfigSource.includes("base: process.env.GITHUB_PAGES === 'true' ? '/LinClean-Landing/' : '/'"), true);
});

test('adds a GitHub Pages workflow that builds and uploads dist', () => {
  assert.equal(deployWorkflowSource.includes("branches: ['main']"), true);
  assert.equal(deployWorkflowSource.includes('GITHUB_PAGES: true'), true);
  assert.equal(deployWorkflowSource.includes('npm ci'), true);
  assert.equal(deployWorkflowSource.includes('npm run build'), true);
  assert.equal(deployWorkflowSource.includes('actions/upload-pages-artifact'), true);
  assert.equal(deployWorkflowSource.includes('path: ./dist'), true);
  assert.equal(deployWorkflowSource.includes('actions/deploy-pages'), true);
});
