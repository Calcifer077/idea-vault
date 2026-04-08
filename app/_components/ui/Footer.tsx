export default function Footer() {
  return (
    <footer className="sticky bottom-0 flex justify-between border-t border-border px-8 py-3 bg-background">
      <div className="flex gap-6 text-xs text-muted-foreground">
        <div>Database connected</div>
        <div>3 commits today</div>
      </div>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <div>6 ideas stored</div>
        <div>Made by me</div>
      </div>
    </footer>
  );
}
