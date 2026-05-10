import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Search, Calendar, List } from "lucide-react";
import { Input } from "../components/ui/Input";

export function ItineraryViewScreen() {
  const { id } = useParams();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("list");
  const [activeFilter, setActiveFilter] = useState(null);
  
  const trip = trips.find(t => t.id === id);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  if (!trip) return <div className="p-8 text-center font-bold">Trip not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6">
        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm" 
              placeholder="Search itinerary..." 
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

        {/* Title & Toggle */}
        <div className="flex flex-col items-center mb-12 gap-4">
          <h1 className="text-3xl font-black tracking-tight italic text-indigo-900">Itinerary for {trip.name}</h1>
          <div className="flex gap-2 p-1 border border-slate-300 rounded-xl bg-white shadow-sm">
             <Button 
               variant="ghost" 
               className={`h-8 px-4 rounded-lg font-bold ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'text-slate-600 hover:bg-slate-100'}`}
               onClick={() => setViewMode('list')}
             >
               <List className="h-4 w-4 mr-2"/> List
             </Button>
             <Button 
               variant="ghost" 
               className={`h-8 px-4 rounded-lg font-bold ${viewMode === 'calendar' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'text-slate-600 hover:bg-slate-100'}`}
               onClick={() => setViewMode('calendar')}
             >
               <Calendar className="h-4 w-4 mr-2"/> Calendar
             </Button>
          </div>
        </div>

        {/* Day Groups */}
        <div className="space-y-16 pb-20">
          {trip.stops.map((stop, index) => (
            <div key={stop.id} className="space-y-8">
              <div className="inline-block border border-slate-300 rounded-xl px-4 py-2 font-bold text-lg bg-white shadow-sm text-indigo-600">
                Stop {index + 1}: {stop.city}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-full flex justify-between px-12 mb-4 text-xl font-bold italic text-slate-700">
                   <span>Physical Activity</span>
                   <span>Expense</span>
                </div>

                <div className="w-full space-y-4">
                  {stop.activities.length === 0 ? (
                    <div className="text-center italic text-slate-500 py-8 border-2 border-dashed border-slate-300 rounded-2xl w-full bg-white">No activities planned for this stop.</div>
                  ) : (
                    stop.activities.map((act, actIndex) => (
                      <div key={act.id} className="flex flex-col items-center gap-4">
                        <div className="w-full flex gap-8 items-center">
                          <Card className="flex-1 h-16 border-slate-200 rounded-2xl shadow-sm bg-white flex items-center px-6">
                            <span className="font-bold text-slate-800">{act.name}</span>
                          </Card>
                          <Card className="w-48 h-16 border-slate-200 rounded-2xl shadow-sm bg-white flex items-center justify-center">
                            <span className="font-mono font-bold text-slate-800">${act.cost || 0}</span>
                          </Card>
                        </div>
                        {actIndex < stop.activities.length - 1 && (
                          <div className="text-2xl text-slate-300">↓</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
          {trip.stops.length === 0 && (
             <div className="text-center py-16 text-slate-500 italic border-2 border-dashed border-slate-300 rounded-3xl bg-white">
               No itinerary generated yet. Create sections and add activities.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
