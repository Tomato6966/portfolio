'use server';
import fs from "node:fs";
import path from "node:path";

export async function getAllHeroImages(){
    return fs.readdirSync(path.join(process.cwd(), "public", "carousel"))
        .filter(v => [".png", ".jpg", ".jpeg", ".webp", ".gif"]
            .some(t => v.toLowerCase().endsWith(t.toLowerCase()))
        ).map(x => `/carousel/${x}`);
}
