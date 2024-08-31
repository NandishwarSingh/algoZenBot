
const quizQuestions = [
{
    question: "How do you declare a variable in Python?",
    options: ["1. var x = 10", "2. let x := 10", "3. x = 10", "4. const x => 10"],
    answer: "3"
  },
  {
    question: "Which method is used to add an element to a list in Python?",
    options: ["1. list.add()", "2. list.append()", "3. list.insert()", "4. list.push()"],
    answer: "2"
  },
  {
    question: "How do you define a function in Python?",
    options: ["1. def my_function():", "2. function my_function():", "3. func my_function():", "4. def my_function{}"],
    answer: "1"
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    options: ["1. **", "2. ^", "3. **=", "4. ^="],
    answer: "1"
  },
  {
    question: "What is the syntax for a conditional statement in Python?",
    options: ["1. if condition:", "2. condition if:", "3. if (condition):", "4. if condition then:"],
    answer: "1"
  },
  {
    question: "How do you create a class in Python?",
    options: ["1. class MyClass:", "2. create class MyClass:", "3. def MyClass:", "4. class MyClass {}"],
    answer: "1"
  },
  {
    question: "Which of the following is used to handle exceptions in Python?",
    options: ["1. try-catch", "2. try-except", "3. catch", "4. except-try"],
    answer: "2"
  },
  {
    question: "How do you comment a single line in Python?",
    options: ["1. // comment", "2. <!-- comment -->", "3. # comment", "4. /* comment */"],
    answer: "3"
  },
  {
    question: "How do you iterate over a list in Python?",
    options: ["1. for item in list:", "2. foreach item in list:", "3. while item in list:", "4. iterate item in list:"],
    answer: "1"
  },
  {
    question: "What is the correct way to open a file for reading in Python?",
    options: ["1. open('file.txt', 'r')", "2. open('file.txt', 'read')", "3. open('file.txt')", "4. open('file.txt', 'open')"],
    answer: "1"
  },
  {
    question: "How do you check if a key exists in a dictionary in Python?",
    options: ["1. key in dict", "2. dict.has_key(key)", "3. dict.contains(key)", "4. key.exists(dict)"],
    answer: "1"
  },
  {
    question: "Which method is used to sort a list in Python?",
    options: ["1. list.sort()", "2. list.order()", "3. list.arrange()", "4. list.sorted()"],
    answer: "1"
  },
  {
    question: "How do you remove an element from a set in Python?",
    options: ["1. set.remove()", "2. set.discard()", "3. set.delete()", "4. set.pop()"],
    answer: "1"
  },
  {
    question: "What is the output of `print(2 * 3 ** 2)` in Python?",
    options: ["1. 18", "2. 36", "3. 12", "4. 21"],
    answer: "1"
  },
  {
    question: "How do you concatenate two strings in Python?",
    options: ["1. str1 + str2", "2. str1.concat(str2)", "3. str1.append(str2)", "4. str1.combine(str2)"],
    answer: "1"
  },
  {
    question: "How do you convert a string to an integer in Python?",
    options: ["1. int(str)", "2. str.toInt()", "3. parseInt(str)", "4. convert(str, int)"],
    answer: "1"
  },
  {
    question: "What is the default value of the `sep` parameter in the `print()` function?",
    options: ["1. ' '", "2. ''", "3. ','", "4. 'sep'"],
    answer: "1"
  },
  {
    question: "Which method is used to find the length of a list in Python?",
    options: ["1. len()", "2. length()", "3. count()", "4. size()"],
    answer: "1"
  },
  {
    question: "How do you slice a list in Python?",
    options: ["1. list[start:end]", "2. list[start to end]", "3. list[start:end+1]", "4. list[start:end-1]"],
    answer: "1"
  },
  {
    question: "Which built-in function is used to get the type of an object in Python?",
    options: ["1. type()", "2. getType()", "3. typeof()", "4. objectType()"],
    answer: "1"
  },
  {
    question: "How do you create a generator in Python?",
    options: ["1. def my_gen():", "2. my_gen = generator()", "3. def my_gen(): yield", "4. my_gen = gen()"],
    answer: "3"
  },
  {
    question: "Which of the following is an immutable data type in Python?",
    options: ["1. list", "2. dict", "3. set", "4. tuple"],
    answer: "4"
  },
  {
    question: "How do you handle multiple exceptions in a single `except` block?",
    options: ["1. except (Exception1, Exception2):", "2. except Exception1 or Exception2:", "3. except (Exception1 | Exception2):", "4. except [Exception1, Exception2]:"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `pass` statement in Python?",
    options: ["1. To skip a block of code", "2. To terminate a loop", "3. To handle an exception", "4. To exit a function"],
    answer: "1"
  },
  {
    question: "How do you use list comprehensions in Python?",
    options: ["1. [expression for item in iterable]", "2. [expression while condition]", "3. list(expression for item in iterable)", "4. list(expression if condition)"],
    answer: "1"
  },
  {
    question: "What is the output of `print('Hello' * 3)` in Python?",
    options: ["1. HelloHelloHello", "2. Hello 3", "3. HelloHello HelloHello Hello", "4. Hello * 3"],
    answer: "1"
  },
  {
    question: "Which method is used to strip whitespace from the beginning and end of a string in Python?",
    options: ["1. strip()", "2. trim()", "3. remove()", "4. clean()"],
    answer: "1"
  },
  {
    question: "How do you create a set in Python?",
    options: ["1. set()", "2. {}()", "3. create set()", "4. []()"],
    answer: "1"
  },
  {
    question: "Which of the following is not a valid way to create a dictionary in Python?",
    options: ["1. dict()", "2. {}", "3. dict(key1=value1, key2=value2)", "4. create_dict(key1=value1, key2=value2)"],
    answer: "4"
  },
  {
    question: "What is the correct way to write a `while` loop in Python?",
    options: ["1. while condition:", "2. while (condition):", "3. loop while condition:", "4. while condition do:"],
    answer: "1"
  },
  {
    question: "How do you access elements of a tuple in Python?",
    options: ["1. tuple[index]", "2. tuple.get(index)", "3. tuple[index+1]", "4. tuple.at(index)"],
    answer: "1"
  },
  {
    question: "Which function is used to find the maximum value in a list in Python?",
    options: ["1. max()", "2. maximum()", "3. highest()", "4. largest()"],
    answer: "1"
  },
  {
    question: "How do you merge two dictionaries in Python?",
    options: ["1. dict1.update(dict2)", "2. dict1.merge(dict2)", "3. dict1 + dict2", "4. dict1.concat(dict2)"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `__init__` method in Python classes?",
    options: ["1. To initialize an instance", "2. To finalize a class", "3. To declare class methods", "4. To create class attributes"],
    answer: "1"
  },
  {
    question: "Which operator is used to check if two values are not equal in Python?",
    options: ["1. !=", "2. not==", "3. =!", "4. <=>"],
    answer: "1"
  },
  {
    question: "How do you create a virtual environment in Python?",
    options: ["1. python -m venv env", "2. python create venv env", "3. python env create", "4. python venv -create env"],
    answer: "1"
  },
  {
    question: "Which method is used to get a substring in Python?",
    options: ["1. string[start:end]", "2. string.slice(start, end)", "3. string.substring(start, end)", "4. string.substr(start, end)"],
    answer: "1"
  },
  {
    question: "How do you check the type of a variable in Python?",
    options: ["1. type(variable)", "2. variable.type()", "3. check_type(variable)", "4. variable.getType()"],
    answer: "1"
  },
  {
    question: "What is the default value of the `end` parameter in the `print()` function?",
    options: ["1. ''", "2. ' '", "3. '\\n'", "4. None"],
    answer: "3"
  },
  {
    question: "Which of the following is a valid list comprehension?",
    options: ["1. [x for x in range(5)]", "2. [for x in range(5) x]", "3. list(x for x in range(5))", "4. [x in range(5) for x]"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `self` keyword in Python?",
    options: ["1. To refer to instance variables", "2. To create a new instance", "3. To define a class", "4. To access class methods"],
    answer: "1"
  },
  {
    question: "How do you remove leading and trailing spaces from a string in Python?",
    options: ["1. str.strip()", "2. str.trim()", "3. str.clean()", "4. str.remove()"],
    answer: "1"
  },
  {
    question: "What is the syntax for a `for` loop in Python?",
    options: ["1. for item in iterable:", "2. foreach item in iterable:", "3. for (item in iterable):", "4. loop item in iterable:"],
    answer: "1"
  },
  {
    question: "How do you read a file line by line in Python?",
    options: ["1. for line in file:", "2. file.readlines()", "3. file.each_line()", "4. file.get_lines()"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `with` statement in Python?",
    options: ["1. To simplify exception handling", "2. To manage resources", "3. To create context managers", "4. To handle file operations"],
    answer: "2"
  },
  {
    question: "How do you create a new dictionary in Python?",
    options: ["1. dict = {}", "2. dict = dict()", "3. dict = new dict", "4. dict = create_dict()"],
    answer: "1"
  },
  {
    question: "Which method is used to remove all elements from a list in Python?",
    options: ["1. list.clear()", "2. list.remove()", "3. list.delete()", "4. list.empty()"],
    answer: "1"
  },
  {
    question: "How do you get the keys of a dictionary in Python?",
    options: ["1. dict.keys()", "2. dict.get_keys()", "3. dict.list_keys()", "4. dict.all_keys()"],
    answer: "1"
  },
  {
    question: "What does the `range()` function do in Python?",
    options: ["1. Generates a sequence of numbers", "2. Defines a range of values", "3. Creates a list of integers", "4. Calculates the range of a list"],
    answer: "1"
  },
  {
    question: "How do you check if a list is empty in Python?",
    options: ["1. len(list) == 0", "2. list.empty()", "3. list.size() == 0", "4. list.is_empty()"],
    answer: "1"
  },
  {
    question: "Which operator is used to check membership in a list in Python?",
    options: ["1. in", "2. contains", "3. has", "4. includes"],
    answer: "1"
  },
  {
    question: "What is the output of `print([1, 2, 3] * 2)` in Python?",
    options: ["1. [1, 2, 3, 1, 2, 3]", "2. [2, 4, 6]", "3. [1, 2, 3, 2, 4, 6]", "4. [1, 2, 3, 2, 1, 3]"],
    answer: "1"
  },
  {
    question: "How do you access the value associated with a key in a dictionary?",
    options: ["1. dict[key]", "2. dict.get(key)", "3. dict[key]()", "4. dict.find(key)"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `__str__` method in Python classes?",
    options: ["1. To return a string representation of an object", "2. To initialize the object", "3. To create a string attribute", "4. To convert an object to a string"],
    answer: "1"
  },
  {
    question: "How do you sort a dictionary by its values in Python?",
    options: ["1. sorted(dict.items(), key=lambda x: x[1])", "2. dict.sort_values()", "3. dict.sorted_by_values()", "4. dict.items().sort()"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `__repr__` method in Python classes?",
    options: ["1. To return a string that can be used to recreate the object", "2. To provide a human-readable string representation", "3. To initialize class attributes", "4. To represent the class type"],
    answer: "1"
  },
  {
    question: "Which method is used to find the index of an item in a list?",
    options: ["1. list.index(item)", "2. list.find(item)", "3. list.get_index(item)", "4. list.locate(item)"],
    answer: "1"
  },
  {
    question: "How do you handle multiple return values from a function in Python?",
    options: ["1. Return a tuple", "2. Return a list", "3. Return a dictionary", "4. Return multiple values separated by commas"],
    answer: "1"
  },
  {
    question: "How do you create a new set from an existing list in Python?",
    options: ["1. set(list)", "2. list.to_set()", "3. set.create(list)", "4. new_set(list)"],
    answer: "1"
  },
  {
    question: "Which method is used to add a key-value pair to a dictionary in Python?",
    options: ["1. dict[key] = value", "2. dict.add(key, value)", "3. dict.insert(key, value)", "4. dict.append(key, value)"],
    answer: "1"
  },
  {
    question: "What is the output of `print('Hello'.capitalize())` in Python?",
    options: ["1. Hello", "2. hello", "3. HELLO", "4. hELLO"],
    answer: "1"
  },
  {
    question: "How do you create a list of squares of numbers from 0 to 4 in Python?",
    options: ["1. [x**2 for x in range(5)]", "2. [square(x) for x in range(5)]", "3. list(x^2 for x in range(5))", "4. [x^2 in range(5)]"],
    answer: "1"
  },
  {
    question: "Which function is used to get the absolute value in Python?",
    options: ["1. abs()", "2. absolute()", "3. val()", "4. absolute_value()"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `else` clause in a `try` block?",
    options: ["1. To execute code if no exceptions occur", "2. To execute code if an exception occurs", "3. To handle specific exceptions", "4. To finalize the `try` block"],
    answer: "1"
  },
  {
    question: "How do you open a file for writing in Python?",
    options: ["1. open('file.txt', 'w')", "2. open('file.txt', 'write')", "3. open('file.txt', 'a')", "4. open('file.txt', 'r+')"],
    answer: "1"
  },
  {
    question: "Which method is used to split a string into a list of substrings?",
    options: ["1. str.split()", "2. str.divide()", "3. str.cut()", "4. str.break()"],
    answer: "1"
  },
  {
    question: "How do you find the length of a string in Python?",
    options: ["1. len(str)", "2. str.length()", "3. str.size()", "4. str.count()"],
    answer: "1"
  },
  {
    question: "Which of the following is the correct syntax for defining a class method?",
    options: ["1. @classmethod\ndef method(cls):", "2. def method(cls):\n@classmethod", "3. def method(cls) @classmethod:", "4. @staticmethod\ndef method(cls):"],
    answer: "1"
  },
  {
    question: "How do you concatenate two lists in Python?",
    options: ["1. list1 + list2", "2. list1.append(list2)", "3. list1.merge(list2)", "4. list1.concat(list2)"],
    answer: "1"
  },
  {
    question: "How do you create a dictionary comprehension in Python?",
    options: ["1. {key: value for key, value in iterable}", "2. dict(key, value for key, value in iterable)", "3. {key: value if condition for key, value in iterable}", "4. dict.create(key: value for key, value)"],
    answer: "1"
  },
  {
    question: "Which of the following is used to return a new string with all occurrences of a substring replaced?",
    options: ["1. str.replace()", "2. str.replace_all()", "3. str.substitute()", "4. str.change()"],
    answer: "1"
  },
  {
    question: "What does the `enumerate()` function do in Python?",
    options: ["1. Adds a counter to an iterable", "2. Sorts an iterable", "3. Creates an iterable", "4. Filters an iterable"],
    answer: "1"
  },
  {
    question: "How do you create a generator expression in Python?",
    options: ["1. (expression for item in iterable)", "2. [expression for item in iterable]", "3. {expression for item in iterable}", "4. generator(expression for item in iterable)"],
    answer: "1"
  },
  {
    question: "Which method is used to get the last item of a list in Python?",
    options: ["1. list[-1]", "2. list.last()", "3. list.get_last()", "4. list[-1]()"],
    answer: "1"
  },
  {
    question: "How do you sort a list of tuples by the second element in Python?",
    options: ["1. sorted(list, key=lambda x: x[1])", "2. list.sort(key=lambda x: x[1])", "3. sorted(list, by=lambda x: x[1])", "4. list.sort(by=lambda x: x[1])"],
    answer: "1"
  },
  {
    question: "How do you check if a number is even in Python?",
    options: ["1. number % 2 == 0", "2. number.is_even()", "3. number.check_even()", "4. number % 2 != 1"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `__del__` method in Python classes?",
    options: ["1. To define cleanup actions when an object is deleted", "2. To initialize the object", "3. To represent the object", "4. To finalize class attributes"],
    answer: "1"
  },
  {
    question: "How do you create a named tuple in Python?",
    options: ["1. from collections import namedtuple; namedtuple('Name', 'fields')", "2. namedtuple('Name', fields)", "3. tuple(name='Name', fields='fields')", "4. create_namedtuple('Name', 'fields')"],
    answer: "1"
  },
  {
    question: "Which of the following methods is used to add an element to a set in Python?",
    options: ["1. set.add()", "2. set.append()", "3. set.insert()", "4. set.include()"],
    answer: "1"
  },
  {
    question: "What is the output of `print(bool(0))` in Python?",
    options: ["1. False", "2. True", "3. 0", "4. None"],
    answer: "1"
  },
  {
    question: "How do you get a random number between 1 and 10 in Python?",
    options: ["1. import random; random.randint(1, 10)", "2. import random; random.random(1, 10)", "3. import random; random.range(1, 10)", "4. random(1, 10)"],
    answer: "1"
  },
  {
    question: "Which of the following methods is used to get the current date and time in Python?",
    options: ["1. datetime.now()", "2. time.now()", "3. datetime.get_now()", "4. time.get_now()"],
    answer: "1"
  },
  {
    question: "What is the output of `print(10 // 3)` in Python?",
    options: ["1. 3", "2. 3.3333", "3. 3.0", "4. 4"],
    answer: "1"
  },
  {
    question: "How do you create a list of numbers from 0 to 9 in Python?",
    options: ["1. list(range(10))", "2. range(10).tolist()", "3. list.create(10)", "4. list(0, 10)"],
    answer: "1"
  },
  {
    question: "Which method is used to find the index of a substring in a string?",
    options: ["1. str.find()", "2. str.index()", "3. str.locate()", "4. str.search()"],
    answer: "1"
  },
  {
    question: "How do you check if a list contains a specific item in Python?",
    options: ["1. item in list", "2. list.has(item)", "3. list.contains(item)", "4. list.include(item)"],
    answer: "1"
  },
  {
    question: "How do you remove an item from a list by index?",
    options: ["1. list.pop(index)", "2. list.remove(index)", "3. list.delete(index)", "4. list.discard(index)"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `break` statement in a loop?",
    options: ["1. To exit the loop", "2. To continue to the next iteration", "3. To pause the loop", "4. To restart the loop"],
    answer: "1"
  },
  {
    question: "Which method is used to join a list of strings into a single string?",
    options: ["1. ''.join(list)", "2. list.join('')", "3. ''.combine(list)", "4. list.concat('')"],
    answer: "1"
  },
  {
    question: "How do you get the type of an object in Python?",
    options: ["1. type(object)", "2. object.type()", "3. getType(object)", "4. object.getType()"],
    answer: "1"
  },
  {
    question: "What is the output of `print('abc'.find('b'))` in Python?",
    options: ["1. 1", "2. 0", "3. -1", "4. None"],
    answer: "1"
  },
  {
    question: "How do you convert a list to a set in Python?",
    options: ["1. set(list)", "2. list.to_set()", "3. convert(list, set)", "4. new_set(list)"],
    answer: "1"
  },
  {
    question: "What does the `strip()` method do for strings?",
    options: ["1. Removes leading and trailing whitespace", "2. Removes all whitespace", "3. Removes leading whitespace only", "4. Removes trailing whitespace only"],
    answer: "1"
  },
  {
    question: "How do you get a slice of a list from index 2 to 5 in Python?",
    options: ["1. list[2:6]", "2. list[2, 5]", "3. list.slice(2, 5)", "4. list.get(2, 5)"],
    answer: "1"
  },
  {
    question: "Which of the following is the correct way to use a lambda function?",
    options: ["1. lambda x: x * 2", "2. lambda(x) => x * 2", "3. def lambda(x): return x * 2", "4. lambda x = x * 2"],
    answer: "1"
  },
  {
    question: "How do you create a tuple in Python?",
    options: ["1. (item1, item2)", "2. [item1, item2]", "3. tuple(item1, item2)", "4. tuple = (item1, item2)"],
    answer: "1"
  },
  {
    question: "What is the output of `print('Hello'.*3)` in Python?",
    options: ["1. Syntax Error", "2. HelloHelloHello", "3. Hello3", "4. 'Hello' multiplied by 3"],
    answer: "1"
  },
  {
    question: "How do you create a Python class that inherits from another class?",
    options: ["1. class Child(Parent):", "2. class Child extends Parent:", "3. class Child inherits Parent:", "4. class Child : Parent"],
    answer: "1"
  },
  {
    question: "What is the purpose of the `continue` statement in a loop?",
    options: ["1. To skip the rest of the current iteration and move to the next iteration", "2. To exit the loop", "3. To pause the loop", "4. To restart the loop"],
    answer: "1"
  },
  {
    question: "How do you import a module in Python?",
    options: ["1. import module_name", "2. include module_name", "3. require module_name", "4. use module_name"],
    answer: "1"
  }];

  export default quizQuestions;