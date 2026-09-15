import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "zk-Creator · Private publishing on Midnight" },
      { name: "description", content: "Publish premium content behind local zero-knowledge proofs on Midnight Network." },
      { property: "og:title", content: "zk-Creator · Private publishing on Midnight" },
      { property: "og:description", content: "Publish premium content behind local zero-knowledge proofs on Midnight Network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
