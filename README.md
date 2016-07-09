#Linter

Somewhat-modular linter for TextMate.

Out-of-the-box supports **ESLint**, **JSCS** and **CoffeeLint**.

<img src="https://cloud.githubusercontent.com/assets/1244342/16709853/86fb70d2-4625-11e6-8dff-b2f0ccb61881.png" width="574">

## Supports any linter
*Linter* bundle can easily be extended to support any linter.
Add a file to `Support/linters` containing a commonjs module that will call the needed linter and fire a callback returning the data.
Please explore existing modules to learn more.

## Global and local linters
First *Linter* looks for locally installed linters by searching in `node_modules/.bin` folders going up to the root just like `node` does.
If no executable was found *Linter* tries a globally installed version (installed with `npm i -g`).
If this also fails *Linter* skips the non available linter.

## Fast keyboard access
Press on the keyboard the number rendered in the bottom left corner of one of the first nine list entries to be delivered to the corresponding code.

## Variables

*A nice place to set variables is the project's `.tm_properties`*.

```
# an optional comma separated list of linters to be used
TM_LINTER_USE_ONLY = eslint,coffeelint
```

##Proof of concept
This bundle is more like a proof of concept and will probably be rewritten from scratch if I'll ever get myself to do this.
But it works for me for quite a long time already so I decided that it's worth sharing it with others.

---

[igorkozlov.me](http://igorkozlov.me)
