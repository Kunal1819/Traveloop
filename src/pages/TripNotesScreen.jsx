import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { Input } from "../components/ui/Input";

export function TripNotesScreen() {
  const { id } = useParams();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [notes, setNotes] = useState([
    { id: 1, title: "Hotel check-in details - Rome stop", content: "check in after 2pm, room 302, breakfast included (7-10am)", subtitle: "Day 3: June 14 2025" },
    { id: 2, title: "Flight confirmation codes", content: "Outbound: XY492L, Return: AB920K", subtitle: "General" },
    { id: 3, title: "Restaurant Reservation", content: "Dinner at Trattoria da Enzo, 8:00 PM. Booked under 'Smith'.", subtitle: "Day 4: June 15 2025" }
  ]);
  
  const trip = trips.find(t => t.id === id);

  // If no trip is selected, show a logical selection screen or null if no trips exist
  if (!trip && trips.length > 0) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto mt-20 space-y-4">
        <h2 className="text-2xl font-black text-indigo-900">Select a trip to view notes</h2>
        <div className="grid gap-2">
          {trips.map(t => (
            <Button key={t.id} variant="outline" onClick={() => navigate(`/trips/${t.id}/notes`)}>
              {t.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (!trip) return <div className="p-8 text-center font-bold text-slate-500">Trip not found</div>;

  const handleDelete = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter(n => n.id !== noteId));
    }
  };

  const handleEdit = (noteId) => {
    window.alert(`Editing note ${noteId} is not fully implemented yet.`);
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "Start typing your note here...",
      subtitle: "Just now"
    };
    setNotes([newNote, ...notes]);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(query.toLowerCase()) || 
    n.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-6 bg-white shadow-sm">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="px-6 space-y-6">
        {/* Search and Filters Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 border-slate-300 rounded-lg w-full text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              placeholder="Search notes..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 px-4 border-slate-300 rounded-lg text-sm bg-white">
            Group by
          </Button>
          <Button variant="outline" className="h-10 px-4 border-slate-300 rounded-lg text-sm bg-white">
            Filter
          </Button>
          <Button variant="outline" className="h-10 px-4 border-slate-300 rounded-lg text-sm bg-white">
            Sort by...
          </Button>
        </div>

        {/* Title and Controls */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Trip notes</h1>
          
          <div className="flex items-center justify-between gap-4">
            {/* Trip Selector */}
            <div className="flex items-center justify-between border border-slate-300 rounded-xl px-4 py-2 w-full max-w-sm font-bold bg-white text-indigo-900 shadow-sm">
              Trip: {trip.name} <span className="ml-4">↓</span>
            </div>
            
            {/* Add Note Button */}
            <Button variant="default" onClick={handleAddNote} className="h-10 px-6 rounded-xl font-bold shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Note
            </Button>
          </div>

          {/* Filtering Tabs */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('all')}
              className={`h-8 px-8 rounded-lg text-xs font-bold ${activeFilter !== 'all' && 'border-slate-300'}`}
            >
              All
            </Button>
            <Button 
              variant={activeFilter === 'day' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('day')}
              className={`h-8 px-6 rounded-lg text-xs font-bold ${activeFilter !== 'day' && 'border-slate-300'}`}
            >
              By Day
            </Button>
            <Button 
              variant={activeFilter === 'stop' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('stop')}
              className={`h-8 px-6 rounded-lg text-xs font-bold ${activeFilter !== 'stop' && 'border-slate-300'}`}
            >
              By Stop
            </Button>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4 pt-4 pb-20">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 bg-white rounded-2xl">
               <p className="text-slate-500 italic">No notes found. Create one to get started.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <Card key={note.id} className="w-full border-slate-200 rounded-[24px] shadow-sm bg-white p-6 relative group hover:border-indigo-200 transition-colors">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(note.id)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                     <Edit2 className="w-4 h-4" />
                   </button>
                   <button onClick={() => handleDelete(note.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800 pr-20">{note.title}</h3>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{note.content}</p>
                  <p className="text-sm font-medium italic text-indigo-500">{note.subtitle}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
