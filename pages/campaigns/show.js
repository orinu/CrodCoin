import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Card, Grid, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

const campaignShow = (props) => {
  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      aproversCount,
    } = props;

    const item = [
      {
        header: manager,
        meta: "Address of Mannager",
        description:
          "The mannager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
      },
      {
        header: aproversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign hs left to use",
      },
    ];

    return <Card.Group items={item} />;
  };

  return (
    <Layout>
      <h1>Campaign Show</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

campaignShow.getInitialProps = async (ctx) => {
  let campaign = Campaign(ctx.query.address);
  campaign = await campaign.methods.getSummary().call();
  return {
    address: ctx.query.address,
    minimumContribution: campaign[0],
    balance: campaign[1],
    requestsCount: campaign[2],
    aproversCount: campaign[3],
    manager: campaign[4],
  };
};

export default campaignShow;
