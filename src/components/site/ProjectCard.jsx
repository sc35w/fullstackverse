import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectShot from './ProjectShot';

// Portfolio entry: dashboard screenshot, metadata line, serif title, editorial link.
export default function ProjectCard({ project, size = 'md' }) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="group flex h-full flex-col">
      <ProjectShot project={project} size={size === 'lg' ? 'lg' : 'sm'} className="transition-[border-color] duration-300 group-hover:border-ink" />
      <div className="meta mt-5 flex flex-wrap gap-x-3 gap-y-1">
        <span>{project.category}</span>
        <span aria-hidden="true">/</span>
        <span>{project.industry}</span>
      </div>
      <h3 className={size === 'lg' ? 'display-3 mt-3 !text-[clamp(1.75rem,2.6vw,2.4rem)]' : 'display-3 mt-3'}>{project.name}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-2">{project.title}</p>
      <span className="link-arrow mt-4 self-start">
        View project <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
