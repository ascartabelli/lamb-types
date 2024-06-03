declare module "lamb" {
    /* ------------------------- *
     * ***** UTILITY TYPES ***** *
     * ------------------------- */

    type AnyFunction<R = any> = (...args: any[]) => R;

    type Constructor<T> = abstract new (...args: any) => T;

    type FoldAccumulatorCallback<
        L extends ArrayLike<any>,
        R,
        I extends keyof L & number = any
    > = (result: R, current: L[I], idx: I, list: L) => R;

    type GetLastReturnType<Fns extends AnyFunction[]> = Fns extends [
        ...args: any[],
        (...lastArgs: any) => infer U
    ]
        ? U
        : never;

    type GetPath<
        S extends Record<PropertyKey, any>,
        P extends string,
        SEP extends string = "."
    > = P extends keyof S
        ? S[P]
        : P extends `${number}`
        ? S[number] | undefined
        : P extends `${infer Start}${SEP}${infer Rest}`
        ? GetPath<S[Start], Rest, SEP>
        : undefined;

    type ListIteratorCallback<
        L extends ArrayLike<any>,
        R,
        I extends keyof L & number = any
    > = (element: L[I], idx: I, list: L) => R;

    type ObjectIteratorCallback<
        S extends Record<string, any>,
        R,
        K extends keyof S & string = any
    > = (value: S[K], key: K, source: S) => R;

    type Ord = Number | number | String | string | Boolean | boolean | Date;

    /** @see https://dev.to/ecyrbe/how-to-use-advanced-typescript-to-define-a-pipe-function-381h  */
    type PipeArgs<
        Fns extends AnyFunction[],
        AccFns extends AnyFunction[] = []
    > = Fns extends [(...args: infer A) => infer B]
        ? [...AccFns, (...args: A) => B]
        : Fns extends [(...args: infer A) => any, ...infer Tail]
        ? Tail extends [(arg: infer B) => any, ...any[]]
            ? PipeArgs<Tail, [...AccFns, (...args: A) => B]>
            : AccFns
        : AccFns;

    type PipeArgsLastReturnType<
        Fns extends AnyFunction[],
        Else = never
    > = Fns extends [...any[], (...args: any[]) => infer R] ? R : Else;

    type Predicate<T, U extends T> = (v: T) => v is U;

    type ReduceAccumulatorCallback<
        T,
        L extends ArrayLike<T>,
        I extends keyof L & number = any
    > = (prev: T, current: L[I], idx: I, list: L) => T;

    type Sorter<T = any, IsDesc extends boolean = false> = {
        compare: (a: T, b: T) => number;
        isDescending: IsDesc;
    };

    type SorterComparer<T = any> = (a: T, b: T) => number;

    type SorterReader<T = any> = (value: T) => any;

    type UnaryFunction<A = any, B = any> = (v: A) => B;

    type __ = {};

    /* ------------------------- *
     * *****     ARRAY     ***** *
     * ------------------------- */

    function append<T>(value: T): (arrayLike: ArrayLike<T>) => Array<T>;

    function appendTo<T>(arrayLike: ArrayLike<T>, value: T): Array<T>;

    function contains<T>(value: T): (arrayLike: ArrayLike<T>) => boolean;

    function count<
        R extends string,
        L extends ArrayLike<any>,
        F extends ListIteratorCallback<L, R>
    >(arrayLike: L, iteratee: F): Record<R, number>;

    function countBy<
        R extends string,
        L extends ArrayLike<any>,
        F extends ListIteratorCallback<L, R>
    >(iteratee: F): (arrayLike: L) => Record<R, number>;

    function difference<T>(a: ArrayLike<T>, b: ArrayLike<T>): Array<T>;

    function drop(n: number): <T>(arrayLike: ArrayLike<T>) => Array<T>;

    function dropFrom<T>(arrayLike: ArrayLike<T>, n: number): Array<T>;

    function dropLastWhile<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => Array<T>;

    function dropWhile<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => Array<T>;

    function every<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => boolean;

    function everyIn<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): boolean;

    function filter<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): Array<T>;

    function filterWith<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => Array<T>;

    function find<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): T | undefined;

    function findIndex<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): number;

    function findIndexWhere<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => number;

    function findLast<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): T | undefined;

    function findLastIndex<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): number;

    function findLastIndexWhere<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => number;

    function findLastWhere<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => T | undefined;

    function findWhere<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => T | undefined;

    function flatMap<
        T extends any | any[],
        R,
        A extends Array<T>,
        F extends ListIteratorCallback<A, R>
    >(array: A, iteratee: F): Array<R>;

    function flatMapWith<
        T extends any | any[],
        R,
        A extends Array<T>,
        F extends ListIteratorCallback<A, R>
    >(iteratee: F): (array: A) => Array<R>;

    function flatten<T, U extends T | T[], A extends Array<U>>(
        array: A
    ): Array<T>;

    function forEach<T, L extends ArrayLike<T>>(
        arrayLike: L,
        iteratee: ListIteratorCallback<L, undefined>
    ): undefined;

    function getAt(
        index: number
    ): <T>(arrayLike: ArrayLike<T>) => T | undefined;

    function getIndex<T>(arrayLike: ArrayLike<T>, index: number): T | undefined;

    function group<
        T extends Record<string, any>,
        V extends T[keyof T],
        L extends ArrayLike<T>,
        F extends ListIteratorCallback<L, V | undefined>
    >(arrayLike: L, iteratee: F): Record<V | "undefined", Array<T>>;

    function groupBy<
        T extends Record<string, any>,
        V extends T[keyof T],
        L extends ArrayLike<T>,
        F extends ListIteratorCallback<L, V | undefined>
    >(iteratee: F): (arrayLike: L) => Record<V | "undefined", Array<T>>;

    function head<const L extends ArrayLike<any>>(
        arrayLike: L
    ): L["length"] extends 0 ? undefined : L[0];

    function index<
        T extends Record<string, any>,
        V extends T[keyof T],
        L extends ArrayLike<T>,
        F extends ListIteratorCallback<L, V | undefined>
    >(arrayLike: L, iteratee: F): Record<V | "undefined", T>;

    function indexBy<
        T extends Record<string, any>,
        V extends T[keyof T],
        L extends ArrayLike<T>,
        F extends ListIteratorCallback<L, V | undefined>
    >(iteratee: F): (arrayLike: L) => Record<V | "undefined", T>;

    function init<T>(arrayLike: ArrayLike<T>): Array<T>;

    function insert<T>(
        arrayLike: ArrayLike<T>,
        index: number,
        element: T
    ): Array<T>;

    function insertAt<T>(
        index: number,
        element: T
    ): (arrayLike: ArrayLike<T>) => Array<T>;

    function intersection<T>(a: ArrayLike<T>, b: ArrayLike<T>): Array<T>;

    function isIn<T>(arrayLike: ArrayLike<T>, value: T): boolean;

    function join<T>(arrayLike: ArrayLike<T>, separator: string): string;

    function joinWith(
        separator: string
    ): <T>(arrayLike: ArrayLike<T>) => string;

    function last<const L extends ArrayLike<any>>(
        arrayLike: L
    ): L["length"] extends 0 ? undefined : L[-1];

    function list<T>(...values: T[]): Array<T>;

    function map<T, L extends ArrayLike<T>, R>(
        arrayLike: L,
        iteratee: ListIteratorCallback<L, R>
    ): Array<R>;

    function mapWith<T, L extends ArrayLike<T>, R>(
        iteratee: ListIteratorCallback<L, R>
    ): (arrayLike: L) => Array<R>;

    function partition<T>(
        arrayLike: ArrayLike<T>,
        predicate: ListIteratorCallback<ArrayLike<T>, boolean>
    ): [Array<T>, Array<T>];

    function partitionWith<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => [Array<T>, Array<T>];

    function pluck<T, U extends Record<string, T>, K extends keyof U>(
        key: K
    ): (arrayLike: ArrayLike<U>) => Array<T>;

    function pluckFrom<T, U extends Record<string, T>, K extends keyof U>(
        arrayLike: ArrayLike<U>,
        key: K
    ): Array<T>;

    function pull<T, L extends ArrayLike<T>, V extends ArrayLike<T>>(
        values: V
    ): (arrayLike: L) => Array<T>;

    function pullFrom<T, L extends ArrayLike<T>, V extends ArrayLike<T>>(
        arrayLike: L,
        values: V
    ): Array<T>;

    function reduce<
        T,
        L extends ArrayLike<T>,
        Acc extends ReduceAccumulatorCallback<T, L>
    >(arrayLike: L, accumulator: Acc): T;
    function reduce<
        R,
        L extends ArrayLike<any>,
        Acc extends FoldAccumulatorCallback<L, R>
    >(arrayLike: L, accumulator: Acc, initialValue: R): R;

    function reduceRight<
        T,
        L extends ArrayLike<T>,
        Acc extends ReduceAccumulatorCallback<T, L>
    >(arrayLike: L, accumulator: Acc): T;
    function reduceRight<
        R,
        L extends ArrayLike<any>,
        Acc extends FoldAccumulatorCallback<L, R>
    >(arrayLike: L, accumulator: Acc, initialValue: R): R;

    function reduceRightWith<
        T,
        L extends ArrayLike<T>,
        Acc extends ReduceAccumulatorCallback<T, L>
    >(accumulator: Acc): (arrayLike: L) => T;
    function reduceRightWith<
        R,
        L extends ArrayLike<any>,
        Acc extends FoldAccumulatorCallback<L, R>
    >(accumulator: Acc, initialValue: R): (list: L) => R;

    function reduceWith<
        T,
        L extends ArrayLike<T>,
        Acc extends ReduceAccumulatorCallback<T, L>
    >(accumulator: Acc): (arrayLike: L) => T;
    function reduceWith<
        R,
        L extends ArrayLike<any>,
        Acc extends FoldAccumulatorCallback<L, R>
    >(accumulator: Acc, initialValue: R): (list: L) => R;

    function reverse<T, L extends ArrayLike<T>>(arrayLike: L): Array<T>;

    function rotate<T, L extends ArrayLike<T>>(
        arrayLike: L,
        amount: number
    ): Array<T>;

    function rotateBy<T, L extends ArrayLike<T>>(
        amount: number
    ): (arrayLike: L) => Array<T>;

    function setAt<T, L extends ArrayLike<T>>(
        index: number,
        value: T
    ): (arrayLike: L) => Array<T>;

    function setIndex<T, L extends ArrayLike<T>>(
        arrayLike: L,
        index: number,
        value: T
    ): Array<T>;

    function shallowFlatten<T, U extends T | T[]>(array: Array<U>): Array<U>;

    function slice<T>(
        arrayLike: ArrayLike<T>,
        start: number,
        end: number
    ): Array<T>;

    function sliceAt(
        start: number,
        end: number
    ): <T>(arrayLike: ArrayLike<T>) => Array<T>;

    function some<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => boolean;

    function someIn<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(arrayLike: L, predicate: P): boolean;

    function sort<
        T,
        L extends ArrayLike<T>,
        S extends Array<Sorter<T, boolean> | SorterReader<T>> = [
            Sorter<T, false>
        ]
    >(arrayLike: L, sorters?: S): Array<T>;

    function sortWith<
        T,
        L extends ArrayLike<T>,
        S extends Array<Sorter<T, boolean> | SorterReader<T>> = [
            Sorter<T, false>
        ]
    >(sorters?: S): (arrayLike: L) => Array<T>;

    function sortedInsert<
        T,
        L extends ArrayLike<T>,
        S extends Array<Sorter<T, boolean> | SorterReader<T>> = [
            Sorter<T, false>
        ]
    >(arrayLike: L, element: T, sorters?: S): Array<T>;

    function sorter<T, RD extends SorterReader<T> = (value: T) => T>(
        reader?: RD,
        comparer?: SorterComparer<T>
    ): Sorter<T, false>;

    function sorterDesc<T, RD extends SorterReader<T> = (value: T) => T>(
        reader?: RD,
        comparer?: SorterComparer<T>
    ): Sorter<T, true>;

    function symmetricDifference<T>(a: ArrayLike<T>, b: ArrayLike<T>): Array<T>;

    function tail<T>(arrayLike: ArrayLike<T>): Array<T>;

    function take<T>(amount: number): (arrayLike: ArrayLike<T>) => Array<T>;

    function takeFrom<T>(arrayLike: ArrayLike<T>, amount: number): Array<T>;

    function takeLastWhile<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => Array<T>;

    function takeWhile<
        T,
        L extends ArrayLike<T>,
        P extends ListIteratorCallback<L, boolean>
    >(predicate: P): (arrayLike: L) => Array<T>;

    function transpose<T>(arrayLike: ArrayLike<ArrayLike<T>>): Array<Array<T>>;

    function union<T, U>(a: ArrayLike<T>, b: ArrayLike<U>): Array<T | U>;

    function unionBy<T, U>(
        iteratee: ListIteratorCallback<Array<T | U>, any>
    ): (a: ArrayLike<T>, b: ArrayLike<U>) => Array<T | U>;

    function uniques<T>(arrayLike: ArrayLike<T>): Array<T>;

    function uniquesBy<
        T,
        L extends ArrayLike<T>,
        F extends ListIteratorCallback<L, any>
    >(iteratee: F): (arrayLike: L) => Array<T>;

    function updateAt<T, L extends ArrayLike<T>, I extends number & keyof L>(
        index: I,
        updater: UnaryFunction<T, T>
    ): (arrayLike: L) => Array<T>;

    function updateIndex<T, L extends ArrayLike<T>, I extends number & keyof L>(
        arrayLike: L,
        index: I,
        updater: UnaryFunction<T, T>
    ): Array<T>;

    function zip<T, U, L1 extends ArrayLike<T>, L2 extends ArrayLike<U>>(
        a: L1,
        b: L2
    ): Array<[L1[number], L2[number]]>;

    function zipWithIndex<T, L extends ArrayLike<T>>(
        arrayLike: L
    ): Array<[L[number], number & keyof L]>;

    /* ------------------------- *
     * *****   FUNCTION    ***** *
     * ------------------------- */

    function always<T>(value: T): (...args: unknown[]) => T;

    function application<F extends AnyFunction>(
        fn: F,
        args: Parameters<F>
    ): ReturnType<F>;

    function apply<F extends AnyFunction>(
        fn: F
    ): (args: Parameters<F>) => ReturnType<F>;

    function applyTo<F extends AnyFunction>(
        args: any[]
    ): (fn: F) => typeof args extends Parameters<F> ? ReturnType<F> : never;

    function binary<F extends AnyFunction>(
        fn: F
    ): F extends (...args: [infer A, infer B, ...any[]]) => infer R
        ? (a: A, b: B) => R
        : never;

    function collect<
        T,
        Args extends any[],
        Fns extends Array<(...args: Args) => T>
    >(functions: Fns): (...args: Args) => T[];

    function compose<A, B, C>(
        f: UnaryFunction<B, C>,
        g: UnaryFunction<A, B>
    ): (value: A) => C;
    function compose<A extends any[], B, C>(
        f: UnaryFunction<B, C>,
        g: (...args: A) => B
    ): (...values: A) => C;

    function identity<T>(value: T): T;

    function invokeOn<TG extends Object>(
        target: TG
    ): <M extends string>(
        method: M,
        ...args: any[]
    ) => M extends keyof TG
        ? TG[M] extends AnyFunction
            ? ReturnType<TG[M]>
            : never
        : undefined;

    function partial<Args extends (any | __)[], F extends AnyFunction>(
        fn: F,
        args: Args
    ): (...args: any[]) => ReturnType<F>;

    function partialRight<Args extends (any | __)[], F extends AnyFunction>(
        fn: F,
        args: Args
    ): (...args: any[]) => ReturnType<F>;

    function pipe(
        functions: []
    ): <Args extends any[]>(
        ...args: Args
    ) => Args["length"] extends 0 ? undefined : (typeof args)[0];
    function pipe<
        Fns extends AnyFunction[],
        Args extends Parameters<Fns[0]>,
        R extends PipeArgsLastReturnType<Fns, ReturnType<Fns[0]>>
    >(
        functions: PipeArgs<Fns> extends Fns ? Fns : PipeArgs<Fns>
    ): (...args: Args) => R;

    function unary<T, R>(fn: (a: T, ...args: any[]) => R): UnaryFunction<T, R>;

    /* ------------------------- *
     * *****     LOGIC     ***** *
     * ------------------------- */

    function adapter<T, Fns extends UnaryFunction<T, any>[]>(
        functions: Fns
    ): (
        value: T
    ) => Exclude<ReturnType<Fns[number]>, undefined> | GetLastReturnType<Fns>;

    function allOf<T, P extends (value: T) => boolean>(predicates: Array<P>): P;

    function anyOf<T, P extends (value: T) => boolean>(predicates: Array<P>): P;

    function areSame(a: any, b: any): boolean;

    function areSVZ(a: any, b: any): boolean;

    function casus<T, U, TT extends T>(
        predicate: Predicate<T, TT>,
        fn: UnaryFunction<TT, U>
    ): (value: TT) => U | undefined;
    function casus<T, U>(
        predicate: UnaryFunction<T, boolean>,
        fn: UnaryFunction<T, U>
    ): (value: T) => U | undefined;

    function condition<T, U extends T, TR, FR, P extends Predicate<T, U>>(
        predicate: P,
        trueFn: (value: U) => TR,
        falseFn: (value: Exclude<T, U>) => FR
    ): (value: T) => U extends T ? TR : FR;
    function condition<T, TR, FR, P extends UnaryFunction<T, boolean>>(
        predicate: P,
        trueFn: (value: T) => TR,
        falseFn: (value: T) => FR
    ): (value: T) => TR | FR;

    function gt(a: Ord, b: Ord): boolean;

    function gte(a: Ord, b: Ord): boolean;

    function is(a: any): (b: any) => boolean;

    function isGT(b: Ord): (a: Ord) => boolean;

    function isGTE(b: Ord): (a: Ord) => boolean;

    function isLT(b: Ord): (a: Ord) => boolean;

    function isLTE(b: Ord): (a: Ord) => boolean;

    function isSVZ(a: any): (b: any) => boolean;

    function lt(a: Ord, b: Ord): boolean;

    function lte(a: Ord, b: Ord): boolean;

    function not<T, U extends T, P extends Predicate<T, U>>(
        predicate: P
    ): (value: T) => value is Exclude<T, U>;
    function not<T, P extends UnaryFunction<T, boolean>>(
        predicate: P
    ): (value: T) => boolean;

    function unless<
        R,
        T,
        U extends T,
        P extends Predicate<T, U>,
        F extends UnaryFunction<Exclude<T, U>, R>
    >(predicate: P, fn: F): (value: T | U) => U extends T ? T : R;
    function unless<
        R,
        T,
        P extends UnaryFunction<T, boolean>,
        F extends UnaryFunction<T, R>
    >(predicate: P, fn: F): (value: T) => ReturnType<P> extends true ? T : R;

    function when<
        R,
        T,
        U extends T,
        P extends Predicate<T, U>,
        F extends UnaryFunction<Exclude<T, U>, R>
    >(predicate: P, fn: F): (value: T | U) => U extends T ? T : T;
    function when<
        R,
        T,
        P extends UnaryFunction<T, boolean>,
        F extends UnaryFunction<T, R>
    >(predicate: P, fn: F): (value: T) => ReturnType<P> extends true ? R : T;

    /* ------------------------- *
     * *****     MATH      ***** *
     * ------------------------- */

    function add(a: number): (b: number) => number;
    function add(a: bigint): (b: bigint) => bigint;

    function clamp(n: number, min: number, max: number): number;

    function clampWithin(min: number, max: number): (n: number) => number;

    function deduct(a: number): (b: number) => number;
    function deduct(a: bigint): (b: bigint) => bigint;

    function divide(a: number, b: number): number;
    function divide(a: bigint, b: bigint): bigint;

    function divideBy(b: number): (a: number) => number;
    function divideBy(b: bigint): (a: bigint) => bigint;

    function generate<T, U, N extends number>(
        start: T,
        len: N,
        iteratee: ListIteratorCallback<Array<T>, U>
    ): Array<U> & { length: N };

    function isFinite(value: number): boolean;

    function isInteger(value: any): boolean;

    function isSafeInteger(value: any): boolean;

    function mean(numbers: number[]): number;

    function median(numbers: number[]): number;
    function median(numbers: bigint[]): bigint;

    function modulo(a: number, b: number): number;

    function multiply(a: number, b: number): number;
    function multiply(a: bigint, b: bigint): bigint;

    function multiplyBy(b: number): (a: number) => number;
    function multiplyBy(b: bigint): (a: bigint) => bigint;

    function randomInt(min: number, max: number): number;

    function range(
        start: number,
        limit: number,
        step: number | undefined
    ): number[];

    function remainder(numbers: number[]): number;
    function remainder(numbers: bigint[]): bigint;

    function subtract(a: number, b: number): number;
    function subtract(a: bigint, b: bigint): bigint;

    function sum(a: number, b: number): number;
    function sum(a: bigint, b: bigint): bigint;

    /* ------------------------- *
     * *****    OBJECT     ***** *
     * ------------------------- */

    function enumerables<K extends PropertyKey, S extends Record<K, any>>(
        source: S
    ): Array<K>;

    function fromPairs<
        const PairsList extends ReadonlyArray<readonly [PropertyKey, any]>
    >(pairsList: PairsList): { [K in PairsList[number] as K[0]]: K[1] };

    function getIn<S extends Record<PropertyKey, any>, K extends string>(
        source: S,
        key: K
    ): K extends keyof S ? S[K] : undefined;

    function getKey<K extends string>(
        key: K
    ): <S extends Record<PropertyKey, any>>(
        source: S
    ) => K extends keyof S ? S[K] : undefined;

    function getPath<P extends string, SEP extends string>(
        path: P,
        separator?: SEP
    ): <S extends Record<PropertyKey, any>>(source: S) => GetPath<S, P, SEP>;

    function getPathIn<
        S extends Record<PropertyKey, any>,
        P extends string,
        SEP extends string
    >(source: S, path: P, separator?: SEP): GetPath<S, P, SEP>;

    function hasKeyValue<K extends PropertyKey, T, S extends Record<K, T>>(
        key: K,
        value: T
    ): (source: S) => boolean;

    function hasPathValue<T, S extends Record<PropertyKey, any>>(
        path: string,
        value: T
    ): (source: S) => boolean;

    function keys<S extends Record<string, any>, K extends keyof S>(
        source: S
    ): Array<K>;

    function keySatisfies<
        S extends Record<PropertyKey, any>,
        K extends keyof S,
        U extends S[K],
        P extends Predicate<S[K], U>
    >(predicate: P, key: K): (source: S) => boolean;
    function keySatisfies<
        S extends Record<PropertyKey, any>,
        K extends keyof S,
        P extends UnaryFunction<S[K], boolean>
    >(predicate: P, key: K): (source: S) => boolean;

    function mapValues<
        T,
        U,
        S extends Record<string, T>,
        F extends ObjectIteratorCallback<S, U>
    >(source: S, fn: F): Record<keyof S, U>;

    function mapValuesWith<
        T,
        U,
        S extends Record<string, T>,
        F extends ObjectIteratorCallback<S, U>
    >(fn: F): (source: S) => Record<keyof S, U>;

    function ownPairs<S extends Record<PropertyKey, any>>(
        source: S
    ): S extends Record<PropertyKey, never>
        ? []
        : Array<{ [K in keyof S]: [K, S[K]] }[keyof S]>;

    function ownValues<S extends Record<PropertyKey, any>>(
        source: S
    ): S extends Record<PropertyKey, never> ? [] : Array<S[keyof S]>;

    function pairs<S extends Record<PropertyKey, any>>(
        source: S
    ): S extends Record<PropertyKey, never>
        ? []
        : Array<{ [K in keyof S]: [K, S[K]] }[keyof S]>;

    function pick<S extends Record<string, any>, K extends string>(
        whitelist: K[]
    ): (source: S) => Pick<S, K>;

    function pickIf<
        S extends Record<string, any>,
        P extends ObjectIteratorCallback<S, boolean>
    >(predicate: P): (source: S) => Partial<S>;

    function pickIn<S extends Record<string, any>, K extends string>(
        source: S,
        whitelist: K[]
    ): Pick<S, K>;

    function rename<
        DK extends string,
        KM extends Record<string, DK>,
        S extends Record<string, any>
    >(
        keyMap: KM
    ): (source: S) => {
        [K in keyof S as K extends keyof KM ? KM[K] : K]: S[K];
    };

    function setIn<S extends Record<PropertyKey, any>, T, K extends string>(
        source: S,
        key: K,
        value: T
    ): S & { [k in K]: T };

    function setKey<S extends Record<PropertyKey, any>, T, K extends string>(
        key: K,
        value: T
    ): (source: S) => S & { [k in K]: T };

    function setPath(path: string, separator?: string): (source: any) => any;

    function setPathIn(
        source: any,
        path: string,
        value: any,
        separator?: string
    ): any;

    function skip<S extends Record<string, any>, K extends string>(
        blacklist: K[]
    ): (source: S) => Omit<S, K>;

    function skipIf<
        S extends Record<string, any>,
        P extends ObjectIteratorCallback<S, boolean>
    >(predicate: P): (source: S) => Partial<S>;

    function skipIn<S extends Record<string, any>, K extends string>(
        source: S,
        blacklist: K[]
    ): Omit<S, K>;

    function updateIn<
        S extends Record<PropertyKey, any>,
        K extends string,
        F extends UnaryFunction<S[K]>
    >(
        source: S,
        key: K,
        updater: F
    ): K extends keyof S ? S & { [k in K]: ReturnType<F> } : S;

    function updateKey<
        S extends Record<PropertyKey, any>,
        K extends string,
        F extends UnaryFunction<S[K]>
    >(
        key: K,
        updater: F
    ): (source: S) => K extends keyof S ? S & { [k in K]: ReturnType<F> } : S;

    function updatePath(
        path: string,
        updater: UnaryFunction<any, any>,
        separator?: string
    ): (source: any) => any;

    function updatePathIn(
        source: any,
        path: string,
        updater: UnaryFunction<any, any>,
        separator?: string
    ): any;

    function values<S extends Record<PropertyKey, any>>(
        source: S
    ): S extends Record<PropertyKey, never> ? [] : Array<S[keyof S]>;

    /* ------------------------- *
     * *****    STRING     ***** *
     * ------------------------- */

    function padLeft(source: string, char: string, len: number): string;

    function padRight(source: string, char: string, len: number): string;

    function repeat(source: string, times: number): string;

    function replace(
        needle: RegExp | string,
        sub: string | AnyFunction<string>
    ): (haystack: string) => string;

    function split(source: string, separator: string | RegExp): string[];

    function splitBy(separator: string | RegExp): (source: string) => string[];

    function testWith(pattern: RegExp): (source: string) => boolean;

    /* ------------------------- *
     * *****     TYPE      ***** *
     * ------------------------- */

    function isInstanceOf<T, U extends T>(
        ctor: Constructor<U>
    ): (source: T) => source is U;

    function isNil(value: any): value is null | undefined;

    function isNull(value: any): value is null;

    function isUndefined(value: any): value is undefined;

    function type(value: any): string;

    function isType<T, U extends T>(typeName: string): Predicate<T, U>;
    function isType(typeName: string): (source: any) => boolean;
}
