import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = (props) => {
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const campaign = Campaign(props.address);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });
      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
    setAmount("");
  };

  return (
    <Form onSubmit={submitHandler} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          labelPosition="right"
        />
        <Button primary loading={loading} style={{ marginTop: "10px" }}>
          Contribute
        </Button>
        <Message error header="Oops!" content={error} />
      </Form.Field>
    </Form>
  );
};

export default ContributeForm;
