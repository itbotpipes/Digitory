import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { Route } from "next";
import { HomeIcon, SettingsIcon, SearchIcon, FileText, CheckCircle, MessageSquare, Inbox, Users, Megaphone, LogOut } from "lucide-react";

interface NavbarProps {
  className?: string;
}

interface ILink {
  label: string;
  href: string;
  Icon: typeof HomeIcon;
  permission?: string;
}

const links: ILink[] = [
  {
    label: "Demo Requests",
    href: "/admin/dashboard?tab=leads",
    Icon: Inbox,
    permission: "manage_leads",
  },
  {
    label: "Contact Messages",
    href: "/admin/dashboard?tab=contacts",
    Icon: MessageSquare,
    permission: "manage_contacts",
  },
  {
    label: "Announcements",
    href: "/admin/dashboard?tab=updates",
    Icon: Megaphone,
    permission: "manage_blogs",
  },
  {
    label: "Blog Posts",
    href: "/admin/dashboard?tab=blogs",
    Icon: FileText,
    permission: "manage_blogs",
  },
  {
    label: "Solutions",
    href: "/admin/dashboard?tab=solutions",
    Icon: CheckCircle,
    permission: "manage_solutions",
  },
  {
    label: "Industries",
    href: "/admin/dashboard?tab=industries",
    Icon: HomeIcon,
    permission: "manage_industries",
  },
  {
    label: "Comments",
    href: "/admin/dashboard?tab=comments",
    Icon: MessageSquare,
    permission: "manage_comments",
  },
  {
    label: "Registered Users",
    href: "/admin/dashboard?tab=users",
    Icon: Users,
    permission: "manage_users",
  },
  {
    label: "Staff / Admins",
    href: "/admin/dashboard?tab=admins",
    Icon: Users,
    permission: "manage_users",
  },
  {
    label: "Roles",
    href: "/admin/dashboard?tab=roles",
    Icon: SettingsIcon,
    permission: "manage_users",
  },
  {
    label: "SEO Management",
    href: "/admin/seo",
    Icon: SearchIcon,
    permission: "manage_blogs",
  },
];

import { api } from "@/lib/api";

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Apply cached permissions instantly
      const cached = localStorage.getItem('admin_permissions');
      if (cached) {
        try { setPermissions(JSON.parse(cached)); } catch (_) {}
      }
      const cachedRole = localStorage.getItem('admin_role_name');
      if (cachedRole) setRoleName(cachedRole);

      // Always fetch latest to stay synced
      api.get('/auth/me', token).then((res) => {
        const perms = res.data?.user?.roleId?.permissions || [];
        const role = res.data?.user?.roleId?.name || '';
        setPermissions(perms);
        setRoleName(role);
        localStorage.setItem('admin_permissions', JSON.stringify(perms));
        localStorage.setItem('admin_role_name', role);
      }).catch(console.error);
    }
  }, []);

  const hasPermission = (required?: string) => {
    if (!required) return true;
    // Admin role name always has full access (mirrors backend logic)
    if (roleName === 'Admin') return true;
    return permissions.includes('*') || permissions.includes(required);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_permissions');
    localStorage.removeItem('admin_role_name');
    window.location.href = '/admin/login';
  };

  return (
    <div className={clsx("w-64 flex-shrink-0 bg-white dark:bg-[#121214] border-r border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300", className)}>
      <div className="flex h-full flex-col justify-between py-6 px-4">
        
        {/* Logo/Header area */}
        <div className="mb-8 px-2">
          <Link href="/admin/dashboard?tab=leads" className="block">
            <Image
              src="/digitory-black.png"
              alt="Digitory Logo"
              width={130}
              height={32}
              className="object-contain h-7 w-auto block dark:hidden"
              priority
            />
            <Image
              src="/digitory-white.png"
              alt="Digitory Logo"
              width={130}
              height={32}
              className="object-contain h-7 w-auto hidden dark:block"
              priority
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex h-full flex-col gap-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {links
            .filter(link => hasPermission(link.permission))
            .map((link, indx) => {
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

        {/* Bottom actions: Logout */}
        <div className="pt-6 mt-4 border-t border-zinc-150 dark:border-zinc-800/80 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 font-semibold text-[14px] text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 group"
          >
            <LogOut size={18} className="mr-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Logout
          </button>
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
