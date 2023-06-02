import { AddCategoryForm } from "../../../../../components/admin/product-manager/AddCategoryForm";

type Props = {
    category_options: {
        _id: string,
        name: string,
        slug: string,
    }[],
}

const AddCategoryPage = ({ category_options }: Props) => {

    return (
        <div>
            <AddCategoryForm
                category_options={category_options}
            />
        </div>
    )
}

export const getServerSideProps = async () => {
    try {

        const categories = await fetch(`http://localhost:5001/products/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const categories_json = await categories.json() as {
            _id: string,
            name: string,
            slug: string,
        }[];

        return {
            props: {
                category_options: categories_json,
            }
        }
    }

    catch (e) {
        return {
            props: {
                category_options: [],
            }
        }

    }
}

export default AddCategoryPage;