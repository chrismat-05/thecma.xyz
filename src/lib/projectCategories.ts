import { User, GraduationCap, Briefcase, FolderGit2, type LucideIcon } from "lucide-react";

export interface CategoryMeta {
  key: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  badgeClass: string;
  dotClass: string;
  accentBorder: string;
}

export const getCategoryMeta = (cat?: string): CategoryMeta => {
  const normalized = (cat || "").trim().toLowerCase();

  if (normalized === "college" || normalized === "academic") {
    return {
      key: "college",
      label: "College Project",
      shortLabel: "College",
      icon: GraduationCap,
      badgeClass:
        "border-amber-400/40 bg-amber-950/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
      dotClass: "bg-amber-400",
      accentBorder: "group-hover:border-amber-400/40",
    };
  }

  if (normalized === "client" || normalized === "commercial") {
    return {
      key: "client",
      label: "Client Project",
      shortLabel: "Client",
      icon: Briefcase,
      badgeClass:
        "border-emerald-400/40 bg-emerald-950/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      dotClass: "bg-emerald-400",
      accentBorder: "group-hover:border-emerald-400/40",
    };
  }

  if (normalized === "open-source" || normalized === "opensource") {
    return {
      key: "open-source",
      label: "Open Source",
      shortLabel: "Open Source",
      icon: FolderGit2,
      badgeClass:
        "border-purple-400/40 bg-purple-950/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
      dotClass: "bg-purple-400",
      accentBorder: "group-hover:border-purple-400/40",
    };
  }

  // Default to Personal Project
  return {
    key: "personal",
    label: "Personal Project",
    shortLabel: "Personal",
    icon: User,
    badgeClass:
      "border-sky-400/40 bg-sky-950/60 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]",
    dotClass: "bg-sky-400",
    accentBorder: "group-hover:border-sky-400/40",
  };
};
