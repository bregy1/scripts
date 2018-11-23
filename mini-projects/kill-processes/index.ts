import { ProcessSecuritas } from './security/process-securitas';

var unwantedProcesses = [
    'tv_x64.exe',
    'tv_w32.exe'
];

new ProcessSecuritas('windows').clear(unwantedProcesses)
    .then(console.log)
    .catch(console.error);