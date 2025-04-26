# How to pick colors for a syntax highlighting theme

After I shared [JetBrains IDEs hidden features: Syntax Highlighting](https://motlin.medium.com/jetbrains-ides-hidden-features-syntax-highlighting-f9b03c19b92c?source=friends_link&sk=188d6b7390ffaea72e87786aacf0967f), my coworker asked these thought-provoking questions.

* How did you pick the colors?
* What is the relationship of the colors to each other?
* Do you see the code differently?

I'll share my answers here.

## How did you pick the colors?

I first played with syntax highlighting over a decade ago. The first thing I noticed was that you don't assign a color to **types**. Rather, you assign colors to **classes** and **interfaces**. I was blown away.

Most syntax highlighters use lexing and parsing. JetBrains IDEs do too, for _basic_ syntax highlighting, but _this_ highlighting is driven by full semantic analysis.

I decided to assign very different colors to classes and interfaces.

- ![color-AA0000](/icons/colors/aa0000.svg) `#AA0000` maroon for classes
- ![color-00AAAA](/icons/colors/00aaaa.svg) `#00AAAA` teal for interfaces

![color-AA0000](/icons/colors/aa0000.svg)
![color-00AAAA](/icons/colors/00aaaa.svg)

Other settings I've changed over the years, but these colors stuck.

## 50 Shades of Blue

This got me thinking about how many distinct colors I could come up with. How many colors I could add to the theme before they start to get "crowded" and hard to distinguish?

The default light theme _IntelliJ light_, uses three shades of dark blue.

- ![color-1750EB](/icons/colors/1750EB.svg) `#1750EB` for Numbers
- ![color-0033B3](/icons/colors/0033B3.svg) `#0033B3` for Keywords
- ![color-0037A6](/icons/colors/0037A6.svg) `#0037A6` for valid escape sequences

![color-1750EB](/icons/colors/1750EB.svg)
![color-0033B3](/icons/colors/0033B3.svg)
![color-0037A6](/icons/colors/0037A6.svg)

As swatches, I find two of them hard to distinguish.

<img width="236" alt="Screen Shot Three Shades of Blue" src="https://user-images.githubusercontent.com/244258/196014560-e813a2f7-8f43-4c0a-a113-6318393e238f.png">

As foreground text, I can barely tell them apart. I didn't even realize these are separate colors until now, writing this up.

The whole point of syntax highlighting is to convey information at a glance; even subconsciously. Are these three slightly different shades of blue really conveying information to us?

## Which colors will we use?

Let's turn our attention to the whole rainbow and figure out which colors we will use.

![color-F54400](/icons/colors/F54400.svg) We eliminate red, since that will be used for errors.

![color-F5EAC1](/icons/colors/F5EAC1.svg) We eliminate yellow, because it's hard to read in a light theme.

We've already used ![color-AA0000](/icons/colors/AA0000.svg) maroon and ![color-00AAAA](/icons/colors/00AAAA.svg) teal.

We still have 5 colors left with plenty of contrast: ![color-FF8800](/icons/colors/FF8800.svg) orange, ![color-00AA00](/icons/colors/00AA00.svg) green, ![color-1750EB](/icons/colors/1750EB.svg) blue, ![color-871094](/icons/colors/871094.svg) purple, and ![color-FF15B4](/icons/colors/FF15B4.svg) pink.

![color-FF8800](/icons/colors/FF8800.svg)
![color-00AA00](/icons/colors/00AA00.svg)
![color-1750EB](/icons/colors/1750EB.svg)
![color-871094](/icons/colors/871094.svg)
![color-FF15B4](/icons/colors/FF15B4.svg)

But there are more than 5 token types left. We have two options:
- Squeeze in more colors, by using two shades of blue, two shades of green, etc.
- Assign the same color to multiple token types where they won't get confused with each other.

## What is the relationship of the colors to each other?

Those three shades of blue discussed above are nearly indistinguishable to me, yet I never get the tokens confused for each other. Why not? Context from syntax.

Escape sequences don't get confused with anything else, because they're inside a string. Numbers don't get confused with anything else, because they're numbers!

There's a chance that keywords could be confused with an identifier, at a glance. The token `var` could be the name of a local, parameter, or field.

<img width="314" alt="Screen Shot Contrast for Local, Parameter, Field" src="https://user-images.githubusercontent.com/244258/196435235-ed1018df-7f95-4f9d-83ab-a7e4aab7f834.png">

This leads to my main point about the relationship of the colors to each other. We have a finite palette of visually distinct colors. **Contrast is a scarce resource which we only spend to resolve ambiguity.**

* Classes, interfaces, and generic type parameters should use distinct colors.
* Javadoc comments should have a color distinct from line and block comments.
* Keywords, parameters, locals, and fields should use distinct colors.

We should not reuse a color within each group, but it's ok to reuse colors across groups.

## Base Themes

When we create our own themes, we must start by copying an existing theme. We can't just create a new theme from scratch.

When I first created my own theme, I started with IntelliJ Light as the "base theme" but then I assigned new colors to every single token type. During pair programming, coworkers noticed the bright colorful text. But I wasn't convinced that the effect was useful. I felt I had gone overboard, and that the color scheme was disorienting.

I thought about this in the context of "spending contrast" and decided it would be better to restore default settings where possible. This turned out to be easy. There's simply not much in the default theme. The few tokens that are colored in the default theme are not the ones with ambiguity.

I restored:

- the 3 blues for keywords, numbers, and escape sequences
- green for strings
- purple for fields
- teal for function/method declarations

I kept:

- maroon for classes
- teal for interfaces
- orange for parameters
- green for locals
- pink for commas
- gray for semi-colons
- bold and italics as described in [my previous post](https://motlin.medium.com/jetbrains-ides-hidden-features-syntax-highlighting-f9b03c19b92c?source=friends_link&sk=188d6b7390ffaea72e87786aacf0967f)

## Dark Mode

Young engineers might not realize we haven't always had dark mode.

- I've been using JetBrains IDEs since 2007.
- Darcula was added in 2012.
- Operating system support was added to OSX in 2018 and to iOS in 2019.
- IntelliJ still doesn't have support for switching between light/dark automatically.

However, JetBrains did add a keyboard shortcut <kbd>Ctrl</kbd> + <kbd>`</kbd> for quickly switching between themes. At that point, I was motivated to create a dark theme.

My first thought was there must exist an algorithm that can automatically convert a light theme into a dark theme. I couldn't find such an algorithm. Yet I think I came up with something close.

- I took basic colors and fully saturated them.
  - ![color-00AA00](/icons/colors/00AA00.svg) `#00AA00` → ![color-00FF00](/icons/colors/00FF00.svg) `#00FF00` green
  - ![color-00AAAA](/icons/colors/00AAAA.svg) `#00AAAA` → ![color-00FFFF](/icons/colors/00FFFF.svg) `#00FFFF` teal
- Some Darcula choices also are lighter, more saturated versions of their IntelliJ Light counterparts. For example, numbers use a lighter, more saturated blue.
- Other Darcula choices are quite different than their IntelliJ light counterparts. Keywords are orange and method/function declarations are yellow. I kept the defaults and played a bit of musical chairs with the colors.
- I couldn't just fully saturate maroon ![color-AA0000](/icons/colors/AA0000.svg) `#AA0000` because that would give red ![color-FF0000](/icons/colors/FF0000.svg) `#FF0000`  which is used for errors. I just kept lightening till I got pink ![color-DD4488](/icons/colors/DD4488.svg) `#DD4488`

![color-00AA00](/icons/colors/00AA00.svg) → ![color-00FF00](/icons/colors/00FF00.svg)

![color-00AAAA](/icons/colors/00AAAA.svg) → ![color-00FFFF](/icons/colors/00FFFF.svg)

![color-AA0000](/icons/colors/AA0000.svg) → ![color-DD4488](/icons/colors/DD4488.svg)


## Font

I experimented with fonts and ligatures.

Some fonts are difficult to set up on some operating systems. Even when we get them working, not all fonts look great across all operating systems.

[In 2020](https://blog.jetbrains.com/blog/2020/01/15/jetbrains-mono-a-new-font-made-for-developers/), JetBrains created their own font called [JetBrains Mono](https://www.jetbrains.com/lp/mono/). I started using it immediately and haven't looked back.

<img width="569" alt="Screen Shot JetBrains Mono" src="https://user-images.githubusercontent.com/244258/196809626-eab2a901-f7be-4349-8bfa-6257ec82a074.png">

The font ships with the IDE so there's no setup effort. It consistently looks great across all operating systems. There are other fonts that look marginally better, but aren't worth the effort to me.

People still use 80-character wide lines, as if we're still using 1024 x 768 CRT monitors. I won't try to convince you to increase your line length, but please increase the font size. My changes:

- Font size from 13.0 to 17.0
- Line height from 1.2 to 1.05
- Use soft wraps in editor: true
- Console font size to 12.0
- Console line height to 1.05
- Use soft wraps in console: true

## Do you see the code differently?

Yes! It's a big topic, and I still haven't talked about Inspections. Stay tuned.

## :icon-comment-discussion: Comments

[Leave a comment on medium](https://motlin.medium.com/how-to-pick-colors-for-a-syntax-highlighting-theme-96d3e06c19dc)
