import express, { NextFunction, Request, Response } from "express";

export const PrivateConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { credentials } = req.body;
};
