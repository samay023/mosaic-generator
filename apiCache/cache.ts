export const APICacheForSVG = () => {
  const cache = new Map();

  const getSVGFromAPI = async (hexColorCode: string): Promise<string> => {
    if (cache.has(hexColorCode)) {
      return cache.get(hexColorCode);
    }

    const response = await fetch(`api/colour/${hexColorCode}`);
    const svg = await response.text();
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const svgBlobUrl = window.URL.createObjectURL(svgBlob);

    cache.set(hexColorCode, svgBlobUrl);

    return svgBlobUrl
  };

  return {
    getSVGFromAPI,
  };
};
