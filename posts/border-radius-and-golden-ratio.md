---
title: 'The Secret Between border-radius and Golden Ratio'
date: '2023-10-12'
---

# Intro

A few years ago, when I learned `border-radius`, I felt very fulfilled. It could make our html element beautiful. And then I became confused: “How to organize the size of the border-radius?”. This question followed me for a long time.

# The method I used to design

Later, I began to learn from the design styles of other websites. At that time, I liked designing a component like this: Set a **15px** border-radius and a **15px** padding for the parent as a container, and then set **10px** border-radius with **10px** for the child as content. If the ratios look not well, adjust it in the DevTools and use the best value...

<iframe
  className="showcase"
  src="https://codesandbox.io/embed/old-radial-design-8cvh5q?fontsize=14&hidenavigation=1&theme=dark&hidedevtools=1&codemirror=1"
  title="old radial design"
></iframe>

When our pages became complex, this approach will be cumbersome, sometimes I have to make many modifications to get the desire style.

# Golden Ratio to organize border-radius

I have always wanted a method to establish the size of border-radius for different containers. Someday I realized that I could use a ratio to organize the border-radius between parent and childrens elements. So I tried the [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio):

1. For a known element has a border-radius _N_
2. Set its children's border-radius with _N _ 0.618\*.
3. You could use _Math.round_ to convert it to an integer, this will look neat.

<iframe src="https://codesandbox.io/embed/golden-ratio-radius-37t58g?fontsize=14&hidenavigation=1&theme=dark&hidedevtools=1&codemirror=1"
  class="showcase"
  title="golden ratio radius"
></iframe>

I think that’s a useful skill, when you design the border-radius by this way, your component could be beautiful!~

# Ending

I was so excited when found this rule and I’m very glad sharing this to you. Thank you for reading my article!🙌

<style>
  .showcase {
    width: 100%;
    height: 350px;
    border-radius: 5px;
    overflow:hidden;
    border: 0;
  }
</style>
