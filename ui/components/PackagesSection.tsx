import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function PackagesSection({ packages }) {
    return (
        <section className="max-w-6xl mx-auto mb-16 my-text">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Our Packages
                </h2>
                <p className="mt-2 text-gray-600">
                    Choose the perfect package tailored for your needs.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <Card
                        key={index}
                        className="flex flex-col items-center justify-center text-center shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gray-100"
                    >
                        <CardHeader>
                            <div className="flex items-center justify-center w-20 h-20 rounded-full ">
                                <img
                                    src={pkg.icon}
                                    alt={pkg.title}
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-xl font-semibold text-left text-gray-800">
                                {pkg.title}
                            </CardTitle>
                            <p className="mt-2 text-gray-600 text-sm text-left">{pkg.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}