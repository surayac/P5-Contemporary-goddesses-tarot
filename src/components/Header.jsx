import logo from '../../src/assets/images/logo.webp'

function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 shadow-md">
        <nav className="flex justify-between items-center px-2 md:px-5 py-3 mx-2 md:mx-4 relative">
            <a href="/" aria-label="Home"> 
                <img src={logo} alt="Logo" 
                className="ml-1 md:ml-auto w-12 md:w-24 h-auto transition-all duration-300" />
            </a>
        <div className="flex flex-wrap gap-8 md:gap-16 text-[var(--color-starDust)] text-sm md:text-lg font-metamorphous">
            <a href="/" 
              className="md:hover:drop-shadow-[0_0_8px_#FFDBB7] active:drop-shadow-[0_0_8px_#FFDBB7] active:scale-110 hover:scale-110 transition-all duration-300" >
            INICIO
            </a>
            <a href="/Favorites" 
              className="md:hover:drop-shadow-[0_0_8px_#FFDBB7] active:drop-shadow-[0_0_8px_#FFDBB7] active:scale-110 hover:scale-110 transition-all duration-300" >
            HISTORIAL
            </a>
        </div>
      </nav>
    </header>
     
    </>
  );
}

export default Header;