import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Search } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export function AdminDashboardScreen() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const tabs = [
    { id: "users", label: "Manage Users" },
    { id: "cities", label: "Popular Cities" },
    { id: "activities", label: "Popular Activities" },
    { id: "analytics", label: "User Trends and Analytics" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white shadow-sm">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop Admin</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6">
        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm" 
              placeholder="Search administration......" 
            />
          </div>
          <Button 
            variant={activeFilter === 'group' ? 'default' : 'outline'} 
            onClick={() => toggleFilter('group')}
            className={`h-10 px-4 rounded-lg text-sm ${activeFilter !== 'group' && 'border-slate-300'}`}
          >
            Group by
          </Button>
          <Button 
            variant={activeFilter === 'filter' ? 'default' : 'outline'} 
            onClick={() => toggleFilter('filter')}
            className={`h-10 px-4 rounded-lg text-sm ${activeFilter !== 'filter' && 'border-slate-300'}`}
          >
            Filter
          </Button>
          <Button 
            variant={activeFilter === 'sort' ? 'default' : 'outline'} 
            onClick={() => toggleFilter('sort')}
            className={`h-10 px-4 rounded-lg text-sm ${activeFilter !== 'sort' && 'border-slate-300'}`}
          >
            Sort by...
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-4">
          {tabs.map(tab => (
            <Button 
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"} 
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-6 rounded-xl text-xs font-bold flex-1 ${activeTab !== tab.id && 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Analytics Visualization Placeholder */}
        <Card className="w-full min-h-[600px] border-slate-200 rounded-[40px] shadow-sm bg-white flex flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Abstract Graph Shapes using vibrant colors */}
          <div className="w-full max-w-2xl space-y-12">
            <div className="flex justify-between items-center">
              <div className="space-y-4">
                {[
                  { color: "bg-indigo-500", width: "w-48" },
                  { color: "bg-emerald-500", width: "w-64" },
                  { color: "bg-amber-500", width: "w-32" },
                  { color: "bg-red-500", width: "w-56" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full ${item.color} shadow-sm`} />
                    <div className={`h-4 ${item.width} bg-slate-100 rounded border border-slate-200`} />
                  </div>
                ))}
              </div>
              <div className="w-48 h-48 rounded-full border-[30px] border-slate-100 border-t-indigo-500 border-r-emerald-400 shadow-inner" />
            </div>
            
            <div className="h-48 w-full border-l-2 border-b-2 border-slate-300 relative">
               <div className="absolute bottom-12 left-0 right-0 h-1 bg-indigo-200 flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-indigo-600 -translate-y-1.5 shadow-sm ring-2 ring-white" />
                  ))}
               </div>
            </div>

            <div className="flex gap-12 items-end justify-center">
               <div className="w-16 h-32 bg-indigo-200 rounded-t-lg border-x border-t border-indigo-300" />
               <div className="w-16 h-48 bg-indigo-500 rounded-t-lg shadow-md" />
               <div className="w-16 h-24 bg-emerald-400 rounded-t-lg shadow-sm" />
               <div className="flex-1 space-y-3">
                  <div className="h-8 bg-slate-200 w-full rounded" />
                  <div className="h-4 bg-slate-100 w-full rounded" />
                  <div className="h-4 bg-slate-100 w-full rounded" />
                  <div className="h-4 bg-slate-100 w-full rounded" />
                  <div className="h-4 bg-slate-100 w-full rounded" />
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
