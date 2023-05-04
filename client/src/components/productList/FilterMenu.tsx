import { ChangeEvent, useState, useEffect } from 'react';



type FiltersProps = {
    onFilterChange: (filterValue: string) => void;
};


function FilterMenu({ onFilterChange }: FiltersProps) {

    const [categories, setCategories] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    // filter categories will be taken from the server
    const getCategories = async () => {
        const categories = await fetch('http://localhost:5001/products/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const categoriesJson = await categories.json();
        setCategories(categoriesJson);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;

        setSelectedFilter(filterValue);
        // Call the parent's onFilterChange function
        onFilterChange(filterValue);
    };

    const clearFilter = () => {
        setSelectedFilter("");
        onFilterChange("");
    }

    return (
        <form className="hidden lg:block">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h3>
            {/* create a divider */}
            <div className="border-b border-gray-200 py-1" />
            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 py-4">
                {categories.map((category: any) => (
                    <li key={category.name}>
                        {/* filter options, you can select one */}
                        <span className="cursor-pointer flex items-center">
                            <input
                                id={`filter-${category.slug}`}
                                name="category"
                                defaultValue={category.slug}
                                type="radio"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                onChange={handleFilterChange}
                                checked={selectedFilter === category.slug}
                            />
                            <label htmlFor={`filter-${category.slug}`} className="ml-3"
                                onDoubleClick={clearFilter}>{category.slug}</label>
                        </span>
                    </li>
                ))}
            </ul>
        </form>
    );
}

export { FilterMenu }

// old
{/*
            
            categoriesJson.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                        <>
                            <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">{open ? <MinusIcon className="h-5 w-5" aria-hidden="true" /> : <PlusIcon className="h-5 w-5" aria-hidden="true" />}</span>
                                </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    {section.options.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center">


                                            <input
                                                id={`filter-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                defaultChecked={option.checked}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={(event) => handleFilterChange(event, section.id)}
                                            />


                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}                                    
        </form>
    );
}
*/}
