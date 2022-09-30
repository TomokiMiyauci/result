# API

## Nomenclature

- Container is value-wrapped object. It has a type representing the container
  type.
- Ok container representing success. The type of the container is `ok`.
- Err container representing failure. The type of the container is `err`.
- Result container is a set of Ok container and Err container.

## Interface

A container is one that satisfies the following interfaces.

### Container

```ts
interface Container {
  /** The contained value. */
  value: unknown;

  /** The container type. */
  type: string;
}
```

### Ok container

```ts
interface OkContainer<T> {
  /** Ok container value. */
  value: T;

  /** Ok container type. */
  type: "ok";
}
```

### Err container

```ts
interface ErrContainer<E> {
  /** Err container value. */
  value: E;

  /** Err container type. */
  type: "err";
}
```

### Result container

```ts
type ResultContainer<T, E> = OkContainer<T> | ErrContainer<E>;
```

### Result constructor

```ts
interface ResultConstructor {
  /** Create a new {@link OkContainer}. */
  ok: <T>(value: T) => OkContainer<T>;

  /** Create a new {@link ErrContainer}. */
  err: <E>(value: E) => ErrContainer<E>;
}
```

### Result

The `Result` must implement the `ResultConstructor` and the `ResultContainer`.

```ts
type Result<T, E> = ResultContainer<T, E> & ResultConstructor;
```
