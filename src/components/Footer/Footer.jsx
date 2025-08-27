import instagram from "../../assets/instagram.png"
import tiktok from "../../assets/tiktok.png"
import whatsapp from "../../assets/whatsapp.png"


function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-15 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-right text-white">
                    © 2025. Todos los derechos reservados.
                </p>
                <div className="flex gap-9">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-gray-300 transition text-xl"
                    >
                        <img src={instagram} alt="Instagram" className="w-[20px] h-auto" />
                    </a>
                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="hover:text-gray-300 transition text-xl"
                    >
                       <img src={tiktok} alt="TikTok" className="w-[20px] h-auto" />
                    </a>

                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="hover:text-gray-300 transition text-xl"
                    >
                        <img src={whatsapp} alt="Instagram" className="w-[20px] h-auto" />
                    </a>

                </div>
            </div>
        </footer>
    );
}
export default Footer;



