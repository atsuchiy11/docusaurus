def generator():
    yield 1
    yield 2
    yield 3
    return "ジェネレータ終わり"


gen = generator()
# print(next(gen))
# print(next(gen))
# print(next(gen))
# print(next(gen))

# for v in gen
#     print(v)

while True:
    try:
        print(next(gen))
    except StopIteration as err:
        print(err)
        break
