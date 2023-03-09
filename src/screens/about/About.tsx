import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { ReactComponent as Logo } from "@assets/images/logo-big.svg";
import { ReactComponent as Camelot } from "@assets/images/logocamelot.svg";
import { Layout } from "@components/Layout";

import "./about.scss";

const ButtonBet = styled.button`
  width: 200px;
  height: 50px;
  cursor: pointer;
  margin: 1em auto;
  background-color: ${({ theme }) => theme.colors.orange};
`;
export const About: React.FC = () => {
  return (
    <Layout>
      <div style={{ marginLeft: 200 }}>
        <div className="row">
          <div className="col-md-6">
            <div className={"title"}>NETFY. GAMEFI ON ARBITRUM</div>
            <div>
              Welcome to our gamefi website on Arbitrum! Here, players can
              simulate the operations of a network and earn tokens in real time.
              We also offer a chest-opening feature that allows players to use
              project tokens to unlock chests and receive exciting rewards. Join
              us now for a thrilling play-to-earn experience!
            </div>
          </div>
          <div className="d-flex col-md-6 justify-content-center align-items-center">
            <Logo />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className={"title"}>TOKENS</div>
            <div>
              $NET is the native token of Netfy. You&apos;ll be able to use it
              to play Netfy games, earn rewards, and buy special items from the
              pet store. $NET is listed on Camelot.
            </div>
            <div className={"d-flex justify-content-center align-items-center"}>
              <Link to={"/"}>
                <ButtonBet
                  className={"pixel-borders pixel-box--light"}
                  onClick={() => {}}
                >
                  BUY $NET
                </ButtonBet>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className={"title"}>ROLLING</div>
            <div>
              We want to create a sense of excitement and frenzy for players
              when they roll out great value items or chests.
            </div>
            <div className={"d-flex justify-content-center align-items-center"}>
              <ButtonBet
                className={"pixel-borders pixel-box--light"}
                disabled
                onClick={() => {}}
              >
                ROLL NOW
              </ButtonBet>
            </div>
          </div>
          <div className="col-md-4">
            <div className={"title"}>GAMEFI</div>
            <div>
              We want to reimagine a network and how it works, let's create more
              projects on it to earn lots of tokens.
            </div>
            <div className={"d-flex justify-content-center align-items-center"}>
              <Link to={"/game"}>
                <ButtonBet
                  className={"pixel-borders pixel-box--light"}
                  onClick={() => {}}
                >
                  PLAY NOW
                </ButtonBet>
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-md-12">
            <div className={"title"}>Partnered With</div>
          </div>
          <div className="col-md-12 mb-2 d-flex justify-content-center align-items-center">
            <Camelot width={"400px"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
