import { ArrowDown, ArrowUpRight, Braces, Radio, ShieldCheck } from "lucide-react";
import { useCallback, useState } from "react";
import { CreatorStudioModal } from "@/components/CreatorStudioModal";
import { ContentFeed } from "@/components/ContentFeed";
import { Navbar } from "@/components/Navbar";
import { PrivacyInspector } from "@/components/PrivacyInspector";
import { useMidnight } from "@/hooks/useMidnight";
import { Button } from "@/components/ui/button";

const telemetry = [
  ["0x7a19…bc04", "grant_unlock", "VERIFIED"],
  ["0xf83e…991a", "audit_access", "VERIFIED"],
  ["0x10c4…77ef", "bridge_alpha", "PENDING"],
  ["0xd290…ae31", "airdrop_matrix", "VERIFIED"],
] as const;

export default function App() {
  const midnight = useMidnight();
  const [unlockedIds, setUnlockedIds] = useState<Record<string, string>>({});
  const onUnlock = useCallback((id: string, nullifier: string) => {
    setUnlockedIds((current) => ({ ...current, [id]: nullifier }));
  }, []);
  const lastNullifier = Object.values(unlockedIds).at(-1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isConnected={midnight.isConnected}
        walletAddress={midnight.walletAddress}
        balance={midnight.balance}
        onConnect={midnight.connectWallet}
        onDisconnect={midnight.disconnectWallet}
      />
      <main>
        <section className="relative border-b border-border">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,3fr)_minmax(360px,2fr)]">
            <div className="flex min-h-[620px] flex-col justify-between border-border px-5 py-12 lg:border-r lg:px-10 lg:py-16">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Protocol / 01</span><span className="h-px w-12 bg-border" /><span>Confidential publishing</span>
              </div>
              <div className="max-w-[820px] py-16">
                <h1 className="font-display text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-foreground">
                  Encrypted dispatches for <span className="font-editorial font-normal italic text-mint">verified eyes</span> only.
                </h1>
                <p className="mt-9 max-w-xl border-l border-mint pl-5 text-base leading-7 text-muted-foreground">
                  Publish high-signal intelligence without leaking subscriber identity. Unlocked locally with zero-knowledge proofs.
                </p>
              </div>
              <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
                <Button className="justify-between rounded-none bg-foreground px-5 text-background hover:bg-foreground/90" onClick={() => document.getElementById("alpha-feed")?.scrollIntoView({ behavior: "smooth" })}>
                  OPEN DISPATCH INDEX <ArrowDown size={14} />
                </Button>
                <CreatorStudioModal />
                <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">4,892 proofs verified / 0 identities exposed</span>
              </div>
            </div>

            <aside className="flex min-h-[520px] flex-col bg-surface-1 px-5 py-8 lg:min-h-[620px] lg:px-7 lg:py-10">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2"><Radio size={13} className="text-mint" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">Live cryptographic telemetry</span></div>
                <span className="font-mono text-[9px] text-mint">● STREAMING</span>
              </div>
              <div className="flex-1 py-6">
                <div className="mb-8 grid grid-cols-2 gap-px border border-border bg-border">
                  <div className="bg-surface-1 p-4"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Proof latency</p><p className="mt-2 font-mono text-xl text-foreground">2.41<span className="text-xs text-muted-foreground">s</span></p></div>
                  <div className="bg-surface-1 p-4"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Witness egress</p><p className="mt-2 font-mono text-xl text-mint">0<span className="text-xs"> bytes</span></p></div>
                </div>
                <div className="space-y-0 font-mono">
                  <div className="grid grid-cols-[1.1fr_1fr_auto] border-y border-border py-2 text-[8px] uppercase tracking-[0.16em] text-muted-foreground"><span>Nullifier</span><span>Circuit</span><span>Status</span></div>
                  {telemetry.map(([hash, circuit, status], index) => <div key={hash} className="grid grid-cols-[1.1fr_1fr_auto] items-center border-b border-border py-4 text-[10px]"><span className="text-foreground">{hash}</span><span className="text-muted-foreground">{circuit}</span><span className={status === "VERIFIED" ? "text-mint" : "text-warning"}>{status}</span><span className="col-span-3 mt-2 h-px origin-left bg-mint/20 animate-scan" style={{ animationDelay: `${index * 240}ms` }} /></div>)}
                </div>
              </div>
              <div className="border border-border bg-code p-4 font-mono text-[9px] leading-5 text-muted-foreground"><span className="text-mint">$</span> compact verify --network preprod<br /><span className="text-foreground">Awaiting anonymous proof events_</span></div>
            </aside>
          </div>
        </section>
        <PrivacyInspector lastNullifier={lastNullifier} />
        <ContentFeed midnight={midnight} unlockedIds={unlockedIds} onUnlock={onUnlock} />
        <section className="border-t border-border">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center lg:px-10">
            <div><p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground"><Braces size={12} /> Midnight Builder Challenge / Preprod</p><h2 className="mt-2 font-display text-xl text-foreground">Private by construction. Verifiable by anyone.</h2></div>
            <Button variant="outline" className="rounded-none" asChild><a href="https://midnight.network" target="_blank" rel="noreferrer">READ THE PROTOCOL <ArrowUpRight size={14} /></a></Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row"><span className="flex items-center gap-2"><ShieldCheck size={12} /> ZK-CREATOR / 2026</span><span>Witness private // Result public</span></div></footer>
    </div>
  );
}