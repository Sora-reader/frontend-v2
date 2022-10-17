/** Determine if manga can be counted as "empty" or "not loaded"
 * @param value manga or it's id parameter */
import { MangaType } from '../types';
import { useMemo } from 'react';

export const useIsEmptyManga = (value: MangaType | number) =>
  useMemo(() => (Number.isInteger(value) ? !~value : !~(value as MangaType).id), [value]);

/** Determine if manga is partially parsed. Meaning there are still details to be parsed
 * @param value manda or it's id parameter */
export const useIsPartialManga = (value: MangaType) => useMemo(() => !value?.rssUrl, [value]);
