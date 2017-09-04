# Functions

## List functions

### Cons
Construct a list. Inspired by Lisp `cons`.
#### Type
```hs
[a] -> a -> [a]
```
#### Examples
Call                | Result
--------------------|--------------------
`[] 3 cons :`       | `[3]`
`[T, T] F cons :`   | `[T, T, F]`


### Replicate
Repeats an item n times.
#### Type
```hs
a -> Int -> [a]
```
#### Examples
Call                | Result
--------------------|--------------------
`'a' 3 replicate :` | `['a', 'a', 'a']`

### Reduce
#### Type
```hs
[a] -> (b -> a -> b) -> b -> b
```
#### Examples
Call                      | Result
--------------------------|--------------------
`[7, 31, 2] + 0 reduce :` | `40`

### Zip
#### Type
```hs
[a] -> [b] -> [(a, b)]
```
Note: Currently (a, b) is just a list [a, b], not a tuple. Tuples may be implemented in a later version.
#### Example
Call                         | Result
-----------------------------|--------------------
`[7, 31, 2] [T, T, F] zip :` | `[[7, T], [31, T], [2, F]]`

### Concat
Joins two lists.
#### Type
```hs
[a] -> [a] -> [a]
```
#### Example
Call                        | Result
----------------------------|--------------------
`[1, 1, 2] [3, 5] concat :` | `[1, 1, 2, 3, 5]`

### Split
Split a list into a pair of (first, rest), similar to Prolog's `[H|T]` or Haskell's `x:xs` pattern.
#### Type
```hs
[a] -> (a, [a])
```
#### Example
Call                 | Result
---------------------|--------------------
`[2, 44, 1] split :` | `[2, [44, 1]]`
`['a'] split :`      | `['a', []]`
#### Notes
This could be implemented with `[head, tail] into :` given Haskell-like `head` and `tail` functions 
(also called `first` and `rest` in some languages). This will be moved to an alias if those are
added.
#### Naming
In many languages `split` splits a string by a separator. If we need such a function, we could either
name it `splitBy`, or deprecate this function and use `[head, tail] into :`.

### Length
The length of a list (or string).
#### Type
```hs
[a] -> Int
```
#### Example
Call                  | Result
----------------------|--------------------
`[2, 44, 1] length :` | `3`
`[] length :`         | `0`
#### Naming
Could shorten to `len` following Python.

## Functional Functions

### Apply
Apply a function to a list (as it's arguments).
#### Type
```hs
(a, b, ...) -> (a -> b -> ... -> x) -> x
```
Note: The type of this doesn't fit very nicely into Hindley-Milner, since it requires heterogenous lists. We could also
limit it to something like `(a, b) -> (a -> b -> c) -> c`.
#### Example
Call              | Result
------------------|--------------------
`[1, 2] + eval :` | `3`

### Eval
Evalutes a list/tuple as a function. Where the last element in the list is a function that takes the others as arguments.
#### Type
```hs
(a, b, ..., (a -> b -> ... -> x)) -> x
```
Note: The type of this doesn't fit very nicely into Hindley-Milner, since it requires heterogenous lists. We could also
limit it to something like `(a, b, (a -> b -> c)) -> c`.
#### Example
Call               | Result
-------------------|--------------------
`[1, 2, +] eval :` | `3`
#### Notes
This function has been extremely useful for me, especially with `zip`, however, if it requires heterogenous lists,
or arbitrary length tuples, so may need to be deprecated if I later require lists to be heterogenous. 
Note also that `apply` is very similar, but takes the function and arguments as separate arguments.

### Flip
Reverses the order of the two parameters of a function. Does not apply the function.
#### Type
```hs
(a -> b -> c) -> (b -> a -> c)
```
#### Examples
Call                                   | Result
---------------------------------------|--------------------
`3 1 - flip : :`                       |`-2`
`[1, 2, 3] 2 ^ flip : partial : map :` |`[1, 4, 9]`  (Square each number)
#### Note
Very useful with partial, since it always "consumes" the first argument.

### Partial
Creates a new function with its first parameter given.
#### Type
```hs
a -> (a -> b -> ... -> x) -> (b -> ... -> x)
```
#### Examples
Call                          | Result
------------------------------|--------------------
`T F and partial : : `        | `F`  (Creating a not function)
`[3, 4] 1 + partial : map : ` | `[5, 6]`  (Mapping an increment function)

### Into
Applies a list of functions to a singe parameter.
#### Type
```hs
`a -> ((a -> b), (a -> c), ...)) -> (b, c, ...)`
```
Note: If lists are later made to be homogenous, the type would need to change to `a -> [(a -> b)] -> [b]`.
This would invalidate the 3rd example.
#### Examples
Call                                      | Result
------------------------------------------|--------------------
`T [id, id, not, id] into :`              |`[T, T, F, T]`
`3 [1 + partial :, 6 / partial :] into :` |`[4, 2]`
`['a', 'b', 'c'] [id, length] into :`     |`[['a', 'b', 'c'], 3]`

## Character functions
### Capitalize

## Mathematical functions
These are mostly obvious.
### Addition (`+`)
### Subtraction (`-`)
### Multiplication (`*`)
### Division (`/`)
### Exponentiation (`^`)
### Modulo (`%`)

## Logic Functions.
These are mostly obvious.
### And
### Or
### Not

## Other Functions
### Id
Returns its parameter.







