import { Suspense } from "react";
import FinanceTransactions from ".";
import Spinner from "@/app/components/generic/Spinner";


export default function FinanceTransactionee() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Spinner /></div>}>
      <FinanceTransactions />
    </Suspense>
  );
}
