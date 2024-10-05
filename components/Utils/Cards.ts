import fs from "node:fs";
import path from "node:path";

export async function getProjects() {
    const projectsDir = path.join(process.cwd(), 'public', 'cards');
    const projects = fs.readdirSync(projectsDir).map((folder) => {
      const overview = fs.readFileSync(path.join(projectsDir, folder, 'Information.md'), 'utf-8');
      const [title, ...description] = overview.split('\n');
      return {
        title: title.replace('# ', ''),
        description: description.join("\n"),
        thumbnail: `/portfolio/cards/${folder}/Overview.png`,
        markdown: overview,
      };
    });
    return projects;
  }
