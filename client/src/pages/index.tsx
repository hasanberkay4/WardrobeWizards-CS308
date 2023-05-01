import CategoryPreview from "../components/home/CategoryPreview";
import LandingView from "../components/home/LandingView";
import { CategoryPreviewList } from "../types/categoryPreviewType";
import { GetStaticProps } from "next";

export default function Home({ categoryPreviewList }: CategoryPreviewList) {
    return (
        <div>
            <LandingView />
            <CategoryPreview categoryPreviewList={categoryPreviewList} />
        </div>
    )
}

export const getStaticProps: GetStaticProps<CategoryPreviewList> = async (context) => {

    const categoryPreviewList = [
        {
            name: 'Trending fire',
            description: 'Trending 🔥',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
            href: '/tshirt',
        },
        {
            name: 'Most Sold ✅',
            description: 'Most Sold ✅',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
            href: '/pants',
        },
        {
            name: 'On Discount',
            description: 'On Discount 🤑',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '/bags',
        },
    ]

    return {
        props: {
            categoryPreviewList,
        },
    };
};