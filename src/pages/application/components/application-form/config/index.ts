export interface BaseTagOption {
  color: string;
}

export interface BaseScoreItem<BL, BS> extends BaseLevelScoreItem<BL, BS> { }

export interface BaseLevelScoreItem<L, S> {
  level: L;
  score: S;
  title: string;
}

export interface BaseTypeScoreItem<T, C> {
  type: T;
  title: string;
  children: C[];
}