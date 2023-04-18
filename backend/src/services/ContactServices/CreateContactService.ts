import AppError from "../../errors/AppError";
import Company from "../../models/Company";
import CompanyContact from "../../models/CompanyContact";
import Contact from "../../models/Contact";

interface ExtraInfo {
  name: string;
  value: string;
}

interface Request {
  name: string;
  number: string;
  email?: string;
  profilePicUrl?: string;
  extraInfo?: ExtraInfo[];
  companyId?: string;
}

const CreateContactService = async ({
  name,
  number,
  email = "",
  extraInfo = [],
  companyId
}: Request): Promise<Contact> => {
  const numberExists = await Contact.findOne({
    where: { number }
  });

  if (numberExists) {
    throw new AppError("ERR_DUPLICATED_CONTACT");
  }

  console.log(name, number, email, extraInfo, companyId);

  const contact = await Contact.create(
    {
      name,
      number,
      email,
      extraInfo,
    },
    {
      include: ["extraInfo"]
    }
  );

  await CompanyContact.create({
    contactId: contact.dataValues.id,
    companyId: companyId
  })

  // console.log()

  return contact;
};

export default CreateContactService;
