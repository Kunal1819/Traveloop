import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Search } from "lucide-react";

// Mock data
const mockCities = [
  { id: "c1", name: "Tokyo", country: "Japan" },
  { id: "c2", name: "Kyoto", country: "Japan" },
  { id: "c3", name: "Rome", country: "Italy" },
  { id: "c4", name: "Prague", country: "Czech Republic" },
  { id: "c5", name: "Reykjavik", country: "Iceland" },
];

export function CitySearchScreen() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const { addStop } = useTrips();
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleAdd = (city) => {
    if (tripId) {
      addStop(tripId, { city: city.name, startDate: "", endDate: "", activities: [] });
      navigate(`/trips/${tripId}/builder`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6 pb-12">
        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              placeholder="Search cities..."
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

        <div className="pt-2">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Results</h2>
          <div className="space-y-4">
            {mockCities.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(city => (
              <Card key={city.id} className="relative w-full h-24 border-slate-200 rounded-2xl shadow-sm flex items-center justify-between px-8 bg-white hover:border-indigo-200 transition-colors">
                <h3 className="text-xl font-bold text-slate-800">{city.name}, <span className="text-slate-500 font-medium">{city.country}</span></h3>
                {tripId && (
                  <div>
                    <Button variant="default" size="sm" onClick={() => handleAdd(city)} className="font-bold shadow-sm">Add to Trip</Button>
                  </div>
                )}
              </Card>
            ))}
            {mockCities.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
              <div className="text-center py-12 text-slate-500 italic border-2 border-dashed border-slate-300 rounded-2xl bg-white">
                No cities found matching "{query}".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
