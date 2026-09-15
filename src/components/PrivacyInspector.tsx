import { ChevronDown, ChevronUp, EyeOff, Radio, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PrivacyInspector({ lastNullifier }: { lastNullifier: string | undefined }) {
  const [expanded, setExpanded] = useState(false);
  const hash = lastNullifier ?? "0x7a19...bc04";
  return (
    <section id="privacy" className="border-b border-border bg-code">
      <div className="mx-auto max-w-[1440px] px-5 py-5 lg:px-10">
        <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto]">
          <div className="flex items-start gap-3"><EyeOff size={15} className="mt-0.5 text-warning" /><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-warning">A / Local machine</p><p className="mt-1 text-xs text-secondary-foreground">Witness data remains in browser RAM <span className="font-mono text-muted-foreground">(0 bytes broadcasted)</span></p></div></div>
          <div className="hidden h-10 w-px bg-border lg:block" />
          <div className="flex items-start gap-3"><Radio size={15} className="mt-0.5 text-mint" /><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mint">B / Midnight ledger</p><p className="mt-1 text-xs text-secondary-foreground">Only nullifier <span className="font-mono text-foreground">{hash}</span> and unlock counter committed on-chain</p></div></div>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-[9px] tracking-wider" onClick={() => setExpanded((value) => !value)}>{expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />} INSPECT PAYLOAD</Button>
        </div>
        {expanded && <div className="mt-5 grid border border-border bg-surface-1 lg:grid-cols-2"><div className="border-b border-border p-5 lg:border-b-0 lg:border-r"><div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-warning"><EyeOff size={12} /> Retained locally</div><pre className="overflow-x-auto font-mono text-[10px] leading-6 text-muted-foreground">{`{
  "wallet_balance": "12450 NIGHT",
  "credential": "verified_human_l2",
  "seed_material": "[REDACTED]",
  "network_egress_bytes": 0
}`}</pre></div><div className="p-5"><div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-mint"><ShieldCheck size={12} /> Broadcast payload</div><pre className="overflow-x-auto font-mono text-[10px] leading-6 text-muted-foreground">{`{
  "nullifier_hash": "${hash}",
  "circuit_result": true,
  "counter_delta": 1,
  "identity": null
}`}</pre></div></div>}
      </div>
    </section>
  );
}