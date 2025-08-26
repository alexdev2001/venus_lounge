import { Button } from "./Button";
import book from "../../src/assets/book.jpg"
import {useNavigate} from "react-router-dom";

export default function BookHeroSection() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex w-full flex-col items-center justify-center bg-default-background py-24">
                <div className="flex w-full flex-wrap items-center justify-center gap-4">
                    <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch">
                        <img
                            className="w-full grow shrink-0 basis-0 object-cover rounded-xl"
                            src={book}
                            alt="Booking"
                        />
                    </div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-12 px-4 py-4">
                        <div className="flex w-full max-w-[448px] flex-col items-center gap-6 px-4 py-4">
                            <div className="flex w-full flex-col items-center gap-4 text-center">
                              <span className="w-full my-text text-[48px] font-[700] leading-[48px] -tracking-[0.035em]">
                                <span className="text-[#C36B0F]">Book</span>{" "}
                                    <span className="text-[#3D4A43]">for</span>{" "}
                                    <span className="text-[#C36B0F]">a</span>{" "}
                                    <span className="text-[#3D4A43]">spot</span>
                                </span>
                                <span className="w-full whitespace-pre-wrap my-text text-[24px] font-[500] leading-[32px] text-subtext-color -tracking-[0.025em]">
                                    Book your spot at Venus Lounge now! First-come, first-serve — reserve early to enjoy a time of luxury and relaxation.
                                </span>
                            </div>
                            <div className="flex w-full justify-center mt-4">
                                <Button
                                    onClick={() => navigate("/book")}
                                >
                                    Book now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

