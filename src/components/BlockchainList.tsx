import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { CONTRACTS } from "@src/constants";
import { useBalance, useContracts } from "@src/hooks";
import { useStore } from "@src/store";
import { getColorFromIndex } from "@src/utils/getColorFromIndex";
import { useAccount } from "@src/utils/metamask";
import { BN } from "@utils/BN";

import { ChainCore, PulsationCircle } from "./Blockchain";

export const BlockchainList: React.FC = () => {
  const { store, write } = useStore();
  const contracts = useContracts();
  const account = useAccount();
  const [isCreating, setCreating] = useState(false);
  const { getBalanceToken } = useBalance();

  const approve = async () => {
    if (!contracts) return;
    const allowance = await contracts.tokenContract.allowance(
      account,
      CONTRACTS.TOKEN.ADDRESS
    );
    if (BN.formatUnits(allowance, 18).toNumber() > 1000) {
      await createBlockchain();
    }
    const balance = BN.formatUnits(await getBalanceToken(), 18).toString();
    if (Number(balance) < 1000) {
      toast.error("Not enough balance in the account to create a node");
      return;
    }
    const tx = await contracts?.tokenContract?.approve(
      CONTRACTS.GAME.ADDRESS,
      BigNumber.from("1000000000000000000000")
    );
    tx.wait();
    if (tx) {
      await createBlockchain();
    } else {
      toast.error("Not enough balance in the account to create a node");
    }
  };
  const createBlockchain = async () => {
    if (!contracts || isCreating) return;
    setCreating(true);
    const balance = BN.formatUnits(await getBalanceToken(), 18).toString();
    if (Number(balance) < 1000) {
      toast.error("Not enough balance in the account to create a node");
      setCreating(false);
    } else {
      try {
        const tx = await contracts.gameContract.createBlockchain();
        await tx.wait();

        const blockchainsIds: BigNumber[] =
          await contracts.gameContract.callStatic.getUserBlockchains(account);

        write(
          "blockchainsIds",
          blockchainsIds.map((id) => id.toNumber())
        );
      } catch (error) {
        setCreating(false);
      } finally {
        setCreating(false);
      }
    }
  };

  const selectBlockchain = (id: number) => {
    write("selectedBlockchainId", id);
  };

  if (store.selectedBlockchainId === undefined) {
    return null;
  }

  return (
    <Root>
      {store.blockchainsIds
        .filter((id) => id !== store.selectedBlockchainId)
        .map((id) => {
          const localBlockchainIndex = store.blockchainsIds.findIndex(
            (_id) => _id === id
          );
          const color = getColorFromIndex(localBlockchainIndex);

          return (
            <MiniChainCore
              key={id}
              color={color}
              onClick={() => selectBlockchain(id)}
            >
              <PulsationCircle />
            </MiniChainCore>
          );
        })}
      <StyledPlusIcon onClick={approve} />
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  height: 100vh;
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50px;
`;

const MiniChainCore = styled(ChainCore)<{ color: string }>`
  border: 2px solid #fff;
  width: 90px;
  height: 90px;
  margin-bottom: 60px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  ${PulsationCircle} {
    width: 80px;
    height: 80px;

    &:before {
      background-color: ${({ color }) => color};
    }

    &:after {
      background-color: ${({ color }) => color};
    }
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
