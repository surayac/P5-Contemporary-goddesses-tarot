import logo from '../../src/assets/logo.webp'

function Header() {
  return (
    <>
      <header className="top-0 left-0 w-full z-50 shadow-md">
        <nav className="flex justify-between items-center p-5 mx-4 relative">
            <a href="/" aria-label="Home"> 
                <img src={logo} alt="Logo" className="w-[100px] h-auto" />
            </a>
        </nav>
      </header>
     
    </>
  );
}

export default Header;