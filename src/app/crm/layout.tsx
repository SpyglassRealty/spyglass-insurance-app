import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Kanban,
  Shield,
  MessageSquare,
  Settings,
} from "lucide-react";

const nav = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/inbox", label: "Inbox", icon: Inbox },
  { href: "/crm/leads", label: "Pipeline", icon: Kanban },
  { href: "/crm/contacts", label: "Contacts", icon: Users },
  { href: "/crm/policies", label: "Policies", icon: Shield },
  { href: "/crm/sms", label: "SMS", icon: MessageSquare },
];

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-spy-surface flex">
      <aside className="w-60 bg-spy-charcoal text-white flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-white/60">Spyglass</div>
          <div className="font-bold text-lg">Insurance CRM</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/85 hover:bg-white/10 hover:text-white"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10">
            <Settings size={18} />
            Marketing site
          </Link>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 bg-white border-b border-spy-border flex items-center justify-between px-6">
          <div className="text-sm text-spy-muted">Agent workspace · demo data (in-memory)</div>
          <div className="text-sm font-medium">Ryan Rodenbeck</div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
