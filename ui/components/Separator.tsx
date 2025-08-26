export default function Separator() {
    return (
        <div className="flex justify-center items-center relative h-14 my-6 sm:my-8 lg:my-10">
            <svg
                width="180"
                height="24"
                viewBox="0 0 180 24"
                fill="none"
                className="absolute"
            >
                <path d="M20,12 L28,6 L36,12 L28,18 Z" fill="#3D4A43" />
                <path d="M56,12 L64,6 L72,12 L64,18 Z" fill="#C36B0F" />
                <path d="M92,12 L100,6 L108,12 L100,18 Z" fill="#3D4A43" />
                <path d="M128,12 L136,6 L144,12 L136,18 Z" fill="#C36B0F" />

                <path
                    d="M0,12 L20,12 M36,12 L56,12 M72,12 L92,12 M108,12 L128,12 M144,12 L164,12 M180,12 L180,12"
                    stroke="#16a34a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="3 2"
                />
            </svg>
        </div>
    );
}