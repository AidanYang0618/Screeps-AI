"use strict";

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';

let config;
const dest = process.env.DEST;
if (!dest) {
    console.log("未指定目标, 代码将被编译但不会上传");
} else if ((config = require("./screeps.json")[dest]) == null) {
    throw new Error("无效目标，请检查 secret.json 中是否包含对应配置");
}

export default {
    input: "src/main.js",
    output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true
    },

    plugins: [
        clear({ targets: ["dist"] }),
        resolve({ rootDir: "src" }),
        commonjs(),
        // typescript({ tsconfig: "./tsconfig.json" }),
        screeps({ config: config, dryRun: config == null })
    ]
}
