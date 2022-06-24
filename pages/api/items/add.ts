import { SignedPostPolicyV4Output } from '@google-cloud/storage';
import { NextApiResponse } from 'next';

import { connectToDatabase, documentToObject } from '../../../database';
import { ItemModel } from '../../../database/models/item';
import { bucket } from '../../../helpers/cloudStorage';
import { parseAddItemRequestData } from '../../../helpers/parsers/item';
import uid from '../../../helpers/uid';
import { withAuth } from '../../../helpers/withAuth';
import { withBody } from '../../../helpers/withBody';
import { AddItemResponseData, Item, ResponseData } from '../../../types';

const EXTENSION_REGEX = /(?:\.([^.]+))?$/;

export default withAuth(
  withBody(
    parseAddItemRequestData,
    async function handler(
      req,
      res: NextApiResponse<ResponseData<AddItemResponseData>>,
      { item: clientItem },
      session
    ) {
      try {
        await connectToDatabase();
        if (
          !session.user?.email ||
          session.user?.email !== clientItem.email ||
          !clientItem.images.every(
            (imageName) => !!EXTENSION_REGEX.exec(imageName)?.[1]
          )
        ) {
          return res.status(403).json({ success: false, error: 'Forbidden' });
        }
        const imagesUpload: SignedPostPolicyV4Output[] = [];
        clientItem.images = await Promise.all(
          clientItem.images.map(async () => {
            const imageName = uid();
            const file = bucket.file(imageName);
            const [response] = await file.generateSignedPostPolicyV4({
              expires: Date.now() + 1 * 60 * 1000, // 1 minute
              fields: { 'x-goog-meta-test': 'data' }
            });
            imagesUpload.push(response);
            return `${response.url}${imageName}`;
          })
        );
        const item = documentToObject<Item>(await ItemModel.create(clientItem));
        res.status(200).json({ success: true, data: { item, imagesUpload } });
      } catch (error) {
        res.status(500).json({ success: false, error: String(error) });
      }
    }
  )
);
