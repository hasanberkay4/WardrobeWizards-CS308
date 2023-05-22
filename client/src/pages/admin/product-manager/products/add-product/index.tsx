import { AddProductForm } from "../../../../../components/admin/product-manager/AddProductForm";
import { CategoryArrayType, CategoryArrayTypeSchema } from "../../../../../types/adminTypes/categoryType";
import { ColorArrayType, ColorArrayTypeSchema } from "../../../../../types/adminTypes/colorType";
import { ModelArrayType, ModelArrayTypeSchema } from "../../../../../types/adminTypes/modelType";

type Props = {
    all_category_slugs: CategoryArrayType;
    all_colors: ColorArrayType;
    all_models: ModelArrayType;
}

const AddProductPage = ({ all_category_slugs, all_colors, all_models }: Props) => {

    // convert slug arrays to select option arrays
    const category_options = all_category_slugs.map((category_slug) => {
        return {
            value: category_slug.name,
            label: category_slug.slug
        }
    });

    const color_options = all_colors.map((color) => {
        return {
            value: color.name,
            label: color.slug
        }
    });

    const model_options = all_models.map((model) => {
        return {
            value: model.name,
            label: model.slug
        }
    });

    return (
        <div>
            <AddProductForm
                category_options={category_options}
                color_options={color_options}
                model_options={model_options}
            />
        </div>
    )
}

export const getServerSideProps = async () => {
    let all_category_slugs = [] as CategoryArrayType;
    let all_colors = [] as ColorArrayType;
    let all_models = [] as ModelArrayType;

    try {
        // get all category slugs
        const category_slugs_response = await fetch('http://localhost:5001/products/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // get all colors
        const colors_response = await fetch('http://localhost:5001/products/colors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // get all models
        const models_response = await fetch('http://localhost:5001/products/models', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // check response validity and set all_category_slugs
        if (category_slugs_response.ok) {
            const category_slugs_response_json = await category_slugs_response.json();
            all_category_slugs = CategoryArrayTypeSchema.parse(category_slugs_response_json.category_slugs);
        }

        // check response validity and set all_colors
        if (colors_response.ok) {
            const colors_response_json = await colors_response.json();
            all_colors = ColorArrayTypeSchema.parse(colors_response_json.colors);
        }

        // check response validity and set all_models
        if (models_response.ok) {
            const models_response_json = await models_response.json();
            all_models = ModelArrayTypeSchema.parse(models_response_json.models);
        }

        return {
            props: {
                all_category_slugs: all_category_slugs,
                all_colors: all_colors,
                all_models: all_models
            }
        }
    }
    catch (e) {
        return {
            props: {
                all_category_slugs: all_category_slugs,
                all_colors: all_colors,
                all_models: all_models
            }
        }

    }
}

export default AddProductPage;