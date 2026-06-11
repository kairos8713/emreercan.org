'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link2, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { urlFor } from '@/lib/sanity';
import Tag from '@/components/ui/Tag';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('projects');
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).format('webp').url()
    : null;

  return (
    <motion.article
      className="group relative bg-card border border-border rounded-lg overflow-hidden cursor-default transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        boxShadow: '0 0 0 0 transparent',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent), 0 8px 32px rgba(232,255,71,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
      }}
    >
      {/* Cover image */}
      {imageUrl ? (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-bg border-b border-border flex items-center justify-center">
          <span className="font-mono text-xs text-muted">No cover</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Top row: tech tags + status badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech && project.tech.length > 0 && project.tech.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
          {(project as { status?: string }).status && (
            <span className={`font-mono text-xs px-2 py-0.5 border flex-shrink-0 ${
              (project as { status?: string }).status === 'done'
                ? 'border-accent text-accent'
                : (project as { status?: string }).status === 'in-progress'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-border text-muted'
            }`}>
              {(project as { status?: string }).status === 'done' ? '✓ Done' : (project as { status?: string }).status === 'in-progress' ? '⟳ In Progress' : '○ Planned'}
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-xl text-text mb-2 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              <Link2 size={14} />
              {t('github')} ↗
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              <ExternalLink size={14} />
              {t('live')} ↗
            </Link>
          )}
        </div>

        {/* Progress bar — sadece done değilse göster */}
        {(project as { status?: string; progress?: number }).status && (project as { status?: string }).status !== 'done' && (
          <div className="w-full h-px bg-border mt-3">
            <div
              className="h-px bg-accent transition-all duration-500"
              style={{ width: `${(project as { progress?: number }).progress ?? 0}%` }}
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');

  return (
    <section
      id="projects"
      className="px-6 lg:px-16 py-16 max-w-7xl mx-auto w-full"
    >
      {/* Section label */}
      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
        02 / Projects
      </p>

      <h2 className="text-5xl font-bold font-display leading-none" style={{ margin: "0", marginBottom: "1rem" }}>
        <span
          className="bg-accent text-bg px-2"
          style={{
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
            lineHeight: '1.15',
            display: 'inline',
            paddingTop: '0.1em',
            paddingBottom: '0.1em',

          }}
        >
          {t('title')}
        </span>
      </h2>

      {projects.length === 0 ? (
        <p className="text-muted font-mono text-sm mb-0">Projects coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
