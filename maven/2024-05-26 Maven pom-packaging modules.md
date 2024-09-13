# Maven pom-packaging modules

This post describes the uses for maven's `<packaging>pom</packaging>`.

[Maven's packaging declaration](https://maven.apache.org/pom.html#packaging) defines the "the default list of goals which execute on each corresponding build lifecycle stage for a particular package structure."

> When no packaging is declared, Maven assumes the packaging is the default: jar.

Pom-only modules have no jar artifact. The pom may serve multiple purposes. Use the artifactId and name to make the purpose clear.

- Internal Bill of Materials:  `<library>-dependencies`
- Published Bill of Materials:  `<library>-bom`
- Internal aggregator:  `<library>-project`
- Published parent:  `<library>-parent`

## Bill of Materials

A  [bill of materials](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#bill-of-materials-bom-poms) declares a set of dependency versions. Importing a BOM doesn’t force a project to use every dependency declared inside. When the importing project  _does_ use one of the dependencies, it gets the version declared in the BOM.

There are two flavors of BOMs, ones used inside a library, and ones published for users of the library.

### Internal Bill of Materials

Internal BOMs have names like  `<library>-dependencies` and are imported or used as a parent elsewhere in the same multi-module project.

[dropwizard-dependencies/pom.xml](https://github.com/dropwizard/dropwizard/blob/v2.1.12/dropwizard-dependencies/pom.xml) is Dropwizard's internal BOM. It declares versions of the third-party software that Dropwizard depends on.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson</groupId>
            <artifactId>jackson-bom</artifactId>
            <version>${jackson.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-text</artifactId>
            <version>${commons-text.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>${commons-lang3.version}</version>
        </dependency>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>${guava.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>com.google.code.findbugs</groupId>
                    <artifactId>jsr305</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!-- ... -->
    </dependencies>
</dependencyManagement>
```

### External Bill of Materials

External BOMs, or just BOMs, have names like  `<library>-bom`. They are designed to be used together with the jars that make up a multi-module library.

[dropwizard-bom/pom.xml](https://github.com/dropwizard/dropwizard/blob/v2.1.12/dropwizard-bom/pom.xml) is published with Dropwizard. It declares versions of every jar that ships as part of Dropwizard.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-assets</artifactId>
            <version>2.1.12</version>
        </dependency>
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-auth</artifactId>
            <version>2.1.12</version>
        </dependency>
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-client</artifactId>
            <version>2.1.12</version>
        </dependency>
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-configuration</artifactId>
            <version>2.1.12</version>
        </dependency>
        <!-- ... -->
    </dependencies>
</dependencyManagement>
```

Users can import the BOM with `import` scope in the `dependencyManagement` section.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-bom</artifactId>
            <version>2.1.12</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Once imported, projects can depend on jars within Dropwizard without repeating the version number many times.

```xml
<dependencies>
    <dependency>
        <groupId>io.dropwizard</groupId>
        <artifactId>dropwizard-core</artifactId>
    </dependency>
    <dependency>
        <groupId>io.dropwizard</groupId>
        <artifactId>dropwizard-jetty</artifactId>
    </dependency>
</dependencies>
```

## Aggregator pom

In a multi-module project, most leaf nodes have `jar` packaging. All non-leaf nodes have `pom` packaging and are aggregators. [Aggregator poms](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Project_Aggregation) are intermediate nodes in multi-module projects that declare a list of modules as children. They can have any artifactId. They should declare a name like  `<name>… (Module Group)</name>`. An example is Liftwizard’s [liftwizard-clock/pom.xml](https://github.com/motlin/liftwizard/blob/main/liftwizard-clock/pom.xml) which gathers all the clock-related modules into a subdirectory.

```xml
<artifactId>liftwizard-clock</artifactId>
<name>Liftwizard Clock (Module Group)</name>

<modules>
    <module>liftwizard-bundle-clock</module>
    <module>liftwizard-clock-incrementing</module>
    <module>liftwizard-config-clock-fixed</module>
    <module>liftwizard-config-clock-incrementing</module>
    <module>liftwizard-config-clock-system</module>
    <module>liftwizard-config-clock</module>
</modules>
```

Aggregators only affect which modules are included in the build. The included modules do not inherit configuration from the aggregator unless they also use inheritance.

### Parent pom

Maven supports [inheritance](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Project_Inheritance) of configuration from a parent pom. A child declares its parent in a  `parent`  section. Within a multi-module project it’s common for the parent to be an aggregator, which includes the child in its list of modules. In other words, it’s common for the parent-child relationship to be bidirectional, but this is not required.

### Project pom

A common pattern is for the pom at the root of a multi-module project to be both an aggregator and a parent, and sometimes a grandparent. A parent pom that is meant to be used within a project should have a name like  `<library>-project`, like Dropwizard’s [dropwizard-project/pom.xml](https://github.com/dropwizard/dropwizard/blob/v2.1.12/pom.xml). A parent pom that is meant to be used by other projects should have a name like  `<library>-parent`.

Leave comments [on medium](https://motlin.medium.com/maven-pom-packaging-modules-09a43635c34b).

## :icon-comment-discussion: Comments

[Leave a comment on medium](https://motlin.medium.com/maven-pom-packaging-modules-09a43635c34b)
