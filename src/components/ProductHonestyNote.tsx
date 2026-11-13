type ProductHonestyNoteProps = {
  status: "demo" | "live";
};

export function ProductHonestyNote({ status }: ProductHonestyNoteProps) {
  return (
    <aside
      className="mx-auto mb-8 max-w-4xl rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-6 text-white/55"
      aria-label="Product status"
    >
      {status === "demo"
        ? "SoulMayte is an early-access demo. Compatibility insights are for reflection and conversation, not therapy, diagnosis, or a guarantee about any relationship."
        : "SoulMayte provides compatibility insights for reflection and conversation, not therapy, diagnosis, or a guarantee about any relationship."}
    </aside>
  );
}
