import {FaTwitter, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok} from "react-icons/fa";
import logo from "../../src/assets/logo-3.png"
import {useNavigate} from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-white text-black border-t my-text border-black py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300 pb-8">
                    {/* Brand */}
                    <div>
                        <img
                            src={logo}
                            alt="Venus Lounge Logo"
                            className="h-20 w-auto"
                        />
                        <p className="mt-3 text-gray-600 text-sm">
                            Luxury, connection, and unforgettable moments in the heart of Blantyre.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm flex flex-col gap-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection("home")}
                                    className="w-full text-left hover:text-orange-500 transition cursor-pointer bg-transparent p-0"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("about")}
                                    className="w-full text-left hover:text-orange-500 transition cursor-pointer bg-transparent p-0"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("book")}
                                    className="w-full text-left hover:text-orange-500 transition cursor-pointer bg-transparent p-0"
                                >
                                    Book
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full text-left hover:text-orange-500 transition cursor-pointer bg-transparent p-0"
                                >
                                    Login
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className="w-full text-left hover:text-orange-500 transition cursor-pointer bg-transparent p-0"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <ul className="space-y-2 text-sm">
                            <li> <a href="tel:+265123456789" className="hover:text-orange-500 transition">+265 99 925 7356</a></li>
                            <li><a href="mailto:info@venuslounge.com" className="hover:text-orange-500 transition">info@venuslounge.com</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <div className="flex space-x-4 text-2xl">
                            <a href="https://www.facebook.com/venusloungemw/" className="hover:text-orange-500 transition">
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/venusloungemw" className="hover:text-orange-500 transition">
                                <FaInstagram />
                            </a>
                            <a href="https://www.tiktok.com/@venusloungemw?_t=ZM-8zC0cP5era9&_r=1" className="hover:text-orange-500 transition">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Venus Lounge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}