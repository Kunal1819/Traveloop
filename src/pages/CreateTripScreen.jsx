import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";

export function CreateTripScreen() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("");
  const [errors, setErrors] = useState({});
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (!name) newErrors.name = "Trip name is required";
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTrip({
      name,
      startDate,
      endDate,
      description: "",
      destinations: [place],
      budget: 0,
    });
    
    navigate("/trips");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4 px-6 mb-2 bg-white">
        <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-slate-100" />
      </header>

      <div className="border-t border-b border-slate-200 bg-white">
        <div className="p-4 px-6 font-bold text-sm text-slate-800">Plan a new trip</div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Form Grid */}
        <form onSubmit={handleSave} className="max-w-xl space-y-4">
          <div className="flex items-center gap-6">
            <label className="w-32 text-sm font-bold">Start Date:</label>
            <div className="flex-1">
              <Input 
                type="date"
                className="h-10 border-slate-300 rounded-lg w-full"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setErrors({...errors, startDate: ""}); }}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="w-32 text-sm font-bold">Select a Place :</label>
            <Input 
              placeholder="Enter destination"
              className="flex-1 h-10 border-slate-300 rounded-lg"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="w-32 text-sm font-bold">Trip Name:</label>
            <div className="flex-1">
              <Input 
                type="text"
                placeholder="Enter trip name"
                className="h-10 border-slate-300 rounded-lg w-full"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors({...errors, name: ""}); }}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="w-32 text-sm font-bold">End Date:</label>
            <div className="flex-1">
              <Input 
                type="date"
                className="h-10 border-slate-300 rounded-lg w-full"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setErrors({...errors, endDate: ""}); }}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="w-32 text-sm font-bold">Cover Photo:</label>
            <div className="flex-1 flex items-center">
              <input type="file" id="coverPhoto" className="hidden" accept="image/*" />
              <label htmlFor="coverPhoto" className="h-10 px-4 border border-slate-300 rounded-lg flex items-center cursor-pointer text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors bg-white">
                Upload Image
              </label>
            </div>
          </div>
        </form>

        {/* Suggestion Section */}
        <div className="border-t border-b border-slate-200 -mx-6 mt-12 bg-white">
          <div className="p-4 px-6 font-bold text-sm italic text-slate-500">Suggestion for Places to Visit/Activites to preform</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="aspect-square border-slate-200 rounded-2xl shadow-sm bg-white" />
          ))}
        </div>

        <div className="pt-8 flex justify-end">
           <Button onClick={handleSave} variant="default" className="px-10 rounded-xl font-bold">Create Trip</Button>
        </div>
      </div>
    </div>
  );
}
