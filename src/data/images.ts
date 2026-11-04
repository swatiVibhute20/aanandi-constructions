export function stock(photoId: string, width: number) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&auto=format&fit=crop&w=${width}&q=60`;
}

export function stockSet(photoId: string) {
  return {
    image: stock(photoId, 960),
    imageSrcSet: [480, 768, 1200]
      .map((width) => `${stock(photoId, width)} ${width}w`)
      .join(", "),
  };
}
