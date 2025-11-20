import fs from "fs";
import path from "path";
import { withBasePath } from "@/src/utils/basePath";

const TEAM_DIR = path.join(process.cwd(), "public/images/team");
const TEAM_DATA_DIR = path.join(process.cwd(), "src/components/textContent/team");

export function getAvailableYears() {
  return fs
    .readdirSync(TEAM_DIR, { encoding: "utf8" }) // Ensure UTF-8 encoding
    .filter(
      year =>
        fs.statSync(path.join(TEAM_DIR, year)).isDirectory() &&
        /^\d{4}$/.test(year) &&
        year !== "2023"
    )
    .sort((a, b) => parseInt(b) - parseInt(a));
}

export function getTeamMembersWithLinkedIn(year: string) {
  const yearPath = path.join(TEAM_DIR, year);
  const teamDataPath = path.join(TEAM_DATA_DIR, `${year}.json`);

  if (!fs.existsSync(yearPath)) return { data: [], team: "" };

  const pathpics = fs
    .readdirSync(yearPath, { encoding: "utf8" })
    .filter(file => /\.(webp|png)$/i.test(file));

  let teampic = "";
  if (pathpics.length > 0)
    teampic = withBasePath(
      `/images/team/${year}/${encodeURIComponent(pathpics[0].normalize("NFC"))}`
    );

  let teamData: Record<
    string,
    Array<{ name: string; image: string; cardImage: string; linkedin?: string | null }>
  > = {};
  if (fs.existsSync(teamDataPath)) {
    try {
      const rawData = fs.readFileSync(teamDataPath, "utf8");
      teamData = JSON.parse(rawData);
    } catch (error) {
      console.error(`Error reading team data for ${year}:`, error);
    }
  }

  const data = Object.keys(teamData)
    .map(category => {
      const categoryName = category.normalize("NFC").replace(/^\d+ -\s*/, "");
      const membersData = teamData[category] || [];

      const members = membersData
        .filter((member: { image: string }) => member.image && member.image !== "")
        .map(member => ({
          name: member.name,
          image: withBasePath(
            `/images/team/${year}/${encodeURIComponent(category.normalize("NFC"))}/${encodeURIComponent(member.image)}`
          ),
          cardImage: withBasePath(
            `/images/team/${year}/${encodeURIComponent(category.normalize("NFC"))}/${encodeURIComponent(member.cardImage)}`
          ),
          linkedin: member.linkedin || null,
        }));

      return {
        name: categoryName,
        members: members,
        images: members.map((member: { image: string }) => member.image),
      };
    })
    .filter(category => category.members.length > 0);

  return {
    data: data,
    team: teampic,
  };
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
export function getImages(folderPath: string): string[] {
  const absPath = path.join(PUBLIC_DIR, folderPath);

  if (!fs.existsSync(absPath)) return [];

  return fs
    .readdirSync(absPath, { encoding: "utf8" })
    .filter(file => /\.webp$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map(file => withBasePath(path.posix.join("/", folderPath, file))); // URL-friendly path
}
