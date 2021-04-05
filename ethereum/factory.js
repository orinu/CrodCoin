import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instace = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x70b95029030907a0139D99b4FD7725705f708462"
);

export default instace;
