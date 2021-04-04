import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
    } catch (err) {
      setError(err.message);
    }
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
          <Button primary type="submit">
            Create!
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CampaignNew;
