import { useState, useEffect, useRef } from "react";

function CardFan({ images }: { images: string[] }) {
    const [inView, setInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const radius = 120;

    return (
        <div ref={containerRef} className="relative flex justify-center mt-6 sm:mt-8 perspective-[1000px]">
            <div className="relative w-[260px] h-[160px] sm:w-[400px] sm:h-[250px]">
                {images.map((img, i) => {
                    const centerIndex = (images.length - 1) / 2;
                    const angleStep = 20;
                    const angle = inView ? (i - centerIndex) * angleStep : 0;
                    const translateY = inView
                        ? -Math.sin(((i - centerIndex) * angleStep * Math.PI) / 180) * radius
                        : 0;
                    const translateX = inView ? (i - centerIndex) * 35 : 0; // smaller offset on mobile

                    return (
                        <div
                            key={i}
                            className="absolute top-0 left-1/2 w-[110px] h-[160px] sm:w-[180px] sm:h-[250px] rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(calc(-50% + ${translateX}px)) rotate(${angle}deg) translateY(${translateY}px)`,
                                zIndex: images.length - i,
                                transitionDelay: `${i * 100}ms`,
                            }}
                        >
                            <img src={img} alt={`Card ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CardFan;