import compression from 'fastify-compress';
import fastify from 'fastify';
import helmet from 'fastify-helmet';

const TILE_WIDTH = process.env.NEXT_PUBLIC_TILE_WIDTH;
const TILE_HEIGHT = process.env.NEXT_PUBLIC_TILE_HEIGHT;

export const initServer = () => {
  const app = fastify({
    logger: true,
  });

  app.register(helmet);
  app.register(compression, { inflateIfDeflated: true, encodings: ['gzip', 'deflate'] });

  app.get('/api/colour/:hex', async (request, reply) => {
    const params = request.params as Record<string, string>;
    let hexCode = params.hex || '000000';

    reply.type('image/svg+xml').code(200);

    const svg = `<svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${TILE_WIDTH}"
      height="${TILE_HEIGHT}"
    >
      <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#${hexCode}"></ellipse>
    </svg>`;

    return svg;
  });

  return app;
};
