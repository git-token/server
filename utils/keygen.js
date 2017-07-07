const keythereum = require('keythereum')

// #!/usr/bin/env node
/**
 * @fileOverview An example command line script.
 *
 * This outputs the number of bytes the content passed to it.
 */

var encoding = 'utf-8';
var data;

/**
 * Once we have data, carry out processing. In this case
 * that means writing the length of the input in bytes.
 */
function processData () {
  const dk = keythereum.create()
  const keystore = keythereum.dump(data, dk.privateKey, dk.salt, dk.iv, null);
  keythereum.exportToFile(keystore)
}

// ------------------------------------------------------------
// Called with arguments. E.g.:
// ./example-script "pass in this string as input"
// ------------------------------------------------------------

if (process.stdin.isTTY) {
  // Even though executed by name, the first argument is still "node",
  // the second the script name. The third is the string we want.
  data = new Buffer(process.argv[2] || '', encoding);
  processData();
}

// ------------------------------------------------------------
// Accepting piped content. E.g.:
// echo "pass in this string as input" | ./example-script
// ------------------------------------------------------------

else {
  data = '';
  process.stdin.setEncoding(encoding);

  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });

  process.stdin.on('end', function () {
    // There will be a trailing \n from the user hitting enter. Get rid of it.
    data = data.replace(/\n$/, '');
    processData();
  });
}
