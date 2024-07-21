import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export function getWeekEntries() {
  const folderPath = 'static/data/trips/west-coast-2024/';
  const files = readdirSync(folderPath);
  
  // Count .md files
  const mdFiles = files.filter(file => file.endsWith('.md'));
  const totalMdFiles = mdFiles.length;

  // Get last modified date of most recent .md file
  let mostRecentDate = new Date(0); // Initialize with earliest possible date
  mdFiles.forEach(file => {
      const filePath = join(folderPath, file);
      const stats = statSync(filePath);
      if (stats.mtime > mostRecentDate) {
          mostRecentDate = stats.mtime;
      }
  });

  return {
      totalMdFiles,
      mostRecentModifiedDate: mostRecentDate
  };
}
