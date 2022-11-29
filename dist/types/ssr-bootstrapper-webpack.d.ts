import pal = require('aurelia-pal');
declare function initialize(): {
    PLATFORM: pal.Platform;
};
declare function stop(): void;
export default function (configure: any): {
    initialize: typeof initialize;
    stop: typeof stop;
    start: (headers?: any) => Promise<unknown>;
};
export {};
//# sourceMappingURL=ssr-bootstrapper-webpack.d.ts.map