import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";

const CheckContactNumber = async (number: string): Promise<void> => {
  console.log("Number: " + number);
  const defaultWhatsapp = await GetDefaultWhatsApp();

  console.log("Default wpp: " + defaultWhatsapp);

  const wbot = getWbot(defaultWhatsapp.id);

  console.log("wppid: " + defaultWhatsapp.id);
  console.log("wbot: " + wbot);

  const validNumber: any = await wbot.getNumberId(`${number}@c.us`);
  console.log("Valid Number: " + validNumber);

  return validNumber.user;
};

export default CheckContactNumber;
