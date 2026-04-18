export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full border-t border-border bg-background">
      <div className="flex justify-between px-4 sm:px-6 lg:px-8 py-3 text-xs text-muted-foreground">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
          <div>Database connected</div>
          <div>3 commits today</div>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-right">
          <div>6 ideas stored</div>
          <div>Made by me</div>
        </div>
      </div>
    </footer>
  );
}
