module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@routes": "./src/routes",
                        "@typings": "./src/typings",
                        "@screens": "./src/screens",
                        "@themes": "./src/themes",
                        "@components": "./src/components",
                    },
                },
            ],
            "react-native-reanimated/plugin",
        ],
    };
};
