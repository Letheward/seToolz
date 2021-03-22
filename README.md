# [Set Tools for NoCS](https://letheward.github.io/seToolz/)

## How To Use

Currently, there are many useful functions already written but don't have GUIs.

However, you can use them in the console:  
Hit `F12` or `Ctrl + Shift + I` in your browser.

Here are these functions:

- `play(speed)`:

    Play current set by given `speed` (positive float) by index in ascending order.
    
    If no argument is given, this will play at `speed = 1`.

    If set values are not in ascending order,  
    this will jump up an octave when a note is lower than the note before.

    Examples: 
    
    - `play(1.5)`
    - `play(12)`
    - `play()`

- `writeInput()`:

    Write input box with current set, exposed for debugging.

    But you can also use this to get rid of invalid and repeated values in your input.
    
    Example: 
    
    - Type in console:  
        `writeInput()` 
    
        Effect:  
        `0 foo 73 "bar" 4 4 7` => `0 4 7`

- `mirrorSet()`:

    Return the negative set of current set, reserve original order.

    Example: 
    
    - Type in console:  
        `mirrorSet()` 
    
        Effect:  
        `0 2 4 5 7 9 11` => `0 10 8 7 5 3 1`

- `sortSet()`:

    Sort current set in ascending order.

    Example:

    - Type in console:  
        `sortSet()` 
    
        Effect:  
        `8 3 9 5 6 2 0` => `0 2 3 5 6 8 9`

- `transposeSet(x)`:

    Transpose current set by amount `x` (integer).

    Examples:

    - Type in console:  
        `transposeSet(1)` 
    
        Effect:  
        `0 3 5 7 10` => `1 4 6 8 11`

    - Type in console:  
        `transposeSet(-3)` 
    
        Effect:  
        `3 5 8 11` => `0 2 5 8`

- `toRoot()`:

    Use first note in set as `0`.

    Example:
    
    - Type in console:  
        `toRoot()` 
    
        Effect:  
        `6 1 4 8 9 11` => `0 7 10 2 3 5`

- `shiftIndex(x)`:

    Shift all notes in set by given index amount `x` (integer).

    Examples:
    
    - Type in console:  
        `shiftIndex(1)` 
    
        Effect:  
        `0 2 4 5 7 9 11` => `2 4 5 7 9 11 0`

    - Type in console:  
        `shiftIndex(-1)` 
    
        Effect:  
        `0 2 4 5 7 9 11` => `11 0 2 4 5 7 9`

- `jumpIndex(x)`:

    Index transform using jump interval (not in musical meaning) `x` (positive integer).

    Example:
    
    - Type in console:  
        `jumpIndex(2)` 
    
        Effect:  
        `0 2 4 6 7 9 11` => `0 4 7 11 2 6 9`

- `toIndex(x)`:

    Use note at index `x` (integer) as `0`.

    Example:
    
    - Type in console:  
        `toIndex(1)` 
    
        Effect:  
        `0 2 4 5 7 9 11` => `0 2 3 5 7 9 10`

## Status

Still really early. This is enough for my personal use, so I will update only when I feel like it.

PRs and issues are welcome, though.

## License

This repository is dedicated to Public Domain, or under CC0.