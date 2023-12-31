// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import {bexContent} from 'quasar/wrappers';

const ignoreTags = new Set(['SPAN', 'STRONG', 'A', 'CODE']);

export default bexContent(async (bridge) => {
    let data = (await bridge.send('storage.get', {key: 'ebitr-blacklist'})).data;
    if (data === undefined) {
        await bridge.send('storage.set', {key: 'ebitr-blacklist', value: []});
        data = [];
    }
    const url = window.location.href;
    data.forEach((item: string) => {
        if (RegExp(item).test(url)) {
            console.log(`Edge Built-in Translate Repairer 已在该页被 ${item} 规则禁用`);
            return;
        }
    });
    await bridge.send('storage.set', {key: 'ebitr-blacklist', value: data});
    window.addEventListener('load', () => {
        console.log('Edge Built-in Translate Repairer 已加载');
        document.querySelectorAll('code').forEach((element) => {
            if (ignoreTags.has(<string>element.parentElement?.tagName)) return;
            const parent = element.parentNode;
            if (parent === null) return;
            const spans: HTMLSpanElement[] = [];
            while (parent.firstChild) {
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
