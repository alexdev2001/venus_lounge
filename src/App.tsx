import './App.css'
import coverImage from './assets/cover_image.jpg';
import { ModernNavbar } from "../ui/components/ModernNavbar.tsx";
import Separator from "../ui/components/Separator.tsx";
import WordSlideshow from "../ui/components/WordSlideshow.tsx";
import img1 from "../src/assets/venus-card-pictures/img1.jpg";
import img2 from "../src/assets/venus-card-pictures/img2.jpg";
import img3 from "../src/assets/venus-card-pictures/img3.jpg";
import img6 from "../src/assets/venus-card-pictures/img6.jpg";
import leftAfrican from '../src/assets/Pattern-cropped.svg'
import rightAfrican from '../src/assets/Pattern-cropped.svg'
import CardFan from "../ui/components/CardFan.tsx";
import CompanyCards from "../ui/components/CompanyCards.tsx";
import BookHeroSection from "../ui/components/BookHeroSection.tsx";
import {ContactUs} from "../ui/components/ContactUs.tsx";
import Footer from "../ui/components/Footer.tsx";
import PackagesSection from "../ui/components/PackagesSection.tsx";
import silverIcon from '../src/assets/icons/silver.png';
import goldIcon from '../src/assets/icons/gold.png';
import platinumIcon from '../src/assets/icons/platinum.png';

function App() {
    const words = ["Relax", "Enjoy", "Unwind", "Connect"];
    const images = [img3, img2, img1, img6];

    const packages = [
        { title: "Silver", description: "Great for individuals starting out. Allows 1-3 people, with a maximum 2 hours of usage", icon: silverIcon },
        { title: "Gold", description: "Perfect balance. Allows 1-8 people, with a maximum of 4 hours of usage", icon: goldIcon },
        { title: "Platinum", description: "Best value with premium features. Allows 1-10+ people, with a maximum of 8 hours of usage.", icon: platinumIcon },
    ]

    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background overflow-x-hidden">
            <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-4 sm:px-6 sm:py-6">
                <ModernNavbar />
            </div>

            <section id="home" className="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-16 lg:py-24">
                <div className="flex w-full flex-col items-start sm:items-center justify-center gap-8 sm:gap-16 lg:gap-24">
                    <div className="relative w-full max-w-[1200px] mx-auto flex items-center pl-0 sm:pl-4">
                        <div className="relative  max-w-[100vw] mx-0 sm:mx-auto w-[320px] sm:w-full">
                            <div
                                className="absolute top-0 bottom-0 -left-6 sm:-left-8 lg:-left-12 w-6 sm:w-8 lg:w-12 bg-no-repeat bg-cover z-10"
                                style={{ backgroundImage: `url(${leftAfrican})` }}
                            ></div>

                            <div className="relative w-full h-[180px] sm:h-[280px] lg:h-[380px] overflow-hidden rounded-lg">
                                <img
                                    className="w-full h-full object-cover
                                    object-left sm:object-center"
                                    src={coverImage}
                                    alt="Venus Lounge - Luxury Destination"
                                />
                            </div>

                            <div
                                className="absolute top-0 bottom-0 -right-6 sm:-right-8 lg:-right-12 w-6 sm:w-8 lg:w-12 bg-no-repeat bg-cover z-10"
                                style={{ backgroundImage: `url(${rightAfrican})` }}
                            ></div>

                            <WordSlideshow words={words} />
                        </div>
                    </div>

                    <div className="flex w-[320px] sm:w-full max-w-[768px] flex-col items-center justify-center gap-4 sm:gap-6 text-center px-4 sm:px-6">
                        <Separator />

                        <h2 className="font-['Inter'] text-2xl sm:text-2xl  lg:text-3xl font-semibold leading-snug sm:leading-snug lg:leading-[44px] my-text -tracking-[0.03em]">
                            Your ultimate luxury destination
                        </h2>

                        <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed sm:leading-[26px] lg:leading-[28px] my-text px-0 sm:px-4">
                            Indulge in the ultimate sanctuary of sophistication and comfort at our exclusive lounge,
                            where every detail is crafted for indulgence. Whether you're booking for a full day or
                            just a few hours, immerse yourself in a world of refined elegance designed for relaxation,
                            entertainment, and unforgettable moments.
                        </p>
                        <br/>

                        <div className="w-full mt-4 sm:mt-6">
                            <CardFan images={images} />
                        </div>
                    </div>
                </div>
            </section>

            <br/>
            <Separator />

            <section
                id="about"
                className="w-[320px] sm:w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-16 lg:py-20"
            >
                <div className="flex w-full flex-col items-start sm:items-center justify-center gap-8 sm:gap-12">
                    <div className="w-full max-w-[640px] text-left sm:text-center px-0 sm:px-0">
                        <p className="my-text text-sm sm:text-base lg:text-[17px] font-[400] leading-relaxed sm:leading-[26px] lg:leading-[28px] text-default-font -tracking-[0.01em]">
                            Located in the heart of New Kanjedza, Blantyre, Venus Lounge is your
                            haven for relaxation, style, and unforgettable moments. We offer a
                            welcoming space where elegance meets comfort — perfect for unwinding,
                            connecting with friends, or enjoying a quiet escape.
                        </p>
                    </div>

                    <div className="w-full max-w-[1000px] px-0 sm:px-0">
                        <CompanyCards />
                    </div>
                </div>
            </section>
            
            <Separator/>
            <section id="book" className="w-full">
                <BookHeroSection/>
            </section>
            <Separator/>
            <section id="packages" className="w-full">
                <PackagesSection packages={packages} />
            </section>
            <Separator/>
            <section id="contact" className="w-full">
                <ContactUs/>
            </section>
            <Footer/>
        </div>
    );
}

export default App;