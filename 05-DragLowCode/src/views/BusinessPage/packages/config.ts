const blocksTypes = ['text', 'button', 'input'] as const;
export type blocksType = typeof blocksTypes[number];
export type blocksItemType = {
  top: number;
  left: number;
  zIndex: number;
  type: blocksType;
};

export const config = {
  container: {
    width: '375',
    height: '667'
  },
  blocks: [
    { top: 100, left: 100, zIndex: 1, type: 'text' as const },
    { top: 200, left: 100, zIndex: 1, type: 'button' as const },
    { top: 300, left: 100, zIndex: 1, type: 'input' as const }
  ]
};
export type configType = typeof config;
