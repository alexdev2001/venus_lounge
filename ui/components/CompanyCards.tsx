import mission from "../../src/assets/mission.jpg";
import vision from "../../src/assets/vision.jpg";
import values from "../../src/assets/values.jpg";
import purpose from "../../src/assets/purpose.jpg";
import { FeatherCompass, FeatherEye, FeatherHeart, FeatherTarget } from "@subframe/core";

function CompanyCards() {
    const cards = [
        {
            img: mission,
            icon: FeatherTarget,
            title: "Mission",
            text: "Creating a warm and elegant escape in New Kanjedza, Blantyre — where every visit feels like coming home, only more luxurious."
        },
        {
            img: vision,
            icon: FeatherEye,
            title: "Vision",
            text: "To be Blantyre’s most cherished destination for luxury, connection, and unforgettable moments — setting the standard for elegance in every experience."
        },
        {
            img: values,
            icon: FeatherHeart,
            title: "Values",
            text: "We are guided by elegance, warmth, and integrity — creating a space where every guest feels valued, every moment is memorable, and every interaction reflects our commitment to excellence."
        },
        {
            img: purpose,
            icon: FeatherCompass,
            title: "Purpose",
            text: "To create a luxurious, welcoming space in New Kanjedza, Blantyre, where every guest can relax, connect, and enjoy unforgettable moments in style."
        }
    ];

    // Duplicate cards to ensure seamless scrolling
    const repeatedCards = [...cards, ...cards, ...cards];

    return (
        <div className="overflow-hidden w-full py-8 sm:py-12">
            <div className="flex gap-3 sm:gap-4 animate-scroll-cards min-w-max">
                {repeatedCards.map(({ img, icon: Icon, title, text }, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center w-[160px] h-[220px] sm:w-[240px] sm:h-auto flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-solid border-neutral-border bg-neutral-50"
                    >
                        <img className="h-28 sm:h-40 w-full object-cover" src={img} alt={title} />
                        <div className="flex flex-col items-start gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center">
                                <Icon className="text-[16px] sm:text-[20px] text-default-font" />
                            </div>
                            <span className="w-full my-text text-[12px] sm:text-[14px] font-[500] leading-[18px] sm:leading-[20px] text-subtext-color -tracking-[0.01em]">
            {text}
          </span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
    @keyframes scroll-cards {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Slower on mobile */
    .animate-scroll-cards {
      animation: scroll-cards 18s linear infinite;
    }

    @media (min-width: 640px) {
      .animate-scroll-cards {
        animation: scroll-cards 28s linear infinite; /* slower on larger screens */
      }
    }
  `}</style>
        </div>
    );
}

export default CompanyCards;