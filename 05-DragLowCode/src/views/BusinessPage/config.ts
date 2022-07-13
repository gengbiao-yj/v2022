const blocksTypes = ['text', 'button', 'input'] as const;
export type blocksItemType = {
  top: number;
  left: number;
  zIndex: number;
  type: typeof blocksTypes[number];
};

export const config = {
  container: {
    width: '1200',
    height: '1000'
  },
  blocks: [
    { top: 100, left: 100, zIndex: 1, type: 'text' as const },
    { top: 200, left: 100, zIndex: 1, type: 'button' as const },
    { top: 300, left: 100, zIndex: 1, type: 'input' as const }
  ]
};
export type configType = typeof config;
