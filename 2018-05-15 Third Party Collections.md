
# Java has Streams. Do we need third-party collections?

Java 8 added Streams. Are competing collections libraries like Eclipse Collections, Trove, Guava, etc. effectively deprecated now?

I saw [this question on StackOverflow](https://stackoverflow.com/questions/49938832/did-eclipse-collections-get-deprecated-by-java-8), specifically about Eclipse Collections. Here is my answer.

Is there any reason to still use Eclipse Collections? Yes! Streams are a huge step forward, and a welcome improvement to Java. However, Eclipse Collections includes many features not yet in the JDK.

- Eager evaluation
- Efficient Maps and Sets
- Multimaps and Bags
- Immutable Collections
- Primitive Collections
- Hashing Strategies

# Eager Evaluation

Streams _always_ use lazy evaluation. We start a stream by calling `collection.stream()`, stack one or more lazy operations, and finish the stream by calling a method like `collect()`.

```java
Set<Person> people = ...;
Set<Address> addresses = people
    .stream()
    .map(Person::getAddress)
    .collect(Collectors.toSet());
```

With Eclipse Collections, you _may_ use lazy evaluation. Instead of `stream()` you’d call `asLazy()`.

```java
MutableSet<Person> people = ...;
MutableSet<Address> addresses = people
    .asLazy()
    .collect(Person::getAddress)
    .toSet();
```

Or you may use the eager api.

```java
MutableSet<Address> addresses = people.collect(Person::getAddress);
```

Lazy evaluation is great when your computation may short circuit, or when the result is reduced down to a primitive, like a boolean or count. Otherwise, there’s usually a performance penalty when using lazy evaluation, and the code winds up a lot longer.

# Efficient Maps and Sets

The JDK’s `HashMap` is implemented as a table of `Entry` objects, where each `Entry` wraps a key-value pair. These entries waste memory, and the extra hop can waste time too.

Eclipse Collections includes `UnifiedMap`, which uses 50% the memory on average.

The JDK’s `HashSet` is implemented by delegating to a `HashMap` and just ignoring the Map’s values, which is even more wasteful. Eclipse Collections includes `UnifiedSet`, which uses 25% the memory on average.

Trove, FastUtils, HPPC, and others have similar replacements for `HashMap` and `HashSet`.

These issues with `HashMap` and `HashSet` have been around since the collections library was added back in Java 1.2. They are unlikely ever to be fixed due to backwards compatibility concerns.

# Multimaps and Bags

Multimaps are like Maps where each key maps to _multiple_ values. Bags, aka multisets, are like Sets where each item is mapped to a count, or number of occurrences.

Guava popularized these types in Java. Keep in mind that Guava doesn’t implement replacements for built-in types. So Guava’s `HashMultimap` is backed by a `HashMap<K, HashSet<V>>` which wastes a lot of memory as we just learned.

Eclipse Collections includes iteration patterns like `groupBy()` which return efficient Multimaps. In this example `people` is a `MutableSet` so `groupBy()` returns a `MutableSetMultimap` (backed by a UnifiedMap of UnifiedSets).

```java
MutableSetMultimap<Color, Person> multimap =
    people.groupBy(Person::getFavoriteColor);
```

Java 8 added grouping but no multimaps.

```java
Map<Color, Set<Person>> map =
    people.stream().collect(Collectors.groupingBy(
        Person::getFavoriteColor,
        Collectors.toSet()));
```

A `Map` isn’t quite as convenient as a `Multimap`, because we have to always remember to deal with `null`. With Streams, we also have to remember to use the right collector to match the collection. If we had used the single-argument `groupingBy()` we would have returned a map of lists.

```java
Map<Color, List<Person>> map = people
    .stream()
    .collect(Collectors.groupingBy(Person::getFavoriteColor));
```

The same points apply to counting…

```java
Map<Color, Long> map =
    people.stream().collect(Collectors.groupingBy(
        Person::getFavoriteColor,
        Collectors.counting()));
```

…and to Bags

```java
MutableBag<Color> bag = people.countBy(Person::getFavoriteColor);
```

# Immutable Collections and Primitive Collections

Most third party collections libraries add immutable collections or primitive collections. Eclipse Collections adds both. The JDK has unmodifiable wrappers, but no immutable collections. Java 8 added primitive streams, but there’s no way to finish the stream by collecting into a primitive collection.

# Hashing Strategies

In relational databases, a table may have a primary key and additional unique indices, allowing lookups in different ways. Hash tables always perform lookups using equals and hashcode, which is like only allowing a primary key. This is where `HashingStrategy` comes in.

```java
public interface HashingStrategy<E>
{
    int computeHashCode(E object);
    boolean equals(E object1, E object2);
}
```

Eclipse Collections includes iteration patterns that work with HashingStrategies…

```java
MutableList<Person> people = ...;
MutableList<Person> res1 = people.distinct();
MutableList<Person> res2 = people.distinct(HashingStrategies.fromFunction(Person::getSystemId));
MutableList<Person> res3 = people.distinctBy(Person::getSystemId);
```

… and data structures that work with HashingStrategies.

```java
HashingStrategy<Person> strategy =
    HashingStrategies.fromFunction(Person::getSystemId);
MutableSet<Person> people =
    new UnifiedSetWithHashingStrategy<>(strategy);
```

# Conclusion

As future versions of Java pull in more features, there will be less of a need for third-party collections libraries. For now, they provide compelling features beyond what’s included in the JDK.

## :icon-comment-discussion: Comments

[Leave a comment on medium](https://motlin.medium.com/java-has-streams-do-we-need-third-party-collections-dd12f473d105)
