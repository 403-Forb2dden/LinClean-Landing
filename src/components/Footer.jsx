export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16" data-name="Footer" data-file="src/components/Footer.jsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Contact</p>
          <a
            href="mailto:linclean2026@gmail.com"
            className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
          >
            linclean2026@gmail.com
          </a>
        </div>
        <p className="text-sm text-gray-400">
          © 2026 LinClean. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
