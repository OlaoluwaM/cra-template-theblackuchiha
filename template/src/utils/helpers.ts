export function hexToRgb(hex: string, alpha = 1): string {
  const { r, g, b } = {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16),
  };
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rawDataType<T>(value: T): string {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1).toLowerCase();
}

type Filter<T> = T extends Record<string, unknown> | [] | '' ? null : T;

export function normalize<K>(input: K): Filter<K> {
  if (Array.isArray(input) && input.length === 0) return null;
  if (typeof input === 'string' && input === '') return null;
  if (typeof input === 'object' && Object.keys(input).length === 0) return null;
  return input as Filter<K>;
}
let a = normalize(9);
