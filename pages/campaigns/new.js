import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <h1>Create a Campaign</h1>
        <Form onSubmit={submitHandler} error={!!error}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              value={minContribution}
              label="wei"
              labelPosition="right"
              onChange={(e) => setMinContribution(e.target.value)}
            />
          </Form.Field>
          <Message error header="Oops!" content={error} />
          <Button loading={loading} primary type="submit">
            Create!
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CampaignNew;
