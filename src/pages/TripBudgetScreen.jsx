import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Search } from "lucide-react";
import { Input } from "../components/ui/Input";

export function TripBudgetScreen() {
  const { id } = useParams();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  
  const trip = trips.find(t => t.id === id);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  if (!trip) return <div className="p-8 text-center font-bold">Trip not found</div>;

  // Logical Cost Calculation
  const activities = trip.stops.flatMap(s => s.activities);
  const subtotal = activities.reduce((sum, a) => sum + (a.cost || 0), 0);
  const tax = Math.round(subtotal * 0.05);
  const discount = 50; // Mock discount from reference
  const grandTotal = subtotal + tax - discount;
  
  const budget = trip.budget || 20000;
  const remaining = budget - grandTotal;

  // Conditional Rendering Logic: If no activities exist, the invoice table is empty or hidden
  const hasExpenses = activities.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6">
      <header className="mb-6 flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="text-xl font-bold tracking-tighter text-indigo-600">Traveloop</div>
          <div className="flex items-center gap-3 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-10 h-10 border-slate-300 rounded-lg w-full" placeholder="Search invoices......" />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
              Sort #
            </Button>
            <div className="h-10 w-10 rounded-full border-2 border-slate-300 bg-slate-100 ml-4" />
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="text-sm font-medium hover:underline text-indigo-600 w-fit">
           ← back to My Trips
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card className="border-slate-200 rounded-xl overflow-hidden shadow-sm border">
            <CardContent className="p-8 flex flex-wrap gap-12 bg-white">
              <div className="w-40 h-40 border border-slate-200 rounded-2xl flex items-center justify-center bg-indigo-50">
                 <span className="text-4xl font-black text-indigo-200">Trip</span>
              </div>
              <div className="flex-1 min-w-[300px]">
                <h2 className="text-2xl font-black mb-1">{trip.name}</h2>
                <p className="text-sm text-slate-500 font-bold mb-6">{trip.startDate} - {trip.endDate} - {trip.stops.length} cities</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Traveler Details:</h4>
                  <ul className="text-sm font-bold text-slate-700">
                    <li>James</li>
                    <li>Arjun</li>
                    <li>Jerry</li>
                    <li>Cristina</li>
                  </ul>
                </div>
              </div>
              <div className="text-sm font-bold space-y-4">
                <div>
                  <p className="text-slate-400 text-xs uppercase">Invoice Id</p>
                  <p className="font-mono text-slate-800">INV-xyz-30290</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase">Generated date</p>
                  <p className="text-slate-800">May 20, 2025</p>
                </div>
                <p className={`pt-2 font-bold italic ${isPaid ? "text-emerald-600" : "text-amber-500"}`}>
                  Payment status - {isPaid ? "Paid" : "Pending"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data-Driven Invoice Table */}
          <Card className="border-slate-200 rounded-xl overflow-hidden shadow-sm border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-4 border-r border-slate-200 font-black text-sm w-12 text-center text-slate-600">#</th>
                    <th className="p-4 border-r border-slate-200 font-black text-sm text-slate-600">Category</th>
                    <th className="p-4 border-r border-slate-200 font-black text-sm text-slate-600">Description</th>
                    <th className="p-4 border-r border-slate-200 font-black text-sm text-slate-600">Qty/details</th>
                    <th className="p-4 border-r border-slate-200 font-black text-sm text-slate-600">Unit Cost</th>
                    <th className="p-4 font-black text-sm text-slate-600">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {hasExpenses ? (
                    activities.map((act, i) => (
                      <tr key={act.id} className="hover:bg-slate-50 font-bold">
                        <td className="p-4 border-r border-slate-200 text-center text-slate-500">{i + 1}</td>
                        <td className="p-4 border-r border-slate-200 text-slate-800">{act.type}</td>
                        <td className="p-4 border-r border-slate-200 italic text-slate-600">{act.name}</td>
                        <td className="p-4 border-r border-slate-200 text-slate-600">1 unit</td>
                        <td className="p-4 border-r border-slate-200 font-mono text-center text-slate-800">{act.cost}</td>
                        <td className="p-4 font-mono text-center text-slate-800">{act.cost}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-20">
                      <td colSpan={6} className="text-center text-slate-400 italic">No expenses recorded for this trip.</td>
                    </tr>
                  )}
                  {/* Totals Section - Always Visible for Structure */}
                  <tr className="border-t-2 border-slate-200 bg-slate-50/50">
                    <td colSpan={4} className="border-r border-slate-200" />
                    <td className="p-4 border-r border-slate-200 font-bold text-sm text-right space-y-1 text-slate-600">
                      <p>Subtotal</p>
                      <p>tax(5%)</p>
                      <p>Discount</p>
                    </td>
                    <td className="p-4 font-mono font-bold text-right space-y-1 text-slate-800">
                      <p>$ {subtotal}</p>
                      <p>$ {tax}</p>
                      <p>$ {discount}</p>
                    </td>
                  </tr>
                  <tr className="bg-slate-100">
                    <td colSpan={4} className="border-r border-slate-200" />
                    <td className="p-4 border-r border-slate-200 font-black text-sm text-right uppercase tracking-widest text-slate-800">Grand Total</td>
                    <td className="p-4 font-black font-mono text-right text-lg text-indigo-700">$ {grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <aside className="w-full lg:w-80">
          <Card className="border-slate-200 rounded-[32px] shadow-sm border bg-white p-8">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 italic text-slate-800">budget Insights</h3>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-8">
                 <div className="absolute inset-0 rounded-full border-[12px] border-slate-100" />
                 <div className="absolute inset-0 rounded-full border-[12px] border-indigo-500 border-t-transparent border-r-transparent rotate-[-45deg]" />
              </div>
              <div className="w-full space-y-3 text-sm font-bold">
                <div className="flex justify-between uppercase tracking-tight">
                  <span className="text-slate-400">Total Budget:</span>
                  <span className="text-slate-800">{budget}</span>
                </div>
                <div className="flex justify-between uppercase tracking-tight">
                  <span className="text-slate-400">total spent:</span>
                  <span className="text-slate-800">{grandTotal}</span>
                </div>
                <div className="flex justify-between items-center uppercase tracking-tight pt-3 border-t border-slate-200 mt-2">
                  <span className="text-slate-400">Remaining:</span>
                  <span className={remaining < 0 ? "bg-red-100 text-red-600 px-3 py-1 rounded-md" : "bg-emerald-100 text-emerald-600 px-3 py-1 rounded-md"}>{remaining}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full h-12 border border-slate-300 rounded-xl font-black uppercase text-xs text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200">View Full Budget</Button>
          </Card>
        </aside>
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-8 bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex gap-4">
          <Button onClick={() => window.alert("Downloading Invoice...")} variant="outline" className="px-10 h-12 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">Download Invoice</Button>
          <Button onClick={() => window.alert("Exporting as PDF...")} variant="outline" className="px-10 h-12 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">Export as PDF</Button>
        </div>
        <Button 
          onClick={() => setIsPaid(!isPaid)} 
          variant={isPaid ? "outline" : "default"} 
          className={`px-16 h-12 rounded-xl font-bold text-lg ${isPaid ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50" : ""}`}
        >
          {isPaid ? "Mark as Unpaid" : "Mark as paid"}
        </Button>
      </footer>
    </div>
  );
}
