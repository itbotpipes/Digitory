import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { Route } from "next";
import { HomeIcon, SettingsIcon, SearchIcon, FileText, CheckCircle, MessageSquare, Inbox, Users, Megaphone } from "lucide-react";

interface NavbarProps {
  className?: string;
}

interface ILink {
  label: string;
  href: string;
  Icon: typeof HomeIcon;
}

const links: ILink[] = [
  {
    label: "Demo Requests",
    href: "/admin/dashboard?tab=leads",
    Icon: Inbox,
  },
  {
    label: "Contact Messages",
    href: "/admin/dashboard?tab=contacts",
    Icon: MessageSquare,
  },
  {
    label: "Announcements",
    href: "/admin/dashboard?tab=updates",
    Icon: Megaphone,
  },
  {
    label: "Blog Posts",
    href: "/admin/dashboard?tab=blogs",
    Icon: FileText,
  },
  {
    label: "Solutions",
    href: "/admin/dashboard?tab=solutions",
    Icon: CheckCircle,
  },
  {
    label: "Industries",
    href: "/admin/dashboard?tab=industries",
    Icon: HomeIcon,
  },
  {
    label: "Comments",
    href: "/admin/dashboard?tab=comments",
    Icon: MessageSquare,
  },
  {
    label: "Users",
    href: "/admin/dashboard?tab=users",
    Icon: Users,
  },
  {
    label: "SEO Management",
    href: "/admin/seo",
    Icon: SearchIcon,
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className={clsx("w-64 flex-shrink-0 bg-white dark:bg-[#121214] border-r border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300", className)}>
      <div className="flex h-full flex-col justify-between py-6 px-4">
        
        {/* Logo/Header area */}
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FF4F18] flex items-center justify-center text-white font-extrabold text-sm shadow-[0_4px_10px_rgba(255,79,24,0.3)]">
            D
          </div>
          <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
            Digitory
          </span>
        </div>

        {/* Main Navigation */}
        <div className="flex h-full flex-col gap-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {links.map((link, indx) => {
            // Determine active state by checking path and tab query param
            const linkUrl = new URL(link.href, 'http://localhost');
            const linkTab = linkUrl.searchParams.get('tab');
            const currentTab = searchParams.get('tab');
            
            const isTabMatch = linkTab 
              ? currentTab === linkTab 
              : !currentTab; // default match if tab is undefined
              
            const isPathMatch = pathname === linkUrl.pathname || (linkUrl.pathname !== '/admin/dashboard' && pathname.startsWith(linkUrl.pathname));
            const isActive = isPathMatch && isTabMatch;

            return (
              <NavItem key={indx} {...link} isActive={isActive} />
            );
          })}
        </div>

        {/* Settings */}
        <div className="pt-6 mt-4 border-t border-zinc-150 dark:border-zinc-800/80">
          <NavItem
            label="Settings"
            href="/admin/settings"
            Icon={SettingsIcon}
            isActive={pathname.startsWith('/admin/settings')}
          />
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<ILink & { className?: string; isActive?: boolean }> = ({
  label,
  href,
  Icon,
  className,
  isActive,
}) => {
  return (
    <Link
      className={clsx(
        "flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 font-semibold text-[14px]",
        isActive 
          ? "bg-[#FFF3EF] dark:bg-orange-950/20 text-[#FF4F18]" 
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white",
        className,
      )}
      href={href}
    >
      <Icon size={18} className="mr-3 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
      {label}
    </Link>
  );
};

export default Navbar;
