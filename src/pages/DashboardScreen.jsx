import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Search } from "lucide-react";
import { Input } from "../components/ui/Input";

export function DashboardScreen() {
  const { trips } = useTrips();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const filteredTrips = trips.filter(trip =>
    trip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const previousTrips = filteredTrips.filter(t => t.endDate < new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header / Top Navigation */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-8">
        {/* Banner Image Area */}
        <Card className="w-full h-[300px] border-slate-200 rounded-3xl overflow-hidden shadow-none flex items-center justify-center bg-indigo-50">
          <h2 className="text-6xl font-black text-indigo-200 uppercase tracking-widest">Banner Image</h2>
        </Card>

        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full" 
              placeholder="Search trips..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Regional Selections Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold whitespace-nowrap">Top Regional Selections</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="aspect-square border-slate-200 rounded-2xl shadow-sm bg-white" />
            ))}
          </div>
        </section>

        {/* Previous Trips Section */}
        {previousTrips.length > 0 && (
          <section className="space-y-6 pb-24">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold whitespace-nowrap">Previous Trips</h3>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {previousTrips.slice(0, 3).map((trip) => (
                <Card key={trip.id} onClick={() => navigate(`/trips/${trip.id}/view`)} className="cursor-pointer hover:border-indigo-600 transition-colors aspect-[3/4] border-slate-200 rounded-3xl shadow-sm bg-white flex items-center justify-center p-6 text-center">
                  <h4 className="text-2xl font-black uppercase tracking-tight text-slate-800">{trip.name}</h4>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Fixed Plan Button */}
        <div className="fixed bottom-8 right-8">
          <Button 
            onClick={() => navigate("/trips/new")}
            variant="default"
            className="h-14 px-8 rounded-full shadow-lg flex items-center gap-3 font-bold text-lg"
          >
            <span className="text-2xl leading-none mb-1">+</span> Plan a trip
          </Button>
        </div>
      </div>
    </div>
  );
}
