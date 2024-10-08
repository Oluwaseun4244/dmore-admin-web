import { Suspense } from "react";
import FinanceTransactions from ".";


export default function FinanceTransactionee() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <FinanceTransactions />
    </Suspense>
  );
}
