var prompt = require('prompt'),
    shell = require('shelljs');

var excludes = ['node_modules', 'packages']

shell.config.silent = true;
var folders = shell
    .ls('-Rd', './**/obj', './**/bin')
    .filter(function (f) {
        return excludes.every(function (e) { return f.indexOf(e) === -1; });
    });

if (!folders.length) {
    console.log('No bin/obj folders found.');
    return;
}

console.log('The following bin/obj folders were found:\n' + folders.join('\n'));

prompt.start();
prompt.message = '';
prompt.delimiter = '';

prompt.get({
    properties: {
        confirm: {
            pattern: /^(yes|no|y|n)$/gi,
            description: 'Do you want to delete them?',
            message: 'Type yes/no',
            required: true,
            default: 'yes'
        }
    }
}, function (err, result) {
    if (!result || !result.confirm) return;
    var c = result.confirm.toLowerCase();
    if (c !== 'y' && c !== 'yes') return;

    shell.rm('-rf', folders);
});