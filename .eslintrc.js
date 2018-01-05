module.exports = {
    "env": {
        // "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "max-len": ["error", {"code": 120}],
        "no-console": ["error", {allow: ["warn", "error", "log"]}],
        "padded-blocks": ["error", "never"],
        "no-trailing-spaces": ["error", {
            "skipBlankLines": true,
            "ignoreComments": true
        }],
        "comma-dangle": ["error", {
            //"arrays": "never",
            "objects": "never",
            //"imports": "never",
            //"exports": "never",
            //"functions": "ignore"
        }],
        "eol-last": ["error", "windows"]
    }
};