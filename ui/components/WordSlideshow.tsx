import { useEffect, useState } from "react";

const WordSlideshow = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsAnimating(false);
            }, 450);
        }, 2000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <div className="absolute inset-0 flex items-center my-text">
            <div className="relative h-10 sm:h-14 lg:h-24 w-full">
                {/* Outgoing word */}
                <span
                    key={`out-${index}`}
                    className={`absolute left-0 sm:left-2 lg:left-6 top-0 text-[#C36B0F]/70 dark:text-[#C36B0F]/50 
            text-2xl sm:text-8xl lg:text-7xl font-bold
            ${isAnimating ? "animate-slide-out-up" : "opacity-0"}`}
                >
          {words[(index - 1 + words.length) % words.length]}
        </span>

                {/* Incoming word */}
                <span
                    key={`in-${index}`}
                    className={`absolute left-0 sm:left-2 lg:left-6 top-0 text-[#3D4A43]/80 dark:text-[#3D4A43]/60 
            text-2xl sm:text-8xl lg:text-7xl font-bold
            ${!isAnimating ? "animate-slide-in-up" : "opacity-0"}`}
                >
          {words[index]}
        </span>
            </div>
        </div>
    );
};

export default WordSlideshow;