// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import {bexContent} from 'quasar/wrappers';

const ignoreTags = new Set(['SPAN', 'STRONG', 'A']);

export default bexContent(async () => {
    // (await chrome.storage.sync.get('ebitr-black-list')).forEach((item: string) => {
    //     if (new RegExp(item).test(window.location.href)) return;
    // });
    console.log(chrome.storage.sync.get('ebitr-black-list'));
    window.addEventListener('load', () => {
        console.log('Edge Built-in Translate Repairer 已加载');
        document.querySelectorAll('code').forEach((element) => {
            if (ignoreTags.has(<string>element.parentElement?.tagName)) return;
            const parent = element.parentNode;
            if (parent === null) return;
            const spans: HTMLSpanElement[] = [];
            while (parent.firstChild) {
                if (ignoreTags.has(<string>parent.firstElementChild?.tagName)) break;
                const span = document.createElement('span');
                span.appendChild(parent.firstChild);
                spans.push(span);
            }
            spans.forEach((span) => {
                parent.appendChild(span);
            });
        });
    });
});
