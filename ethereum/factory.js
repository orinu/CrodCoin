import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instace = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x01E4cD93489d39B5b6afC05a92238316EB75FB37"
);

export default instace;
