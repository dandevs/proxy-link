export function proxyLink<T0 extends object, T1 extends object>(target: T0, other: T1 & ThisType<T0 & T1> = {} as any) {
    const proxy = new Proxy({}, {
        get(obj: object, property: string) {
            if (property in obj)
                return obj[property];

            return target[property];
        },

        set(obj: object, property: string, value: any) {
            if (property in obj)
                obj[property] = value;
            else
                target[property] = value;

            return true;
        },
    }) as T0 & T1;

    for (let property of Object.getOwnPropertyNames(other)) {
        const descriptor        = Object.getOwnPropertyDescriptor(other, property);
        const proxyDescriptor   = Object.assign({}, descriptor);
        const hasGetterOrSetter = descriptor.get || descriptor.set;
        const isFunc            = typeof other[property] == "function";

        if (hasGetterOrSetter) {
            if (proxyDescriptor.get)
                proxyDescriptor.get = proxyDescriptor.get.bind(proxy);

            if (proxyDescriptor.set)
                proxyDescriptor.set = proxyDescriptor.set.bind(proxy);

            Object.defineProperty(proxy, property, proxyDescriptor);
        }

        else if (isFunc) {
            proxyDescriptor.value = other[property];
            Object.defineProperty(proxy, property, proxyDescriptor);
        }
        else
            Object.defineProperty(proxy, property, proxyDescriptor);
    }

    return proxy;
}