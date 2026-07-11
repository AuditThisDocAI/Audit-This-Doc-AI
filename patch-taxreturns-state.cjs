const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const importRegex = /export interface ExpenseRecord/g;

code = code.replace(/import \{([\s\S]*?)ExpenseRecord,([\s\S]*?)\} from "\.\/types";/, 
  'import {$1ExpenseRecord,\n  TaxReturnRecord,$2} from "./types";');

const stateRegex = /const \[expenses, setExpenses\] = useState<ExpenseRecord\[\]>\(\[\]\);/;
const replacement = `const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [taxReturns, setTaxReturns] = useState<TaxReturnRecord[]>(() => {
    const saved = localStorage.getItem("gmi_tax_returns");
    if (saved) return JSON.parse(saved);
    return [];
  });
  
  useEffect(() => {
    localStorage.setItem("gmi_tax_returns", JSON.stringify(taxReturns));
  }, [taxReturns]);`;

if (code.match(stateRegex)) {
  code = code.replace(stateRegex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Patched state");
} else {
  console.log("Not found");
}
