def doSomething(x):
     return id(x)

y = 5
print(doSomething(y))
print(id(y))