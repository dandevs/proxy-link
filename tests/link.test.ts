import { proxyLink } from "../src";

const foo = { value: "bar" };

it("Values Linked", () => {
    const link = proxyLink(foo);

    link.value = "baz";
    expect(foo.value === "baz").toBe(true);

    foo.value = "foo";
    expect(link.value === "foo").toBe(true);
});

it("Combined", () => {
    const link = proxyLink(foo, {
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
});