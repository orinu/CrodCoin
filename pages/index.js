import React, { useEffect } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";

const CampaignIndex = (props) => {
  const renderCampaign = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button floated="right" content="Create Campaign" icon="add" primary />
        {renderCampaign()}
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
