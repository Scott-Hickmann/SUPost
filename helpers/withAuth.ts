import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { ResponseData, ResponseDataBase } from '../types';

export const withAuth =
  <T extends ResponseDataBase, U = unknown>(
    apiRoute: (
      req: NextApiRequest,
      res: NextApiResponse<ResponseData<T>>,
      session: Session,
      metadata: U
    ) => void | Promise<void>
  ) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<T>>,
    metadata: U
  ): Promise<void> => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    return apiRoute(req, res, session, metadata);
  };
