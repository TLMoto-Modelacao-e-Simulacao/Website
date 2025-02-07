import fs from 'fs';
import path from 'path';

const TEAM_DIR = path.join(process.cwd(), 'public/images/team');

export function getAvailableYears() {
    if (!fs.existsSync(TEAM_DIR)) return [];
    
    return fs.readdirSync(TEAM_DIR, { encoding: 'utf8' }) // Ensure UTF-8 encoding
        .filter(year =>
            fs.statSync(path.join(TEAM_DIR, year)).isDirectory() && /^\d{4}$/.test(year)
        )
        .sort((a, b) => b - a);
}

export function getTeamImages(year) {
    const yearPath = path.join(TEAM_DIR, year);

    if (!fs.existsSync(yearPath)) return [];

    const categories = fs.readdirSync(yearPath, { encoding: 'utf8' }) // Ensure UTF-8 encoding
        .filter(category =>
            fs.statSync(path.join(yearPath, category)).isDirectory()
        );

    return categories.map(category => {
        const categoryPath = path.join(yearPath, category);
        const images = fs.readdirSync(categoryPath, { encoding: 'utf8' }) // Ensure UTF-8 encoding
            .filter(file =>
                /\.(jpg|jpeg|png|gif)$/i.test(file)
            );

        return {
            name: category.normalize('NFC'), 
            images: images.map(img =>
                `/images/team/${year}/${encodeURIComponent(category.normalize('NFC'))}/${encodeURIComponent(img.normalize('NFC'))}`
            )
        };
            
    });
}
