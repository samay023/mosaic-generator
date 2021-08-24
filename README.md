## Next.js mosaic

The goal of this task is to implement the following flow in a Next.js application.

1. A user selects a local image file.
2. The app loads that image, divides the image into tiles, computes the average
   colour of each tile, fetches a tile from the server for that colour, and
   composites the results into a photomosaic of the original image.
3. The composited photomosaic should be displayed according to the following
   constraints:
   - tiles should be rendered a complete row at a time (a user should never
     see a row with some completed tiles and some incomplete)
   - the mosaic should be rendered from the top row to the bottom row.
4. The client app should make effective use of parallelism and asynchrony.

## Setup

### Prerequisites

- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)
- [Node.js 14.x](https://nodejs.org/en/) (Or LTS)

```bash
# ensure you have the prerequisites
# install
brew install node && brew install yarn

# OR update
brew update && brew upgrade && brew install yarn

# install dependencies
yarn install

# dev
yarn dev
```

## Skeleton

The project skeleton contains the following:

- A quick Next.js boilerplate with Tailwind
- A fastify server for serving the client app and the tile images.
- An api route (`/api/colour/hex`) serving an SVG mosaic tile for the desired colour. e.g, `/api/colour/F00F00`

_Note:_
The tile size should be configurable via the environment variables in .env.local, feel free to move it to a shared constant file if you prefer.

The project is already set up to include those in both the client and the server. The default size is 16x16.

You should:

- pretend you're submitting this as production-quality code for review; i.e.,
  - write effective comments;
  - make the code modular;
  - make the code testable;
- Browser APIs are sufficient for the exercise.
- use HTML5 features where appropriate;
- Allocate about ~3 hours to do the task.

You may:

- Use a caching strategy where appropriate;
- use any HTML5 feature supported by current Chrome (e.g., Promise, Worker);
- Be as creative as you like with the submission UI (file input, drag & drop,
  etc); however, it is not the focus of the task, a minimal UI is fine.

Have fun!
