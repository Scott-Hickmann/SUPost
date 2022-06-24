import { NextApiRequest, NextApiResponse } from 'next';

import { ResponseData, ResponseDataBase } from '../types';

export const withBody =
  <S, T extends ResponseDataBase, U = unknown>(
    parser: (value: unknown) => S | undefined,
    apiRoute: (
      req: NextApiRequest,
      res: NextApiResponse<ResponseData<T>>,
      data: S,
      metadata: U
    ) => void | Promise<void>
  ) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<T>>,
    metadata: U
  ): Promise<void> => {
    const data = parser(req.body);
    if (!data) {
      res.status(400).json({ success: false, error: 'Invalid data' });
      return;
    }
    return apiRoute(req, res, data, metadata);
  };
