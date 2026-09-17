import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Prefixes a root-relative public asset path (e.g. "/logo.png") with the
// deployed base path (e.g. "/fullstackverse/"), so assets resolve correctly
// both in dev (base "/") and on GitHub Pages project sites (base "/repo/").
export function asset(path) {
	return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;
}
