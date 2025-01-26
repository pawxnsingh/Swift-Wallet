"use client";

import { useBalance } from "@repo/store/balance";
import { balanceAtom } from "@repo/store/atom";

export default function () {
  const balance = useBalance();
  console.log(balanceAtom);

  return (
    <div>
      hi there {balance}
      <p>{JSON.stringify(balanceAtom)}</p>
    </div>
  );
}
