/** {@link Result} is a type that represents either success ({@link Ok}) or failure ({@link Err}). */
export type Result<T, E> = Ok<T> | Err<E>;
export const Result: ResultConstructor = {
  ok: (value) => new Ok(value),
  err: (value) => new Err(value),
};

/** {@link Result} constructor. */
export interface ResultConstructor {
  /** Create a new {@link Ok}. */
  ok: <T>(value: T) => Result<T, never>;

  /** Create a new {@link Err}. */
  err: <E>(value: E) => Result<never, E>;
}

interface ResultDefinition<T> {
  isOk: () => boolean;

  /** The contained value. */
  value: T;
}

/** Contains the success value. */
export class Ok<T> implements ResultDefinition<T> {
  /** The contained {@link Ok} value. */
  constructor(public value: T) {}

  /** Whether the container is {@link Ok} or {@link Err}. */
  isOk = (): this is Ok<T> => true;
}

/** Contains the error value. */
export class Err<E> implements ResultDefinition<E> {
  /** The contained {@link Err} value. */
  constructor(public value: E) {}

  /** Whether the container is {@link Err} or {@link Err}. */
  isOk = (): this is Ok<never> => false;
}
