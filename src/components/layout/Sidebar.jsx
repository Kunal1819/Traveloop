import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import { LayoutDashboard, Map, List, CheckSquare, User, Settings, PieChart } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Trips", href: "/trips", icon: List },
  { name: "Create Trip", href: "/trips/new", icon: Map },
  { name: "Packing List", href: "/packing", icon: CheckSquare },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Admin Analytics", href: "/admin", icon: PieChart },
];

export function Sidebar({ className }) {
  return (
    <div className={cn("flex h-full w-64 flex-col border-r border-slate-200 bg-white", className)}>
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200 bg-white">
        <span className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop.</span>
      </div>
      <nav className="flex flex-1 flex-col gap-y-1 p-4 overflow-y-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 px-2">Menu</div>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              )
            }
          >
            <item.icon
              className={cn("h-5 w-5 shrink-0")}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
            )
          }
        >
          <Settings className="h-5 w-5 shrink-0" aria-hidden="true" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
