export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  featured: boolean;
  themeColor?: string;
  ambientGradient?: string;
  tags: string[];
  technologies: string[];
  category: string;
  discipline?: string;
  servicesOffered?: string[];
  thumbnail: string;
  images: string[];
  link: string | null;
  github: string | null;
  package: string | null;
  videos?: Array<{
    id: string;
    title: string;
    src: string;
    duration?: string;
    caption?: string;
  }>;
}

export interface ProjectDetailViewProps {
  project: ProjectItem;
  nextProject: ProjectItem | null;
}
