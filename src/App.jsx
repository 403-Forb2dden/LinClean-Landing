import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import PromoVideo from './components/PromoVideo.jsx';
import Footer from './components/Footer.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">문제가 발생했습니다.</h1>
            <p className="text-gray-600 mb-4">예기치 않은 오류가 발생했습니다. 페이지를 새로고침 해주세요.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen" data-name="app" data-file="src/App.jsx">
        <Header />
        <main className="flex-grow">
          <Hero />
          <PromoVideo />
          <Features />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
