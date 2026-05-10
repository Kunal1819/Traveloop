import { useParams } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { MapPin, Copy, Share2, Link as LinkIcon, Compass } from "lucide-react";

export function SharedItineraryScreen() {
  const { id } = useParams();
  const { trips } = useTrips();
  
  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-slate-50">
        <Compass className="h-16 w-16 text-indigo-300 mb-4 animate-pulse" />
        <h1 className="text-3xl font-black mb-2 text-slate-800">Itinerary Not Found</h1>
        <p className="text-slate-500">This trip might be private or doesn't exist.</p>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    window.alert("Link copied to clipboard!");
  };

  const handleDuplicate = () => {
    window.alert("Trip duplicated to your account!");
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-20 pt-8 px-4 sm:px-6">
      <div className="bg-indigo-600 text-white p-8 md:p-12 rounded-3xl text-center relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-block bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2 shadow-sm">
            Shared Trip
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">{trip.name}</h1>
          <p className="text-xl font-medium text-indigo-200">{trip.startDate} to {trip.endDate}</p>
          <p className="max-w-xl mx-auto mt-4 text-indigo-100">{trip.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">The Journey</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyLink} className="border-slate-300 text-indigo-700 hover:bg-indigo-50 font-bold">
            <LinkIcon className="h-4 w-4 mr-2" /> Copy Link
          </Button>
          <Button variant="default" size="sm" onClick={handleDuplicate} className="font-bold shadow-sm">
            <Copy className="h-4 w-4 mr-2" /> Duplicate Trip
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {trip.stops.map((stop, index) => (
          <Card key={stop.id} className="overflow-hidden border-slate-200 shadow-sm rounded-2xl transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">{stop.city}</h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{stop.startDate} — {stop.endDate}</p>
              </div>
            </div>
            <CardContent className="p-0">
              {stop.activities.length > 0 ? (
                <div className="divide-y divide-slate-100 bg-white">
                  {stop.activities.map((act) => (
                    <div key={act.id} className="flex items-center gap-4 p-4 px-6 group hover:bg-slate-50 transition-colors">
                      <div className="bg-indigo-50 p-2 rounded-full text-indigo-500 group-hover:bg-indigo-100 transition-colors">
                         <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{act.name}</p>
                        <p className="text-xs font-semibold text-slate-500 uppercase">{act.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-slate-500 italic bg-white text-center">No scheduled activities for this stop.</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <h3 className="font-bold mb-6 text-slate-800 text-lg">Share this itinerary</h3>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" onClick={() => window.alert('Share modal opened')} className="rounded-full h-12 w-12 border-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleCopyLink} className="rounded-full h-12 w-12 border-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <LinkIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
