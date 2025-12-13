const code = "const apiKey = 'sk-abcdefghijklmnopqrstuvwxyz12345678901234567890';";
const pattern1 = /api[key|secret]?/i;
const pattern2 = /\s*[=:]\s*/;
const pattern3 = /['"][a-zA-Z0-9_-]{30,}['"]/;
console.log('Code:', code);
console.log('Pattern1 (api[key|secret]?):', pattern1.test(code));
console.log('Pattern2 (\\s*[=:]\\s*):', pattern2.test(code));
console.log('Pattern3 ([\'"][a-zA-Z0-9_\\-]{30,}[\'"]):', pattern3.test(code));

const combinedPattern = /(api[key|secret]?\s*[=:]\s*['"][a-zA-Z0-9_-]{30,}['"])/i;
console.log('Combined pattern:', combinedPattern.test(code));