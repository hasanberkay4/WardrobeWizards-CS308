/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link"


const categoryPreviewList = [
    {
        name: 'Bags ',
        imageSrc: '/landing-page/cat1.jpg',
        imageAlt: '/landing-page/cat1.jpg',
        href: '/products/bag',
    },
    {
        name: 'Zip Hoodies',
        imageSrc: '/landing-page/cat2.jpg',
        imageAlt: '/landing-page/cat2.jpg',
        href: '/products/zip-hoodie',
    },
    {
        name: 'Tshirts',
        imageSrc: '/landing-page/cat3.jpg',
        imageAlt: '/landing-page/cat3.jpg',
        href: '/products/tshirt',
    },
]

export default function CategoryPreview() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-3xl font-bold text-gray-900 underline ">Collections</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {categoryPreviewList.map((categoryPreview) => (
                            <div key={categoryPreview.name} className="group relative">
                                {/* Card Image */}
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <Image
                                        src={categoryPreview.imageSrc}
                                        alt={categoryPreview.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                {/* Card Description */}
                                <h3 className="mt-3 text-2xl text-center text-gray-900">
                                    <Link href={categoryPreview.href}>
                                        <span className="absolute inset-0" />
                                        {categoryPreview.name}
                                    </Link>
                                </h3>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}
