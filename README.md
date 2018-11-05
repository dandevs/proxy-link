# proxy-link

`proxyLink(source, modifiers?)`  
Creates a proxy for the source object, modifiers merge with the new proxy object with properly binded functions, getters and setters.

```js
import { proxyLink } from "../src";
const base = { value: "bar" };

it("Values Linked", () => {
    const link = proxyLink(base, { count: 1 });

    link.value = "baz";
    expect(base.value === "baz").toBe(true);

    base.value = "foo";
    expect(link.value === "foo").toBe(true);
    expect(link.count === 1 && (base as any).count === undefined).toBe(true);
});

it("Functions, Getters & Setters", () => {
    const link = proxyLink(base, {
        get getter() { return this.value + "!"; },
        set setter(v: string) { this.value = v; },
        exec() { return this.getter + "?"; },
        getValue() { return this.value; },
    });

    link.setter = "woof";
    expect(base.value === "woof").toBe(true);
    expect(link.getter === base.value + "!").toBe(true);
    expect(link.exec() === "woof!?").toBe(true);
    expect(link.getValue() === "woof").toEqual(true);
});
```