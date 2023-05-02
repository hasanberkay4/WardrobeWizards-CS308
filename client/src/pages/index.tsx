import CategoryPreview from "../components/home/CategoryPreview";
import LandingView from "../components/home/LandingView";
import { CategoryPreviewList } from "../types/categoryPreviewType";

export default function Home({ categoryPreviewList }: CategoryPreviewList) {
    return (
        <div>
            <LandingView />
            <CategoryPreview />
        </div>
    )
}
