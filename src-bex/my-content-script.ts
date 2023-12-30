// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import {bexContent} from 'quasar/wrappers';

export default bexContent(() => {
    window.addEventListener('load', () => {
        console.log('Edge Built-in Translate Repairer 已加载');
        document.querySelectorAll('code').forEach((element) => {
            if(element.parentElement?.tagName === 'SPAN') return;
            const parent = element.parentNode;
            if (parent === null) return;
            const span = document.createElement('span');
            while (parent.firstChild) {
                span.appendChild(parent.firstChild);
            }
            parent.appendChild(span);
        });
    });
});
