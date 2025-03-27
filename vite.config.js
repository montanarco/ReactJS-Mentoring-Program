"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom',
        // hey! 👋 over here
        globals: true,
        setupFiles: './src/setup.js', // assuming the test folder is in the root of our project
    }
});
