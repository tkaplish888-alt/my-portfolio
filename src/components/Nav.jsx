import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const LINKS = [
  ["systems", "AI builds"],
  ["work", "Experience"],
  ["case-studies", "Case studies"],
  ["references", "References"],
  ["contact", "Contact"],
];

export default function Nav({ onHome, onSection, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => { onSection(id); setOpen(false); };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled || open ? "bg-paper/95 backdrop-blur border-b-[1.5px] border-edge" : "border-b-[1.5px] border-transparent"}`}>
      <div className="max-w-[1040px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <button onClick={onHome} className="display text-xl font-extrabold cursor-pointer" aria-label="Back to top">
          tonishqa<span className="text-marigold">.</span>
        </button>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1 mr-2">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                className="text-[14px] font-medium text-ink-2 hover:text-ink hover:bg-sunk px-3 py-1.5 rounded-md cursor-pointer">
                {label}
              </button>
            ))}
          </div>
          <button onClick={onToggleTheme} aria-label="Toggle dark mode"
            className="p-2 rounded-md border-[1.5px] border-edge bg-card hover:bg-marigold-soft cursor-pointer">
            <Sun size={16} className="hidden dark:block" aria-hidden />
            <Moon size={16} className="dark:hidden" aria-hidden />
          </button>
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}
            className="md:hidden p-2 ml-1 rounded-md cursor-pointer">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col">
          {LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="text-left py-3 text-[15px] font-medium border-b border-rule last:border-0 cursor-pointer">
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
