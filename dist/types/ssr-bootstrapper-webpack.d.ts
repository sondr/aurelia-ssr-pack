declare function initialize(): {
    PLATFORM: any;
};
declare function stop(): void;
export declare const bootstrapper: (configure: any) => {
    initialize: typeof initialize;
    stop: typeof stop;
    start: (headers?: any) => Promise<unknown>;
};
export {};
//# sourceMappingURL=ssr-bootstrapper-webpack.d.ts.map