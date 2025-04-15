
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add this to global CSS for animation
document.styleSheets[0].insertRule(`
@keyframes dotAnimation {
  0%, 20% { content: '.' }
  40%, 60% { content: '..' }
  80%, 100% { content: '...' }
}
`, 0);

document.styleSheets[0].insertRule(`
.loading-dots::after {
  content: '';
  animation: dotAnimation 1.2s infinite;
}
`, 0);
