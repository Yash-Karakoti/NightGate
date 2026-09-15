import { Clock3, Copy, FileLock2, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CircuitCall } from "@/components/CircuitCall";
import type { ContentItem } from "@/types";
import type { MidnightClient } from "@/hooks/useMidnight";

export function ContentCard({ item, midnight, unlocked, onUnlock }: { item: ContentItem; midnight: MidnightClient; unlocked: boolean; onUnlock: (id: string, nullifier: string) => void }) {
  const reference = item.id.slice(0, 4).toUpperCase();
  return (
    <article className="dossier-card group relative flex h-full flex-col border border-border bg-surface-1 transition-colors duration-200 ease-out hover:border-foreground/25">
      <span className="crosshair -left-[5px] -top-[9px]">+</span><span className="crosshair -right-[5px] -top-[9px]">+</span><span className="crosshair -bottom-[9px] -left-[5px]">+</span><span className="crosshair -bottom-[9px] -right-[5px]">+</span>
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border px-5 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="text-foreground">DOC-REF #{reference}</span><span className="h-px bg-border" /><span className="flex items-center gap-1.5"><Clock3 size={10} /> {item.published}</span>
      </header>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-5 flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center border border-border bg-code font-mono text-[8px] text-mint">{item.avatar}</span><span className="font-mono text-[10px] text-foreground">{item.creator}</span></div><Badge variant="outline" className="rounded-none border-border font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{item.category}</Badge></div>
        <FileLock2 size={20} className="mb-4 text-muted-foreground" />
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{item.title}</h3>
        <div className="my-5 h-px bg-border" />
        {unlocked ? <div className="animate-reveal"><CircuitCall item={item} midnight={midnight} unlocked onUnlock={onUnlock} /></div> : <>
          <div className="relative min-h-28 overflow-hidden text-sm leading-6 text-muted-foreground"><p className="select-none blur-[6px] pointer-events-none">{item.teaser}</p><div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-1/80 to-surface-1" /></div>
          <div className="mt-auto border-y border-border py-3"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-warning">[ GATE: {item.requirement.toUpperCase()} ]</p></div>
          <div className="flex items-center justify-between py-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><span className="flex items-center gap-1.5"><Flame size={11} className="text-warning" /> {item.unlocks} unlocks</span><span className="flex items-center gap-1.5"><Copy size={10} /> 0 bytes identity</span></div>
          <CircuitCall item={item} midnight={midnight} unlocked={false} onUnlock={onUnlock} />
        </>}
      </div>
    </article>
  );
}