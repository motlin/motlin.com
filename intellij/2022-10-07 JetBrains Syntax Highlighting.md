# JetBrains IDEs hidden features: Syntax Highlighting

JetBrains has added powerful improvements to their IDE over the years, but leaves some features disabled in the default configuration. If my colleagues are representative, most users don't know these features exist.

Here, we're going to look at syntax highlighting. The default schemes only assign colors to a few token types. My goal is for you to be aware of the token types that are available, and to customize more of them.

And JetBrains, I want you to help change the defaults!

## What's off?

I'll use [this Java code](https://gist.github.com/motlin/b3a44089acda2fbba2580214f87f803a) to test out syntax highlighting in IntelliJ. But everything here applies to all JetBrains IDEs and languages.

Here's what the code looks like with IntelliJ's default light theme.

<img width="560" alt="Screen Shot Default Light Theme" src="https://user-images.githubusercontent.com/244258/195231822-0ae45ad5-6b3e-4f67-9fe6-78b974ab24b6.png">

And here's what it looks like with my light theme.

<img width="560" alt="Screen Shot Craig's Light" src="https://user-images.githubusercontent.com/244258/195231498-582584f4-95a0-46ce-bcf8-31d10b390c43.png">

And here's my dark theme.

<img width="563" alt="Screen Shot Craig's Dark" src="https://user-images.githubusercontent.com/244258/195233050-ef035a69-ebe2-4ae4-a8c8-60390926cd47.png">

## TL;DR

If you just want to use my settings, [you can get them here](https://github.com/motlin/jetbrains-color-schemes).

If you want to know what the colors mean, read on.

## Color Semantics

### Foreground colors for concrete and abstract

I use a maroon color to represent **concreteness** (in classes and methods) and a teal color to represent **abstractness**.

* Interfaces are teal
* Concrete classes are maroon
* Abstract classes are maroon with a teal underline

<img width="514" alt="Screen Shot concrete and abstract" src="https://user-images.githubusercontent.com/244258/194722812-07f9eab4-0940-4b99-bc57-9ff85aa407c7.png">

Method calls are underlined with teal if the method is defined in an interface.

<img width="301" alt="Screen Shot method calls" src="https://user-images.githubusercontent.com/244258/194722689-cb05be12-ea48-4492-a801-e084ca46882d.png">

Method calls are underlined with maroon if the method is defined in a superclass.

<img width="313" alt="Screen Shot superclass method call" src="https://user-images.githubusercontent.com/244258/194722795-953d034e-8248-45c1-8f22-f0c33e648f65.png">

### Italics and bold for static and mutability

I use italics to represent **static**.

I use bold to represent **mutability**.

* Fields that are non-final, both static and non-static, are bold
* Parameters that get reassigned are bold
* Variables that get reassigned are bold, including loop variables

<img width="414" alt="Screen Shot 2022-10-08 at 3 01 55 PM" src="https://user-images.githubusercontent.com/244258/194723426-9af8a6b3-41e2-460a-aabf-55d6e0df6cc5.png">

### Background colors for errors

I use background colors to represent errors, warnings, and weak warnings.

<img width="646" alt="Screen Shot errors and warnings" src="https://user-images.githubusercontent.com/244258/194722352-f3086a8e-f226-479d-96ca-1a918ee8a7ce.png">

## Differences from defaults

IntelliJ ships with [4 predefined color schemes](https://www.jetbrains.com/help/idea/configuring-colors-and-fonts.html#customize-color-scheme): Classic Light, Darcula, High contrast, and IntelliJ Light. Plugins can add more.

### Foreground colors

The default themes do not use many colors, and few token types are customized. Classes, interfaces, parameters, local variables, and method calls have no customization and are displayed as default text.

The default themes have custom foreground colors for keywords, fields, numbers, and string literals. I've kept these colors unchanged in my themes.

### Italics and bold

The default themes use italics to represent static, which I kept unchanged.

I use bold to emphasize mutability. This can help when stepping through code in the debugger. Only the bolded names can have their values change over time.

IntelliJ Light doesn't use bold. Classic Light uses bold for keywords, instance fields, and static final fields, but **not** static non-final fields.

<img width="408" alt="Screen Shot default bold" src="https://user-images.githubusercontent.com/244258/195236613-4da5dd60-d0f9-4ec6-96bf-1e24ac2137f2.png">

If there is some meaning behind bold in this theme, I haven't figured it out.

### Errors and warnings

The default themes use a mix of background colors and text decorations to show errors, warnings, and weak warnings.

<img width="520" alt="Screen Shot default errors and warnings" src="https://user-images.githubusercontent.com/244258/194722288-b402b95c-f76b-49c4-a72d-a347be9d08c8.png">

Text decorations can shadow each other.

<img width="264" alt="Screen Shot underline obscured" src="https://user-images.githubusercontent.com/244258/194722222-b686b758-f5a4-4d83-9a21-358f7e5864ae.png">

Here, the underline for reassignment is obscured by the underwave for the type error.

## Configuration

To configure your own color scheme:

* Open the IDE settings, go to Settings > Editor > Color Scheme.
* Choose a built-in scheme, like IntelliJ Light or Darcula.
* Click the gear icon, and choose Duplicate...
* Give it a name and choose Apply.

Next it's helpful to look at a specific language. I'll click Java.

### Quick config

Clicking an element in the preview pane will jump to its token type in the color scheme editor.

<img width="1079" alt="Screen Shot Color Scheme Editor" src="https://user-images.githubusercontent.com/244258/195229902-e22d555c-f660-4eff-b146-483208e25349.png">

(Clicking a parameter jumps to the settings for parameters.)

This makes it easy to discover the various token types, and can make it quick to set up a new color scheme. However, we usually don't want to apply our config here at the "leaves."

### Config tree

The token types that we can configure are organized into a hierarchy. Each token type either has custom display settings, or uses the settings from the parent type. The "Inherit values from" pane has a hyperlink we can click to jump to the parent type. Following one example chain:

* Java > Constant (static final imported field)
* Java > Constant (static final field)
* Java > Static field
* Language Defaults > Static field
* Language Defaults > Default
* General > Default text

It's best to configure the token types as high in the hierarchy as possible, in "Language Defaults" or "General" whenever possible. Settings here will apply to all programming languages, which is especially helpful when working with a new language.

Let's say we're reading Scala code for the first time, so we're not yet familiar with traits.

<img width="205" alt="Screen Shot Scala Trait" src="https://user-images.githubusercontent.com/244258/195229584-e0bfb9c5-9cd3-4c3b-8b5e-fe5bfea196d5.png">

We can see that the trait is highlighted teal, a strong hint that traits are similar to interfaces.

Out of the box, my theme works pretty well for Scala.

<img width="452" alt="Screen Shot Scala Code" src="https://user-images.githubusercontent.com/244258/195229636-cfb2161d-6e57-46ea-902a-13266022f3a2.png">

With a bit of language-specific tweaking, we can make it even better. If we can keep the tweaks to a minimum, we will have a consistent experience across languages.

## Conclusion

You already knew that JetBrains IDEs support syntax highlighting, but hopefully you learned something about how powerful the highlighting engine is. If you're already configuring your own color scheme, I'd love to see your setup.

What other features should folks know more about, where the IDE ships with them disabled by default?
