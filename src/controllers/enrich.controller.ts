import { Enrichment } from '../api-enrichment';
import { categorize } from '../helpers';

let DB = [];

export class EnrichController {
  static async create(req, res) {
    try {
      const { email } = req.body;

      if (!email)
        return res
          .status(400)
          .json({ message: 'Email not found in the body request' });

      const userExist = DB.find((user) => user.email === email);

      if (userExist) {
        return res.status(200).json(userExist);
      }

      const domain = email.split('@').at(-1);

      const [userEnrichment, companyEnrichment] = await Promise.all([
        Enrichment.user(email),
        Enrichment.company(domain)
      ]);

      const category = categorize(
        userEnrichment?.data,
        companyEnrichment?.data
      );

      const enrichResponse = {
        email: userEnrichment?.data?.email || null,
        userName: userEnrichment?.data?.name || null,
        gender: userEnrichment?.data?.gender || null,
        companyName: companyEnrichment?.data?.name || null,
        category
      };

      if (category) {
        DB.push(enrichResponse);
      }

      res.status(200).json(enrichResponse);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async get(req, res) {
    const { email } = req.query;

    if (!email)
      return res
        .status(400)
        .json({ message: 'Email not found in the params request' });

    const user = DB.find((user) => user.email === email);

    res.status(200).json(user);
  }

  static async delete(req, res) {
    const { companyName } = req.params;

    if (!companyName)
      return res
        .status(400)
        .json({ message: 'companyName not found in the params request' });

    const filteredUsers = DB.filter((user) => user.companyName !== companyName);
    const countDeleted = DB.length - filteredUsers.length;

    DB = filteredUsers;

    console.log(DB);

    res.status(200).json({ deleted: countDeleted });
  }
}
