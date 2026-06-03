export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100" data-name="Header" data-file="src/components/Header.jsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-start items-center h-16">
          <img
            src="https://raw.githubusercontent.com/403-Forb2dden/LinClean-FE/dev/assets/images/login_wordmark.png"
            alt="LinClean Logo"
            className="h-8 object-contain filter drop-shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
