import  { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import logo from "./../../src/assets/logo1-nbg.png";
import { FaBars, FaTimes } from "react-icons/fa";

interface ModernNavbarProps {
    className?: string;
}

export const ModernNavbar: React.FC<ModernNavbarProps> = ({ className = "" }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const sectionsLeft = ["home", "about"];
    const sectionsRight = ["book", "contact"];

    return (
        <nav
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md text-black rounded-xl shadow-lg px-4 py-3 flex justify-between items-center w-11/12 max-w-5xl ${className}`}
        >
            {/* Left links (desktop) */}
            <div className="hidden md:flex space-x-6 my-text">
                {sectionsLeft.map((section) => (
                    <Link
                        key={section}
                        to={section}
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-black hover:text-yellow-400 transition-colors"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ))}
            </div>

            {/* Center logo */}
            <div className="flex justify-center items-center">
                <img
                    src={logo}
                    alt="logo"
                    className="h-16 md:h-20 w-auto cursor-pointer"
                    onClick={() => scroll.scrollToTop()}
                />
            </div>

            {/* Right links (desktop) */}
            <div className="hidden md:flex space-x-6 my-text">
                {sectionsRight.map((section) => (
                    <Link
                        key={section}
                        to={section}
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-black hover:text-yellow-400 transition-colors"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ))}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-black text-2xl focus:outline-none">
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-11/12 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden">
                    {[...sectionsLeft, ...sectionsRight].map((section) => (
                        <Link
                            key={section}
                            to={section}
                            smooth={true}
                            duration={500}
                            onClick={() => setMobileMenuOpen(false)}
                            className="cursor-pointer text-black hover:text-yellow-400 transition-colors text-lg"
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};