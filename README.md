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

# Install the packages
`npm install`

# Run dev copy
`npm run dev`

## View Project

Visit https://mosaic-generator.vercel.app/ to get a preview of the app
