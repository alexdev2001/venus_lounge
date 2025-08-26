export function ContactUs() {
    return (
        <section className="px-6 py-12 lg:py-20 my-text">
            <div className="max-w-7xl mx-auto text-center">
                {/* Heading */}
                <h5 className="mb-4 text-base lg:text-2xl text-orange-600 font-semibold">
                    Customer Care
                </h5>
                <h1 className="mb-6 text-3xl lg:text-5xl font-bold text-gray-900">
                    We're Here to Help
                </h1>
                <p className="mb-6 lg:mb-12 mx-auto max-w-3xl text-lg text-gray-600 font-normal">
                    Whether it&apos;s a question about our services, a request for technical
                    assistance, or suggestions for improvement, our team is eager to hear from
                    you.
                </p>

                {/* Phone Number Section */}
                <div className="mb-12 flex flex-col items-center">
    <span className="text-lg lg:text-xl font-semibold text-gray-800">
        Call us directly:
    </span>
                    <a
                        href="tel:+265123456789"
                        className="mt-2 text-orange-600 font-bold text-base lg:text-lg hover:underline"
                    >
                        +265 99 925 7356
                    </a>
                    <span className="mt-1 text-gray-500 text-xs lg:text-sm">
        Available Monday to Saturday, 9AM - 6PM
    </span>
                </div>

                {/* Grid with Map & Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Map */}
                    <div className="w-full h-80 lg:h-[510px] rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31949.379283065284!2d35.0427643!3d-15.8217051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18d84f0059bbbded%3A0xefde98f19fff7dc3!2zVmVudXMgTG91bmdl!5e0!3m2!1sen!2smw!4v1693923456789!5m2!1sen!2smw"
                            width="100%"
                            height="100%"
                            className="border-0"
                            allowFullScreen
                            loading="lazy"
                            title="Venus Lounge Location"
                        />
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 font-medium text-gray-900 block">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="mb-1 font-medium text-gray-900 block">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 font-medium text-gray-900 block">Your Email</label>
                            <input
                                type="email"
                                placeholder="name@email.com"
                                name="email"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 font-medium text-gray-900 block">Your Message</label>
                            <textarea
                                rows={5}
                                placeholder="Message"
                                name="message"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-black bg-orange-600 rounded hover:bg-orange-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

