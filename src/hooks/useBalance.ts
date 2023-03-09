import { useMemo } from "react";

import { useContracts } from "@hooks/useContracts";
import { useAccount } from "@utils/metamask";

export const useBalance = () => {
  const account = useAccount();
  const contracts = useContracts();

  return useMemo(() => {
    const getBalanceToken = async () => {
      return await contracts?.tokenContract?.balanceOf(account);
    };

    return {
      getBalanceToken,
    };
  }, [account]);
};
