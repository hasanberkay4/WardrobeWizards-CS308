
const handleSearchSubmit = async (searchTerm: string) => {
    try {
        const response = await fetch(`http://localhost:5001/search/${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error submitting search");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
};

export { handleSearchSubmit } 