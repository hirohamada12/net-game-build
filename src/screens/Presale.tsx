import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { ethers } from "ethers";

import { Layout } from "@components/Layout";
import { useContracts } from "@hooks";
import { BN } from "@utils/BN";
import { useAccount } from "@utils/metamask";

import "./Presale.scss";

const Title = styled.h3`
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.orange}; ;
`;

const Description = styled.p`
  text-align: center;
  max-width: 730px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 50%;
  margin-top: 10px;
  align-items: center;
`;
const Input = styled.input`
  width: 500px;
  height: 50px;
  padding: 0;
  margin: 10px;
  text-align: center;

  &.focus {
    border: none;
  }
`;
const ButtonBet = styled.button`
  width: 500px;
  height: 50px;
  cursor: pointer;
  margin: 1em auto;
  background-color: ${({ theme }) => theme.colors.orange};
`;
const Progress = styled.div`
  width: 500px;
`;
export const Presale = () => {
  const [currency, setCurrency] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [presaleInfo, setPresaleInfo] = useState({
    totalPurchased: 0,
    presaleMax: 0,
    isPublicStart: false,
    isClaimStart: false,
  });
  const contracts = useContracts();
  const account = useAccount();
  const handleChangeCurrency = ({ target }: any) => {
    setCurrency(target.value);
  };
  const init = async () => {
    const totalPurchased = BN.formatUnits(
      await contracts?.presaleContract?.totalPurchased(),
      18
    ).toNumber();
    const presaleMax = BN.formatUnits(
      await contracts?.presaleContract?.presaleMax(),
      18
    ).toNumber();
    const isPublicStart = await contracts?.presaleContract?.isPublicStart();
    const isClaimStart = await contracts?.presaleContract?.isClaimStart();
    setPresaleInfo({
      totalPurchased,
      presaleMax,
      isPublicStart,
      isClaimStart,
    });
  };
  useEffect(() => {
    init();
  }, []);

  const checkBeforeBuy = async () => {
    setLoading(true);
    const amountPurchased = BN.formatUnits(
      await contracts?.presaleContract?.amountPurchased(account),
      18
    ).toNumber();
    const maxPerWallet = BN.formatUnits(
      await contracts?.presaleContract?.maxPerWallet(),
      18
    ).toNumber();
    const totalPurchased = BN.formatUnits(
      await contracts?.presaleContract?.totalPurchased(),
      18
    ).toNumber();
    const presaleMax = BN.formatUnits(
      await contracts?.presaleContract?.presaleMax(),
      18
    ).toNumber();
    const isPublicStart = await contracts?.presaleContract?.isPublicStart();
    if (amountPurchased >= maxPerWallet) {
      toast.error("Over purchase limit");
      return false;
    }
    if (totalPurchased >= presaleMax) {
      toast.error("Tokens are sold out");
      return false;
    }
    if (!isPublicStart) {
      toast.error("The sale hasn't started yet, come back later");
      return false;
    }

    return true;
  };
  const handleClaimToken = async () => {
    const isClaimStart = await contracts?.presaleContract?.isClaimStart();
    if (isClaimStart) {
      const tx = await contracts?.presaleContract.claim();
      if (tx) {
        toast.success("Claim success, check your wallet");
      }
    } else {
      toast.error("The claim hasn't started yet, come back later");
    }
  };
  const handleBuyPresale = async () => {
    if (await checkBeforeBuy()) {
      try {
        const tx = await contracts?.presaleContract?.buyPresale({
          value: ethers.parseEther(currency),
        });
        tx.wait();
        if (tx) {
          toast.success(
            "Buy presale success you got:" +
              (Number(currency) * 5000).toString() +
              " NET"
          );
        } else {
          toast.error("Buy presale error");
        }
      } catch (e) {
        toast.error("Buy presale error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Root>
      <Container>
        <Layout>
          <Title>
            GET IN EARLY ON THE{" "}
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              NETFY.{" "}
            </span>
            PRESALE
          </Title>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Description>
              Netfy is the ultimate coin Play to Earn platform, and it
              couldn&apos;t be easier to get your hands on the tokenin our
              Presale. You can use USDC or ETH in your wallet to buy. After
              presale end, you&apos;ll be able to claim your purchased Netfy
              using claim page.
            </Description>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form>
              USDC Raised:100.000 USDC
              <Progress>
                <div className="progress">
                  <div
                    className="bar"
                    style={{
                      width: `${
                        (presaleInfo.totalPurchased / presaleInfo.presaleMax) *
                          100 ?? "0"
                      }%`,
                    }}
                  >
                    <p className="percent">
                      {(presaleInfo.totalPurchased / presaleInfo.presaleMax) *
                        100 ?? "0"}
                      %
                    </p>
                  </div>
                </div>
              </Progress>
              <Input
                className={"pixel-box--light"}
                placeholder={"Enter USDC"}
                value={currency}
                onChange={handleChangeCurrency}
                onKeyPress={(event) => {
                  if (!/[0-9\.]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <ButtonBet
                className={"pixel-borders pixel-box--light"}
                disabled={!presaleInfo.isPublicStart}
                onClick={handleBuyPresale}
              >
                {isLoading ? (
                  <div className={"loading"}>
                    <span>Loading</span>
                  </div>
                ) : (
                  "BUY"
                )}
              </ButtonBet>
              <ButtonBet
                className={"pixel-borders pixel-box--light"}
                disabled={!presaleInfo.isClaimStart}
                onClick={handleClaimToken}
              >
                CLAIM TOKEN
              </ButtonBet>
            </Form>
          </div>
        </Layout>
      </Container>
    </Root>
  );
};
const Root = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
