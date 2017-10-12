"""
merge module

Functions for merging arrays by some key

>>> key([1,2,3], lambda x: x % 2)
([1, 2, 3], [1, 0, 1], {0: [1], 1: [0, 2]})
>>> a=key([[1, 'Jack'], [2, 'Joe']], lambda x: x[0])
>>> b=key([[1, 'C.'], [3, 'B.B.']], lambda x: x[0])
>>> c=key([['Johnson', 1], ['King', 3], ['Palmer', 2]], lambda x: x[1])
>>> merge(a,b,c)
[[[1, 'Jack'], [1, 'C.'], ['Johnson', 1]], [[2, 'Joe'], None, ['Palmer', 2]], [None, [3, 'B.B.'], ['King', 3]]]
"""

def key(xs, f):
    """
    >>> key([1,2,3], lambda x: x % 2)
    ([1, 2, 3], [1, 0, 1], {0: [1], 1: [0, 2]})
    """
    keys = [f(x) for x in xs]
    m = {}
    for (i,k) in enumerate(keys):
        if k not in m:
            m[k] = [i]
        else:
            m[k].append(i)
    return (xs, keys, m)

def _multiply(key, arrays, i):
    """
    >>> a=key([1,2,3], lambda x: x % 2) # ([1, 2, 3], [1, 0, 1], {0: [1], 1: [0, 2]})
    >>> b=key([4,5,6], lambda x: x % 2) # ([4, 5, 6], [0, 1, 0], {0: [0, 2], 1: [1]})
    >>> c=key([7,8,9], lambda x: (x+1) % 2) # ([7, 8, 9], [0, 1, 0], {0: [0, 2], 1: [1]})
    >>> _multiply(1, [a, b], 1)
    [[None, 1, 5], [None, 3, 5]]
    >>> _multiply(1, [b, c], 2)
    [[None, None, 5, 8]]
    >>> _multiply(1, [b, c], 0)
    [[5, 8]]
    """
    indexes = [m.get(key) for (xs,keys,m) in arrays]
    result = [[None]*i]
    for (i,ind) in enumerate(indexes):
        if ind is None:
            for r in result:
                r.append(None)
            continue
        rr = []
        for r in result:
            for j in ind:
                rr.append(r + [arrays[i][0][j]])
        result = rr
    return result

def merge(*arrays):
    """
    >>> merge(key([1,2,3], lambda x: 3-x), key([1,2,3], lambda x: x))
    [[1, 2], [2, 1], [3, None], [None, 3]]
    """
    result = []
    visited = {}
    for (i,(xs,keys,m)) in enumerate(arrays):
        for (x,k) in zip(xs,keys):
            if k in visited:
                continue
            visited[k] = True
            # собираем все соответствующие ключи
            result += _multiply(k, arrays[i:], i)
    return result
    
if __name__ == "__main__":
    import doctest
    doctest.testmod()
