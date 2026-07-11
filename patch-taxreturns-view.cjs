const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /\{\/\* Payroll view \*\/\}/;
const viewHtml = `
                      {bookkeepingSubtab === "tax_returns" && (
                        <div className="space-y-6 animate-fadeIn">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-lg font-bold text-zinc-900">Tax Return Log</h3>
                              <p className="text-xs text-zinc-500">Record and track your historical tax returns.</p>
                            </div>
                            <button
                              onClick={() => {
                                const year = prompt("Enter Tax Year (e.g., " + new Date().getFullYear() + "):", new Date().getFullYear().toString());
                                if (!year) return;
                                const income = prompt("Enter Total Income ($):", "0");
                                if (!income) return;
                                const tax = prompt("Enter Total Tax Paid/Owed ($):", "0");
                                if (!tax) return;
                                const statusRaw = prompt("Enter Status (pending, filed, accepted, rejected):", "filed");
                                const status = ["pending", "filed", "accepted", "rejected"].includes(statusRaw?.toLowerCase() || "") ? statusRaw?.toLowerCase() : "filed";
                                
                                setTaxReturns(prev => [...prev, {
                                  id: "tr_" + Date.now(),
                                  year: parseInt(year),
                                  dateFiled: new Date().toISOString().split('T')[0],
                                  status: status as any,
                                  totalIncome: parseFloat(income),
                                  totalTax: parseFloat(tax),
                                  notes: ""
                                }]);
                                handleShowAlert("✅ Tax return logged successfully.");
                              }}
                              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-colors"
                            >
                              + Log Return
                            </button>
                          </div>
                          
                          {taxReturns.length === 0 ? (
                            <div className="w-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50/50 rounded-2xl border border-zinc-100 border-dashed p-8">
                              <FileText className="w-8 h-8 mb-3 text-zinc-300" />
                              <span className="text-sm font-bold block mb-1 text-zinc-500">
                                No Tax Returns Logged
                              </span>
                              <span className="text-xs max-w-xs text-center">
                                Log your filed tax returns here to keep a centralized record for audits.
                              </span>
                            </div>
                          ) : (
                            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Tax Year</th>
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Date Logged</th>
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-right">Total Income</th>
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-right">Total Tax</th>
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {taxReturns.sort((a, b) => b.year - a.year).map((tr) => (
                                    <tr key={tr.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                                      <td className="py-3 px-4 font-bold text-zinc-900">{tr.year}</td>
                                      <td className="py-3 px-4 text-zinc-500">{tr.dateFiled}</td>
                                      <td className="py-3 px-4 text-right font-mono text-zinc-700">\${tr.totalIncome.toFixed(2)}</td>
                                      <td className="py-3 px-4 text-right font-mono text-indigo-700 font-bold">\${tr.totalTax.toFixed(2)}</td>
                                      <td className="py-3 px-4 text-center">
                                        <span className={\`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider \${
                                          tr.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                                          tr.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                                          tr.status === 'filed' ? 'bg-indigo-100 text-indigo-800' :
                                          'bg-amber-100 text-amber-800'
                                        }\`}>
                                          {tr.status}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 text-right">
                                        <button
                                          onClick={() => {
                                            if (confirm("Delete this tax return log?")) {
                                              setTaxReturns(prev => prev.filter(r => r.id !== tr.id));
                                              handleShowAlert("🗑️ Tax return log deleted.");
                                            }
                                          }}
                                          className="text-rose-500 hover:text-rose-700 p-1 bg-rose-50 rounded-md transition-colors"
                                          title="Delete Log"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
              {/* Payroll view */}`;

if (code.match(regex)) {
  code = code.replace(regex, viewHtml);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Patched view");
} else {
  console.log("Not found view hook");
}
