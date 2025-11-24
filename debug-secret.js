const code = `        const apiKey = 'sk-abcdefghijklmnopqrstuvwxyz12345678901234567890';
        function useApiKey() {
          console.log(apiKey);
        }`;

const pattern = /(api[key|secret]?\s*[=:]\s*['"][a-zA-Z0-9_\-]{30,}['"])/i;
console.log('Code:', JSON.stringify(code));
console.log('Pattern:', pattern);
console.log('Match:', pattern.test(code));
if (pattern.test(code)) {
  const match = code.match(pattern);
  console.log('Matched:', match[0]);
}