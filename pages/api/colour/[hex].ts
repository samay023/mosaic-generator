import type { NextApiRequest, NextApiResponse } from 'next';
import { initServer } from '../../../server';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const app = initServer();
  await app.ready();
  app.server.emit('request', req, res);
}
