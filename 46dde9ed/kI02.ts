import { Request, Response } from "express";
import getRandomNumber from "../services/getRandomNumber.js";

type nullOrNumber = null | number;

const randomNumberController = (req: Request, res: Response) => {
  try {
    // converting query param start & end to number
    let start: nullOrNumber = parseInt(req.query.start as string);
    let end: nullOrNumber = parseInt(req.query.end as string);

    start = Number.isInteger(start) ? start : null;
    end = Number.isInteger(end) ? end : null;

    // if start or end is not a valid integer then returning error
    if (start === null || end === null)
      return res
        .status(400)
        .send({ errMsg: "You didn't provided valid integer" });

    // generating random number & returning it to user
    let randomNumber = getRandomNumber(start, end);
    res.status(200).send({ data: { randomNumber } });
  } catch (err) {
    res.status(500).send({ errMsg: "Internal Server Error" });
  }
};

export default randomNumberController;
