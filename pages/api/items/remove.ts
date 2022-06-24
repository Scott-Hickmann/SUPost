import { connectToDatabase } from '../../../database';
import { ItemModel } from '../../../database/models/item';
import { bucket } from '../../../helpers/cloudStorage';
import { parseRemoveItemRequestData } from '../../../helpers/parsers/item';
import { withAuth } from '../../../helpers/withAuth';
import { withBody } from '../../../helpers/withBody';

export default withAuth(
  withBody(
    parseRemoveItemRequestData,
    async function handler(req, res, { itemId }, session) {
      try {
        await connectToDatabase();
        const itemDoc = await ItemModel.findById(itemId);
        if (!itemDoc) {
          return res
            .status(404)
            .json({ success: false, error: 'Item not found' });
        }
        if (!session.user?.email || session.user?.email !== itemDoc.email) {
          return res.status(403).json({ success: false, error: 'Forbidden' });
        }
        await Promise.all(
          itemDoc.images.map(async (image) => {
            const imageName = image.split('/').pop();
            if (imageName) {
              await bucket.file(imageName).delete();
            }
          })
        );
        await itemDoc.delete();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false, error: String(error) });
      }
    }
  )
);
