import { Sequelize, Op } from "sequelize";
import Contact from "../../models/Contact";
import ShowCompanyForContact from "../CompanyContactsServices/ShowCompanyForContact";
import Company from "../../models/Company";
import CompanyContact from "../../models/CompanyContact";

interface Request {
  searchParam?: string;
  pageNumber?: string;
}

interface Response {
  contacts: Contact[];
  count: number;
  hasMore: boolean;
}

const ListContactsService = async ({
  searchParam = "",
  pageNumber = "1"
}: Request): Promise<Response> => {
  const whereCondition = {
    [Op.or]: [
      {
        name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("Contact.name")),
          "LIKE",
          `%${searchParam.toLowerCase().trim()}%`
        )
      },
      { number: { [Op.like]: `%${searchParam.toLowerCase().trim()}%` } }
    ]
  };
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: contacts } = await Contact.findAndCountAll({
    where: whereCondition,
    include: [
      {
        model: Company,
        attributes: ["id", "name"]
      }
    ],
    limit,
    offset,
    order: [["name", "ASC"]]
  });

  // const contactsWithCompany = contacts.map(contact => {
  //   return {
  //     ...contact,
  //     company: ShowCompanyForContact(contact.dataValues.id).datavalues
  //   };
  //   // console.log(contact.dataValues)
  //   // console.log(ShowCompanyForContact(contact.dataValues.id))
  // });

  // console.log(contactsWithCompany);

  const hasMore = count > offset + contacts.length;

  return {
    contacts,
    count,
    hasMore
    // contactsWithCompany
  };
};

export default ListContactsService;
