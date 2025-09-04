export default class SvgConverter {
  static async svgToPng(
    svgElement: HTMLElement,
    width: number,
    height: number,
    scale: number = 1
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const svgClone = svgElement.cloneNode(true) as SVGElement;

      if (width) svgClone.setAttribute('width', width.toString());
      if (height) svgClone.setAttribute('height', height.toString());

      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      canvas.width = (width || svgElement.clientWidth) * scale;
      canvas.height = (height || svgElement.clientHeight) * scale;

      img.onload = () => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          URL.revokeObjectURL(url);
          resolve(blob);
        }, 'image/png');
      };

      img.onerror = reject;
      img.src = url;
    });
  }
}
