import { Request, Response } from "express";
import getRandomUserDetails from "../services/getRandomUserDetails.js";

const userController = (req: Request, res: Response) => {
  try {
    const { selectedProperties } = req.body;
    const eligiblePropties = [
      "firstName",
      "lastName",
      "email",
      "avatar",
      "age",
      "address",
    ];

    selectedProperties.forEach((property: string) => {
      if (!eligiblePropties.includes(property))
        res.status(400).send({
          errMsg: `We don't accept this property (${property}) in the request body`,
        });
    });

    res.status(200).send({ data: getRandomUserDetails(selectedProperties) });
  } catch (err) {
    return res.status(500).send({ errMsg: (err as Error).message });
  }
};

export default userController;
