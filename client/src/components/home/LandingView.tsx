import Image from "next/image"
import Link from "next/link"

/* eslint-disable @next/next/no-img-element */
const heading = "Wardrobe Wizard 🪄"
const subHeading = "Your personal stylist 🧚🏼‍♂️"
const buttonText = "Chekout our products"

export default function LandingView() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            {heading}
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            {subHeading}
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <Image
                                                    src="/landing-page/lp1.jpg"
                                                    alt="/landing-page/lp1.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp2.jpg"
                                                    alt="/landing-page/lp2.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp3.jpg"
                                                    alt="/landing-page/lp3.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp4.jpg"
                                                    alt="/landing-page/lp4.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp5.jpg"
                                                    alt="/landing-page/lp5.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp6.jpg"
                                                    alt="/landing-page/lp6.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/landing-page/lp7.jpg"
                                                    alt="/landing-page/lp7.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/products"
                                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                            >
                                {buttonText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
