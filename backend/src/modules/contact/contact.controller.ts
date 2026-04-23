import { Request, Response } from 'express';
import Contact from './contact.model';
import asyncHandler from '../../utils/asyncHandler';

export const getContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await Contact.findOne();
  res.status(200).json({ success: true, data: contact });
});

export const updateContact = asyncHandler(async (req: Request, res: Response) => {
  let contact = await Contact.findOne();
  if (contact) {
    contact = await Contact.findByIdAndUpdate(contact._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    contact = await Contact.create(req.body);
  }
  res.status(200).json({ success: true, data: contact });
});
