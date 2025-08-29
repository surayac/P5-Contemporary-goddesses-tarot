import instagram from "../../src/assets/instagram.png"
import tiktok from "../../src/assets/tiktok.png"
import whatsapp from "../../src/assets/whatsapp.png"


function Footer() {
    return (
        <footer className="bottom-0 left-0 mt-8 mb-5 w-full h-full shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <p className="text-center text-xl md:text-right text-white">
                    © 2025. Todos los derechos reservados.
                </p>
                <div className="flex gap-9">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <img src={instagram} alt="Instagram" className="w-8 h-auto transition-transform duration-200 hover:scale-125" />
                    </a>
                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                    >
                       <img src={tiktok} alt="TikTok" className="w-8 h-auto transition-transform duration-200 hover:scale-125" />
                    </a>

                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                    >
                        <img src={whatsapp} alt="Instagram" className="w-8 h-auto transition-transform duration-200 hover:scale-125" />
                    </a>

                </div>
            </div>
        </footer>
    );
}
export default Footer;



