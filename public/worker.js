const getAverageRgbFromImageData = ({ data }) => {
  let r = 0;
  let g = 0;
  let b = 0;

  for (let i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r, g, b };
};

const convertRgbToHex = ({ r, g, b }) => {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const getAverageHexCodeFromImageData = (imageData) => {
  const rgb = getAverageRgbFromImageData(imageData);
  return convertRgbToHex(rgb);
};

onmessage = function ({data: {tileImageDataForEachRow}}) {

  const averageHexColorCodesForAllRows = [];

  tileImageDataForEachRow.forEach((tileDataForEachRow) => {
    const averageHexColorCodesForEachRow = [];
    tileDataForEachRow.forEach((tileData) => {
      const averageRGB = getAverageRgbFromImageData(tileData.imageData);
      const hexColorCode = convertRgbToHex(averageRGB);
      averageHexColorCodesForEachRow.push({
        currentXAxis: tileData.currentXAxis,
        currentYAxis: tileData.currentYAxis,
        hexColorCode,
      });
    });
    averageHexColorCodesForAllRows.push(averageHexColorCodesForEachRow)
  });

  postMessage(averageHexColorCodesForAllRows);
};
