import logo from '../../src/assets/logo.webp'

function Header() {
  return (
    <>
      <header className="top-0 left-0 w-full z-50 shadow-md">
        <nav className="flex justify-between items-center px-2 md:px-5 py-3 mx-2 md:mx-4relative">
            <a href="/" aria-label="Home"> 
                <img src={logo} alt="Logo" 
                className="ml-1 md:ml-auto w-12 md:w-24 h-auto transition-all duration-300" />
            </a>
        </nav>
      </header>
     
    </>
  );
}

export default Header;