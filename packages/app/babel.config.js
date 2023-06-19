module.exports = function (
    /** @type {{ cache: (arg0: boolean) => void; }} */ api
) {
    api.cache(true)
    return {
        presets: [
            'babel-preset-expo',
            {
                jsxRuntime: 'automatic',
            },
        ],
        plugins: ['react-native-reanimated/plugin'],
    }
}
