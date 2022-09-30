/** Container API. */
export interface Container {
  /** The contained value. */
  value: unknown;

  /** The container type. */
  type: string;
}

/** Ok container API. */
export interface OkContainer<T> extends Container {
  /** Ok container value. */
  value: T;

  /** Ok container type. */
  type: "ok";
}

/** Err container API. */
export interface ErrContainer<E> extends Container {
  /** Err container value. */
  value: E;

  /** Err container type. */
  type: "err";
}

/** Result container API. */
export type ResultContainer<T, E> = OkContainer<T> | ErrContainer<E>;

/** Result constructor. */
export interface ResultConstructor {
  /** Create a new {@link OkContainer}. */
  ok: <T>(value: T) => OkContainer<T>;

  /** Create a new {@link ErrContainer}. */
  err: <E>(value: E) => ErrContainer<E>;
}
