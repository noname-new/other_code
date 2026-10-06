// ==UserScript==
// @name         History Logger Loader
// @namespace    https://github.com/noname-new
// @version      3.0.0
// @description  History Logger Loader
// @author       noname-new
// @match        *://*/*
// @run-at       document-start
//
// @grant        GM_xmlhttpRequest
//
// @connect      raw.githubusercontent.com
// @noframes
// ==/UserScript==

(function () {
    'use strict';
    const LOADER_URL =
        "https://raw.githubusercontent.com/noname-new/logger_history/refs/heads/main/loader.js";
    // Chống loader tự gọi chính nó
    if (window.__HISTORY_LOGGER_LOADER__) {
        return;
    }
    window.__HISTORY_LOGGER_LOADER__ = true;
    function log(...args) {
        console.log(
            "[Loader]",
            ...args
        );
    }
    function error(...args) {
        console.error(
            "[Loader]",
            ...args
        );
    }

    function execute(code) {
        if (
            typeof code !== "string" ||
            code.length < 100
        ) {
            error("Loader code không hợp lệ.");
            return false;
        }
        try {
            eval(code);
            log("Loader executed.");
            return true;
        } catch (e) {
            error(
                "Loader execution failed:",
                e
            );
            return false;
        }
    }
    log(
        "Downloading",
        LOADER_URL
    );
    GM_xmlhttpRequest({
        method: "GET",
        url: LOADER_URL,
        timeout: 15000,
        headers: {
            "Cache-Control": "no-cache"
        },
        onload(response) {

            if (
                response.status !== 200
            ) {

                error(
                    "Loader HTTP:",
                    response.status
                );

                return;
            }
            const code =
                response.responseText || "";
            if (
                code.trim().startsWith("<")
            ) {
                error(
                    "GitHub returned HTML instead of JavaScript."
                );
                return;
            }
            execute(code);
        },
        onerror(error) {

            error(
                "Loader network error:",
                error
            );
        },
        ontimeout() {
            error(
                "Loader timeout."
            );
        }
    });

})();
