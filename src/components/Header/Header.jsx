import logo from '../../assets/logo.webp'

function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-b from-[#5D688A] to-[#f1c3b8]">
        <nav className="flex justify-between items-center p-5 mx-4 relative">
            <a href="#inicio"> 
                <img src={logo} alt="Logo" className="w-[100px] h-auto" />
            </a>
        </nav>
      </header>
      <div className="h-16"></div>
    </>
  );
}

export default Header;