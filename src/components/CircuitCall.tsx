import { LockKeyhole, ShieldCheck, Sparkles, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProofProgressModal } from "@/components/ProofProgressModal";
import type { ContentItem, ProofState } from "@/types";
import type { MidnightClient } from "@/hooks/useMidnight";

export function CircuitCall({ item, midnight, unlocked, onUnlock }: { item: ContentItem; midnight: MidnightClient; unlocked: boolean; onUnlock: (id: string, nullifier: string) => void }) {
  const [open, setOpen] = useState(false);
  const [proof, setProof] = useState<ProofState>({ step: "idle", progress: 0, nullifier: "" });
  const [artifactOpen, setArtifactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const startProof = async () => {
    setOpen(true);
    setProof({ step: "reading", progress: 0, nullifier: "" });
    await new Promise((resolve) => setTimeout(resolve, 700));
    setProof((current) => ({ ...current, step: "synthesizing" }));
    await new Promise((resolve) => setTimeout(resolve, 800));
    setProof((current) => ({ ...current, step: "proving", progress: 8 }));
    for (let value = 8; value <= 100; value += 23) {
      await new Promise((resolve) => setTimeout(resolve, 360));
      setProof((current) => ({ ...current, progress: Math.min(value, 100) }));
    }
    setProof((current) => ({ ...current, step: "disclosing", progress: 100 }));
    const result = await midnight.generateProofAndUnlock(item.id);
    setProof({ step: "success", progress: 100, nullifier: result.nullifier });
    window.setTimeout(() => onUnlock(item.id, result.nullifier), 1800);
  };

  const handleCopyNullifier = () => {
    navigator.clipboard.writeText(proof.nullifier || "N/A");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (unlocked) return <div className="space-y-4">
    <div className="border border-mint/20 bg-mint/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-mint">
        <ShieldCheck size={15} />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]">Proof verified · content decrypted</span>
      </div>
      <p className="text-sm leading-6 text-secondary-foreground">{item.secretContent}</p>
    </div>
    <Button
      variant="outline"
      size="sm"
      className="rounded-none border-mint/30 font-mono text-[9px] uppercase tracking-wider text-mint hover:bg-mint/10"
      onClick={() => setArtifactOpen(true)}
    >
      <Sparkles size={14} /> View private artifact
    </Button>

    {/* Artifact Detail Modal */}
    {artifactOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setArtifactOpen(false)}>
        <div className="relative mx-4 w-full max-w-lg border border-mint/30 bg-surface-1 p-0 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="border-b border-border px-6 py-4">
            <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-mint">
              <ShieldCheck size={12} /> Private artifact · ZK verified
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">by {item.creator}</p>
          </div>

          {/* Body */}
          <div className="space-y-4 px-6 py-5">
            <div className="border border-mint/15 bg-mint/5 p-4">
              <p className="text-sm leading-7 text-secondary-foreground">{item.secretContent}</p>
            </div>

            {/* Proof Metadata */}
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">CIRCUIT</span>
                <span className="text-foreground">zk_creator.compact / unlock</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">NETWORK</span>
                <span className="text-foreground">Midnight Preprod</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">NULLIFIER</span>
                <button onClick={handleCopyNullifier} className="flex items-center gap-1.5 text-mint hover:text-mint/80 transition-colors">
                  {proof.nullifier || "N/A"}
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IDENTITY DISCLOSED</span>
                <span className="text-mint">0 bytes</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">Your secret never left this device</p>
            <Button variant="outline" size="sm" className="rounded-none border-border font-mono text-[9px] uppercase tracking-wider" onClick={() => setArtifactOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    )}

    <ProofProgressModal open={open} onOpenChange={setOpen} proof={proof} title={item.title} />
  </div>;

  return <>
    <Button className="w-full rounded-none bg-foreground font-mono text-[10px] uppercase tracking-[0.14em] text-background hover:bg-mint" onClick={() => void startProof()} disabled={!midnight.isConnected}>
      <LockKeyhole size={14} /> {midnight.isConnected ? "Synthesize ZK Proof" : "Connect Wallet to Proceed"}
    </Button>
    <ProofProgressModal open={open} onOpenChange={setOpen} proof={proof} title={item.title} />
  </>;
}