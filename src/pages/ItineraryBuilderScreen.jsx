import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export function ItineraryBuilderScreen() {
  const { id } = useParams();
  const { trips } = useTrips();
  const navigate = useNavigate();
  
  const trip = trips.find(t => t.id === id);
  
  if (!trip) return <div className="p-8 text-center font-bold">Trip not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6 pb-20">
        {/* Empty State */}
        {trip.stops.length === 0 && (
          <div className="text-center py-16 text-slate-500 italic border-2 border-dashed border-slate-300 rounded-3xl bg-white">
            No sections added to this itinerary yet. Click below to add your first destination.
          </div>
        )}

        {/* Sections */}
        {trip.stops.map((stop, index) => (
          <Card key={stop.id} className="relative border-slate-200 rounded-3xl shadow-sm bg-white p-8 space-y-6">
            <div className="absolute top-8 right-8">
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                 onClick={() => navigate(`/search/activity?tripId=${trip.id}&stopId=${stop.id}`)}
               >
                 + Add Activity
               </Button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Section {index + 1}: {stop.city}</h3>
              <p className="text-sm font-medium leading-relaxed max-w-2xl text-slate-600">
                {stop.activities.length > 0 ? stop.activities.map(a => a.name).join(', ') : "No activities planned for this section. Add some to get started."}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4 px-6 py-4 border border-slate-200 bg-slate-50 rounded-2xl min-w-[300px]">
                <span className="text-sm font-bold">Date Range:</span>
                <span className="text-sm text-slate-500 font-medium italic">{stop.startDate || "TBD"} to {stop.endDate || "TBD"}</span>
              </div>
              {stop.activities.length > 0 && (
                <div className="flex items-center justify-center px-6 py-4 border border-slate-200 bg-slate-50 rounded-2xl min-w-[300px]">
                  <span className="text-sm font-bold text-emerald-600">Budget of this section: ${stop.activities.reduce((sum, a) => sum + (a.cost || 0), 0)}</span>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Add Section Button */}
        <div className="pt-8 flex justify-center">
          <Button 
            onClick={() => navigate(`/search/city?tripId=${trip.id}`)}
            variant="default" 
            className="h-14 px-12 rounded-2xl text-xl font-bold flex items-center gap-4 shadow-lg"
          >
            <span className="text-3xl font-normal leading-none mb-1">+</span> Add another Section
          </Button>
        </div>
      </div>
    </div>
  );
}
