type Project = {
  title: string;
  tags: string[];
  [key: string]: any;
};

export const filterProjectsByTag = (projects: Project[], tag: string) => {
  if (tag === 'All') return projects;
  return projects.filter(project => project.tags.includes(tag));
};

export const getAllTags = (projects: Project[]) => {
  const tagSet = new Set<string>();
  projects.forEach(p => p.tags.forEach(tag => tagSet.add(tag)));
  return ['All', ...Array.from(tagSet)];
};
