export function proxyLink<T0 extends object, T1 extends object>(source: T0, modifiers: T1 & ThisType<T0 & T1> = {} as any) {
    const proxy = new Proxy({}, {
        get(obj: object, property: string) {
            if (property in obj)
                return obj[property];

            return source[property];
        },

        set(obj: object, property: string, value: any) {
            if (property in obj)
                obj[property] = value;
            else
                source[property] = value;

            return true;
        },
    }) as T0 & T1;

    for (let property of Object.getOwnPropertyNames(modifiers)) {
        const descriptor        = Object.getOwnPropertyDescriptor(modifiers, property);
        const proxyDescriptor   = Object.assign({}, descriptor);
        const hasGetterOrSetter = descriptor.get || descriptor.set;

        if (hasGetterOrSetter) {
            if (proxyDescriptor.get)
                proxyDescriptor.get = proxyDescriptor.get.bind(proxy);

            if (proxyDescriptor.set)
                proxyDescriptor.set = proxyDescriptor.set.bind(proxy);

            Object.defineProperty(proxy, property, proxyDescriptor);
        }
        else
            Object.defineProperty(proxy, property, proxyDescriptor);
    }

    return proxy;
}