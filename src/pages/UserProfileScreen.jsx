import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

export function UserProfileScreen() {
  const { user } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "John Doe");
  const [email, setEmail] = useState(user?.email || "john@example.com");

  const today = new Date().toISOString().split('T')[0];
  const upcomingTrips = trips.filter(t => t.startDate > today);
  const previousTrips = trips.filter(t => t.endDate < today);

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
       window.alert("Account deletion simulated.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-2 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
      </header>

      <div className="px-6 py-8 space-y-12 pb-20">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-48 h-48 rounded-full border-2 border-slate-200 flex flex-col items-center justify-center bg-indigo-50 p-8 text-center shrink-0 shadow-sm text-indigo-400">
             <span className="text-sm font-bold leading-tight">Image of the User</span>
          </div>
          
          <Card className="flex-1 border-slate-200 rounded-3xl shadow-sm bg-white p-8 min-h-[192px] w-full">
            <div className="flex justify-between items-start mb-6">
               <h2 className="text-2xl font-black tracking-tight text-indigo-900">User Details</h2>
               <Button 
                 variant={isEditing ? "default" : "outline"} 
                 onClick={() => setIsEditing(!isEditing)} 
                 className={`font-bold ${!isEditing ? 'border-slate-300' : ''}`}
               >
                 {isEditing ? "Save Changes" : "Edit Profile"}
               </Button>
            </div>
            
            <div className="space-y-4 max-w-md">
              <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Name</label>
                 {isEditing ? (
                   <Input value={name} onChange={e => setName(e.target.value)} className="border-slate-300 h-10" />
                 ) : (
                   <p className="text-lg font-bold text-slate-800">{name}</p>
                 )}
              </div>
              <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
                 {isEditing ? (
                   <Input value={email} onChange={e => setEmail(e.target.value)} className="border-slate-300 h-10" />
                 ) : (
                   <p className="text-lg font-bold text-slate-800">{email}</p>
                 )}
              </div>
              
              <div className="pt-6">
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="font-bold px-6 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {upcomingTrips.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-t border-slate-200 pt-6 text-slate-800">Preplanned Trips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="relative aspect-[3/4] border-slate-200 rounded-3xl shadow-sm bg-white flex flex-col items-center justify-end pb-8 group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center p-6 text-center transition-colors group-hover:bg-indigo-50/80">
                    <h3 className="text-2xl font-black uppercase text-indigo-900">{trip.name}</h3>
                  </div>
                  <Button variant="default" onClick={() => navigate(`/trips/${trip.id}/view`)} className="relative z-10 px-8 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md translate-y-4 group-hover:translate-y-0">View Itinerary</Button>
                </Card>
              ))}
            </div>
          </section>
        )}

        {previousTrips.length > 0 && (
          <section className="space-y-6 pb-20">
            <h2 className="text-2xl font-bold border-t border-slate-200 pt-6 text-slate-800">Previous Trips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {previousTrips.map((trip) => (
                <Card key={trip.id} className="relative aspect-[3/4] border-slate-200 rounded-3xl shadow-sm bg-white flex flex-col items-center justify-end pb-8 group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-50 flex items-center justify-center p-6 text-center transition-colors group-hover:bg-indigo-50/80">
                    <h3 className="text-2xl font-black uppercase text-slate-700 group-hover:text-indigo-900">{trip.name}</h3>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/trips/${trip.id}/view`)} className="relative z-10 px-8 border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-sm translate-y-4 group-hover:translate-y-0">View Itinerary</Button>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {upcomingTrips.length === 0 && previousTrips.length === 0 && (
          <div className="text-center py-16 text-slate-500 italic border-2 border-dashed border-slate-300 bg-white rounded-3xl mt-12">
            You don't have any trips yet. Head to the Dashboard to create one!
          </div>
        )}
      </div>
    </div>
  );
}
