import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Search } from "lucide-react";
import { cn } from "../utils/cn";

export function PackingChecklistScreen() {
  const { id } = useParams();
  const { trips, updateTrip } = useTrips();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [query, setQuery] = useState("");
  
  const trip = trips.find(t => t.id === id);
  const [checklist, setChecklist] = useState(trip?.packingList || []);

  useEffect(() => {
    if (trip) setChecklist(trip.packingList || []);
  }, [trip]);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleToggleItem = (itemId) => {
    const updated = checklist.map(i => i.id === itemId ? { ...i, packed: !i.packed } : i);
    setChecklist(updated);
    if (trip) {
       updateTrip(trip.id, { packingList: updated });
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to uncheck all items?")) {
      const updated = checklist.map(i => ({ ...i, packed: false }));
      setChecklist(updated);
      if (trip) updateTrip(trip.id, { packingList: updated });
    }
  };

  // If no trip is selected, show a logical selection screen or null if no trips exist
  if (!trip && trips.length > 0) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto mt-20 space-y-4">
        <h2 className="text-2xl font-black text-indigo-900">Select a trip to view checklist</h2>
        <div className="grid gap-2">
          {trips.map(t => (
            <Button key={t.id} variant="outline" onClick={() => navigate(`/trips/${t.id}/packing`)}>
              {t.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (!trip) return <div className="p-8 text-center font-bold">No trips found. Create one to start packing!</div>;

  const filteredChecklist = checklist.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  const packedCount = checklist.filter(i => i.packed).length;
  const totalCount = checklist.length;
  
  // Logical Grouping
  const categories = filteredChecklist.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { name: item.category, items: [], packed: 0 };
    acc[item.category].items.push(item);
    if (item.packed) acc[item.category].packed++;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm" 
              placeholder="Search checklist ......" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500">Packing checklist</p>
          <div className="flex items-center justify-between border border-slate-300 rounded-xl px-4 py-2 w-full max-w-sm font-bold bg-white text-indigo-900 shadow-sm">
            Trip: {trip.name} <span className="ml-4">↓</span>
          </div>

          {totalCount > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-sm font-bold text-slate-700">Progress: {packedCount}/{totalCount} items packed</p>
              <div className="h-2 w-full max-w-2xl border border-slate-300 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(packedCount/totalCount)*100}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8 pt-6 pb-20">
          {totalCount === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 bg-white rounded-xl">
               <p className="text-slate-500 italic">Your checklist is empty. Add items below to get started.</p>
            </div>
          ) : Object.keys(categories).length === 0 ? (
             <div className="text-center py-12 text-slate-500 italic">No items match your search.</div>
          ) : (
            Object.values(categories).map((cat) => (
              <Card key={cat.name} className="space-y-4 p-6 border-slate-200 shadow-sm bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold italic text-lg text-indigo-800">{cat.name}</span>
                  <span className="font-bold text-slate-500">{cat.packed}/{cat.items.length}</span>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => handleToggleItem(item.id)}
                    >
                      <div className={cn(
                        "w-6 h-6 border-2 rounded flex items-center justify-center transition-colors shadow-sm",
                        item.packed ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white group-hover:border-indigo-400"
                      )}>
                         {item.packed && <span className="text-white text-sm font-bold">✓</span>}
                      </div>
                      <span className={cn("text-sm font-medium transition-colors", item.packed ? "text-slate-400 line-through" : "text-slate-700 group-hover:text-indigo-900")}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="default" className="flex-1 h-12 rounded-lg font-bold shadow-sm">+ add item to checklist</Button>
            <Button variant="destructive" onClick={handleReset} className="flex-1 h-12 rounded-lg font-bold shadow-sm">Reset all</Button>
            <Button variant="outline" onClick={() => window.alert('Checklist Share Link Copied!')} className="flex-1 h-12 border-slate-300 hover:bg-slate-50 text-indigo-600 rounded-lg font-bold shadow-sm">Share Checklist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
