import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Search, Trash2, Edit } from "lucide-react";
import { Input } from "../components/ui/Input";

export function MyTripsScreen() {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const filteredTrips = trips.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-8">
        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm" 
              placeholder="Search your trips..." 
              value={query}
              onChange={e => setQuery(e.target.value)}
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

        {/* Dynamic Trip Sections */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 text-slate-500 italic border-2 border-dashed border-slate-300 rounded-3xl bg-white">
            {query ? "No trips match your search." : "No trips planned yet. Go create one!"}
          </div>
        ) : (
          <>
            {filteredTrips.filter(t => t.startDate <= new Date().toISOString().split('T')[0] && t.endDate >= new Date().toISOString().split('T')[0]).length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Ongoing</h2>
                <div className="space-y-6">
                  {filteredTrips.filter(t => t.startDate <= new Date().toISOString().split('T')[0] && t.endDate >= new Date().toISOString().split('T')[0]).map(trip => (
                    <Card key={trip.id} onClick={() => navigate(`/trips/${trip.id}/view`)} className="relative cursor-pointer hover:border-indigo-600 transition-colors w-full h-40 border-slate-200 rounded-3xl shadow-sm flex items-center justify-center bg-white p-12">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}><Edit className="h-4 w-4 text-slate-400" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full text-slate-400" onClick={(e) => { e.stopPropagation(); deleteTrip(trip.id); }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{trip.name}</h3>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {filteredTrips.filter(t => t.startDate > new Date().toISOString().split('T')[0]).length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Up-coming</h2>
                <div className="space-y-6">
                  {filteredTrips.filter(t => t.startDate > new Date().toISOString().split('T')[0]).map(trip => (
                    <Card key={trip.id} onClick={() => navigate(`/trips/${trip.id}/view`)} className="relative cursor-pointer hover:border-indigo-600 transition-colors w-full h-40 border-slate-200 rounded-3xl shadow-sm flex items-center justify-center bg-white p-12">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}><Edit className="h-4 w-4 text-slate-400" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full text-slate-400" onClick={(e) => { e.stopPropagation(); deleteTrip(trip.id); }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{trip.name}</h3>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {filteredTrips.filter(t => t.endDate < new Date().toISOString().split('T')[0]).length > 0 && (
              <section className="space-y-4 pb-20">
                <h2 className="text-2xl font-bold">Completed</h2>
                <div className="space-y-6">
                  {filteredTrips.filter(t => t.endDate < new Date().toISOString().split('T')[0]).map(trip => (
                    <Card key={trip.id} onClick={() => navigate(`/trips/${trip.id}/view`)} className="relative cursor-pointer hover:border-indigo-600 transition-colors w-full h-40 border-slate-200 rounded-3xl shadow-sm flex items-center justify-center bg-white p-12">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}><Edit className="h-4 w-4 text-slate-400" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full text-slate-400" onClick={(e) => { e.stopPropagation(); deleteTrip(trip.id); }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{trip.name}</h3>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
