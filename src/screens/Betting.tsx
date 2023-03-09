import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

import { ReactComponent as ChestImg } from "@assets/bet/chest.svg";
import { ReactComponent as ChestHidden } from "@assets/bet/chestearn.svg";
import { Layout } from "@components/Layout";
import { HIDEN_CHEST_REWARD } from "@src/constants";

const ContainerBet = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`;
const Chest = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  flex: 1;
  width: 50%;
  margin-left: -350px !important;
  margin-top: 80px;
  align-items: center;
`;
const Input = styled.input`
  width: 500px;
  height: 40px;
  padding: 0;
  margin: 10px;
  text-align: center;
`;
const ButtonBet = styled.button`
  width: 500px;
  height: 40px;
  cursor: pointer;
`;
const HidenChest = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 20px;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-grow: 1;
  text-align: left;
  flex-direction: column;
  margin: auto 40px;
  gap: 8px;
`;
const Title = styled.h3`
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.orange}; ;
`;

const Betting = () => {
  const [currencyBet, setCurrencyBet] = useState<number>();

  const handleBetting = () => {
    toast.success("Bet success with " + currencyBet + " NET");
  };
  const handleChangeCurrency = ({ target }: any) => {
    setCurrencyBet(target.value);
  };
  console.log(currencyBet);
  return (
    <Layout>
      <div
        style={{
          border: 1,
          borderColor: "white",
          borderStyle: "dashed",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Title>Rolling Chest</Title>
        <HidenChest>
          {HIDEN_CHEST_REWARD.map((item, index) => {
            return (
              <div
                key={"hidden_" + index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChestHidden />
                <ContentBlock key={"hidden_" + index}>
                  <span>{item.name}</span>
                  <span style={{ fontSize: "12px" }}>Earn: $$$$ NET</span>
                  <span style={{ fontSize: "12px" }}>Ratio: {item.ratio}</span>
                </ContentBlock>
              </div>
            );
          })}
        </HidenChest>
      </div>
      <ContainerBet>
        <Chest>
          <ChestImg />
        </Chest>
        <Form>
          <Title>Rolling Chest is Comming soon ...</Title>
          {/*<Input*/}
          {/*  inputMode={"numeric"}*/}
          {/*  onChange={handleChangeCurrency}*/}
          {/*  onKeyPress={(event) => {*/}
          {/*    if (!/[0-9]/.test(event.key)) {*/}
          {/*      event.preventDefault();*/}
          {/*    }*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<ButtonBet onClick={handleBetting}>Bet</ButtonBet>*/}
        </Form>
      </ContainerBet>
    </Layout>
  );
};

export default Betting;
