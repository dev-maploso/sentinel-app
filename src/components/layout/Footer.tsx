export default function Footer() {
  return (
    <footer className="h-12 flex items-center justify-center border-t text-sm text-zinc-500 bg-white dark:bg-zinc-900">
      © {new Date().getFullYear()} - Your App
    </footer>
  );
}