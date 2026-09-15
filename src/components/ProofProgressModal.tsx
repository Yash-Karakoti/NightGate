import { Check, CircleDashed, Cpu, Loader2, ShieldCheck, Terminal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { ProofState } from "@/types";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; proof: ProofState; title: string };

const steps = [
  ["reading", "Reading local witness", "Private balance / credentials never leave memory"],
  ["synthesizing", "Synthesizing Compact circuit constraints", "Compiling eligibility predicate"],
  ["proving", "Generating zero-knowledge SNARK proof", "Midnight proof server · local witness sealed"],
  ["disclosing", "Disclosing nullifier hash", "Anonymous event published to Preprod ledger"],
] as const;

export function ProofProgressModal({ open, onOpenChange, proof, title }: Props) {
  const activeIndex = steps.findIndex(([key]) => key === proof.step);
  const isSuccess = proof.step === "success";
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="overflow-hidden border-border/80 bg-surface-1 p-0 text-foreground sm:max-w-[580px]">
    <div className="border-b border-border bg-surface-2 px-6 py-5"><DialogHeader><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center border border-border bg-code text-mint"><Cpu size={19} /></div><div><DialogTitle className="font-display text-xl">{isSuccess ? "Access granted" : "Proved without revealing your input"}</DialogTitle><DialogDescription className="mt-1 text-muted-foreground">{isSuccess ? "The content was unlocked with a valid local proof." : `Generating a proof for “${title}”`}</DialogDescription></div></div></DialogHeader></div>
    <div className="space-y-5 p-6">
      <div className="border border-border bg-code p-4 font-mono text-[11px] leading-6 text-muted-foreground"><div className="mb-2 flex items-center gap-2 border-b border-border pb-2 text-mint"><Terminal size={13} /> compact-circuit / unlock_alpha.compact <span className="ml-auto text-muted-foreground">{isSuccess ? "EXIT 0" : "RUNNING"}</span></div>{steps.map(([key, label, detail], index) => { const done = isSuccess || activeIndex > index; const active = proof.step === key; return <div key={key} className={`flex gap-3 ${active ? "text-foreground" : ""}`}><span className={done ? "text-mint" : active ? "text-warning" : "text-muted-foreground/50"}>{done ? <Check size={13} /> : active ? <Loader2 size={13} className="animate-spin" /> : <CircleDashed size={13} />}</span><span><span className="block">{label} {key === "proving" && active ? `${proof.progress}%` : done ? "[complete]" : ""}</span><span className="block text-[10px] text-muted-foreground/75">{detail}</span></span></div> })}</div>
      {proof.step === "proving" && <Progress value={proof.progress} className="h-1 bg-mint/10 [&>div]:bg-mint" />}
      {isSuccess && <div className="flex items-center gap-3 border border-mint/25 bg-mint/5 p-3"><ShieldCheck className="text-mint" size={18} /><div><p className="font-mono text-xs text-mint">NULLIFIER DISCLOSED · {proof.nullifier}</p><p className="mt-0.5 text-xs text-muted-foreground">Aggregate unlock count incremented. Identity remains private.</p></div></div>}
    </div>
  </DialogContent></Dialog>;
}