import { proxyLink } from "../src";
const base = { value: "bar" };

it("Values Linked", () => {
    const link = proxyLink(base);

    link.value = "baz";
    expect(base.value === "baz").toBe(true);

    base.value = "foo";
    expect(link.value === "foo").toBe(true);
});

it("Functions, Getters & Setters", () => {
    const link = proxyLink(base, {
        get getter() {
            return this.value + "!";
        },

        set setter(v: string) {
            this.value = v;
        },

        exec() {
            return this.getter + "?";
        },
    });

    link.setter = "woof";
    expect(base.value === "woof").toBe(true);
    expect(link.getter === base.value + "!").toBe(true);
    expect(link.exec() === "woof!?").toBe(true);
});