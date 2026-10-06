import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProjectMockup from './ProjectMockup';

// Portfolio card: illustrated preview, industry | category line, title and arrow.
export default function ProjectCard({ project }) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="group flex h-full flex-col">
      <ProjectMockup project={project} className="aspect-[4/3] rounded-2xl" />
      <p className="mt-4 text-sm text-slate-500">
        {project.industry} <span className="mx-1 text-slate-300">|</span> {project.category}
      </p>
      <div className="mt-1 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug text-nb-text group-hover:text-nb-blue">
          {project.name}: {project.title}
        </h3>
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nb-soft text-nb-blue transition-colors group-hover:bg-nb-blue group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
