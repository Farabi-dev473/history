def doSomething(x):
     x += 1
     return id(x)

y = 5
print(doSomething(y))
print(id(y))