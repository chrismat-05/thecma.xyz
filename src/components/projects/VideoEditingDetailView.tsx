import React from "react";
import { AirborneDetailView } from "./AirborneDetailView";
import type { ProjectDetailViewProps } from "@/types/project";

/**
 * VideoEditingDetailView
 * Fallback / default detail view component for video editing projects.
 * Re-uses the immersive video showcase layout.
 */
export const VideoEditingDetailView: React.FC<ProjectDetailViewProps> = (props) => {
  return <AirborneDetailView {...props} />;
};

export default VideoEditingDetailView;
