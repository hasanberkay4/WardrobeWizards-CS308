import { Request, Response } from "express"
import path from "path";
import fs from 'fs';

// Function to recursively read directory contents
const getImagesRecursively = (dir: string): string[] => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let filePaths: string[] = [];

    files.forEach((file) => {
        if (file.isDirectory()) {
            filePaths = [...filePaths, ...getImagesRecursively(path.join(dir, file.name))];
        } else {
            filePaths.push(path.join(dir, file.name));
        }
    });

    return filePaths;
};

const getImages = async (req: Request, res: Response) => {
    try {
        const imagesDir = 'images';
        const images = getImagesRecursively(imagesDir);

        // Replace the local file path with the appropriate URL path
        const imageURLs = images.map((imagePath) => imagePath.replace(imagesDir, '/images'));
        res.json({ images: imageURLs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" });
    }
};

// Serve all items in a specific subfolder
const getImagesByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const imagesDir = path.join('images', category);

    if (!fs.existsSync(imagesDir)) {
        res.status(404).json({ error: 'Subfolder not found' });
        return;
    }

    const images = getImagesRecursively(imagesDir);
    const imageURLs = images.map((imagePath) => imagePath.replace(imagesDir, `/images/${category}`));

    res.json({ images: imageURLs });
};

// Serve a specific item within a specific subfolder
const getImagesById = (req: Request, res: Response) => {
    const { category, id } = req.params;
    const itemPath = path.join('images', category, id);

    if (!fs.existsSync(itemPath)) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }

    const imageURL = itemPath.replace('images', '/images');
    res.json({ image: imageURL });
};


export default { getImages, getImagesByCategory, getImagesById }