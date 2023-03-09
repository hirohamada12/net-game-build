import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";

import { CONTRACTS } from "@src/constants";
import { useAccount, useProvider } from "@src/utils/metamask";

export const useContracts = () => {
  const account = useAccount();
  const provider = useProvider();

  return useMemo(() => {
    if (!provider) return;
    const signer = provider.getSigner();

    const gameContract = new Contract(
      CONTRACTS.GAME.ADDRESS,
      CONTRACTS.GAME.ABI,
      signer
    );
    const tokenContract = new Contract(
      CONTRACTS.TOKEN.ADDRESS,
      CONTRACTS.TOKEN.ABI,
      signer
    );
    const presaleContract = new Contract(
      CONTRACTS.PRESALE.ADDRESS,
      CONTRACTS.PRESALE.ABI,
      signer
    );
    const dbContract = new Contract(
      CONTRACTS.DB.ADDRESS,
      CONTRACTS.DB.ABI,
      signer
    );

    return {
      gameContract,
      dbContract,
      tokenContract,
      presaleContract,
    };
  }, [account]);
};
