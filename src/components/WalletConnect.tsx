import { Check, ExternalLink, Wallet, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { WalletState } from "@/types";

type WalletConnectProps = WalletState & {
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
};

export function WalletConnect({ isConnected, walletAddress, balance, onConnect, onDisconnect }: WalletConnectProps) {
  const [open, setOpen] = useState(false);
  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden border border-border bg-code px-3 py-2 font-mono text-[9px] text-foreground sm:block">[ {walletAddress} // {balance} ]</div>
        <Button variant="outline" size="icon" className="rounded-none" onClick={onDisconnect} aria-label="Disconnect Lace Wallet">
          <X size={13} />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button variant="outline" size="sm" className="rounded-none font-mono text-[9px] uppercase tracking-wider" onClick={() => setOpen(true)}>
        <Wallet size={13} /> Connect Lace
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border/80 bg-surface-1 text-foreground sm:max-w-md">
          <DialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center border border-border bg-code text-mint"><Wallet size={22} /></div>
            <DialogTitle className="font-display text-2xl">Connect your Lace wallet</DialogTitle>
            <DialogDescription className="text-muted-foreground">Your private balance stays in this browser. zk-Creator only publishes an anonymous proof nullifier.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 border border-border bg-code p-4">
            <div className="flex items-start gap-3"><span className="mt-0.5 text-mint"><Check size={16} /></span><p className="text-sm text-secondary-foreground">Private witness data never leaves your device.</p></div>
            <div className="flex items-start gap-3"><span className="mt-0.5 text-mint"><Check size={16} /></span><p className="text-sm text-secondary-foreground">Proofs are generated locally for Midnight Preprod.</p></div>
            <div className="flex items-start gap-3"><span className="mt-0.5 text-mint"><Check size={16} /></span><p className="text-sm text-secondary-foreground">Only a spent nullifier becomes publicly verifiable.</p></div>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="link" asChild><a href="https://lace.io" target="_blank" rel="noreferrer">Get Lace <ExternalLink size={13} /></a></Button>
            <Button className="rounded-none" onClick={async () => { await onConnect(); setOpen(false); }}>Connect wallet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}