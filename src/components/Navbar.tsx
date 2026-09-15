import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import type { WalletState } from "@/types";

type Props = WalletState & { onConnect: () => Promise<void>; onDisconnect: () => void };

export function Navbar(props: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[1fr_1fr_1fr] lg:px-10">
        <div className="flex items-center gap-3"><span className="font-mono text-xs font-bold tracking-[0.12em] text-foreground">ZK-CREATOR</span><span className="hidden h-3 w-px bg-border sm:block" /><span className="hidden items-center gap-2 font-mono text-[8px] tracking-[0.12em] text-muted-foreground sm:flex"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> MIDNIGHT PREPROD // SYNCED</span></div>
        <nav aria-label="Primary" className="hidden h-full items-center justify-center lg:flex"><a href="#alpha-feed" className="flex h-full items-center border-x border-border px-5 font-mono text-[9px] tracking-[0.16em] text-foreground hover:bg-surface-1">DISPATCHES</a><a href="#privacy" className="flex h-full items-center border-r border-border px-5 font-mono text-[9px] tracking-[0.16em] text-muted-foreground hover:bg-surface-1 hover:text-foreground">VERIFIED PROOFS</a><a href="#alpha-feed" className="flex h-full items-center border-r border-border px-5 font-mono text-[9px] tracking-[0.16em] text-muted-foreground hover:bg-surface-1 hover:text-foreground">PUBLISH</a></nav>
        <div className="flex items-center justify-end gap-2"><Button variant="ghost" size="icon" asChild className="hidden rounded-none text-muted-foreground sm:inline-flex"><a href="https://faucet.midnight.network" target="_blank" rel="noreferrer" aria-label="Open testnet faucet"><ExternalLink size={13} /></a></Button><WalletConnect {...props} /></div>
      </div>
    </header>
  );
}