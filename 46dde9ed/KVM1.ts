const randomNumberController = (req: Request, res: Response) => {
  try {
    let start: nullOrNumber = parseInt(req.query.start as string);
    let end: nullOrNumber = parseInt(req.query.end as string);

    start = Number.isInteger(start) ? start : null;
    end = Number.isInteger(end) ? end : null;

    if (start === null || end === null)
      return res
        .status(400)
        .send({ errMsg: "You didn't provided valid integer" });

    return getRandomNumber(start, end);
  } catch (err) {
    res.status(500).send({ errMsg: "Internal Server Error" });
  }
};

export default randomNumberController;
