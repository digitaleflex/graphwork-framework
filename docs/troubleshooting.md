# Troubleshooting Guide

This guide helps you troubleshoot common issues with the GraphWork Framework 2.0.

## Installation Issues

### Global Installation Failure

**Issue**: `npm install -g @graphwork/cli` fails

**Solutions**:
1. Check your Node.js version: `node --version` (requires v16.0.0+)
2. Check your npm version: `npm --version` (requires v7.0.0+)
3. Try installing with `--force` flag: `npm install -g @graphwork/cli --force`
4. Clear npm cache: `npm cache clean --force`

### Permission Issues

**Issue**: Permission denied during installation

**Solutions**:
1. Use a Node version manager like nvm
2. Change npm's default directory: `mkdir ~/.npm-global && npm config set prefix '~/.npm-global'`
3. Add to PATH: `export PATH=~/.npm-global/bin:$PATH`

## Configuration Issues

### AI Provider Not Working

**Issue**: AI generation fails or returns errors

**Solutions**:
1. Verify your API key: `echo $OPENAI_API_KEY`
2. Check your network connection
3. Verify the endpoint URL in `graphwork.config.js`
4. Ensure your account has sufficient credits/quota

### Context Loading Problems

**Issue**: Context doesn't load or AI doesn't understand the context

**Solutions**:
1. Verify file paths are correct
2. Ensure context files are in valid markdown format
3. Check that context files contain sufficient information
4. Use `gw load-context` to test context loading

## Usage Issues

### Command Not Found

**Issue**: `gw` command not recognized

**Solutions**:
1. Verify installation: `npm list -g @graphwork/cli`
2. Check if CLI is in your PATH
3. Reinstall globally: `npm install -g @graphwork/cli`
4. Try using `npx @graphwork/cli` instead

### Invalid Context Errors

**Issue**: Error when specifying context files

**Solutions**:
1. Verify the context file exists
2. Ensure the file path is relative to your project root
3. Check that the file is readable
4. Verify the file format is supported (currently .md files)

## Performance Issues

### Slow Response Times

**Issue**: Commands take too long to execute

**Solutions**:
1. Check your internet connection
2. Verify your AI provider's API status
3. Reduce the size of context files
4. Use more specific context paths
5. Check the framework's cache status: `gw cache stats`

### High Resource Usage

**Issue**: High CPU or memory usage

**Solutions**:
1. Monitor resource usage: `gw monitor resources`
2. Reduce concurrent operations
3. Clear the cache if needed: `gw cache clear`
4. Check for memory leaks in large context files

## Security Issues

### Data Privacy Concerns

**Issue**: Worried about sending data to AI providers

**Solutions**:
1. Review the privacy settings in `graphwork.config.js`
2. Use local AI models when possible
3. Sanitize sensitive data before sending to AI
4. Use the framework's data anonymization features

### Validation Failures

**Issue**: Code generation fails security validation

**Solutions**:
1. Review the security guidelines in your context
2. Ensure your specifications don't suggest insecure patterns
3. Use the security checker: `gw validate --security`
4. Adjust security settings in `graphwork.config.js` if appropriate

## Advanced Troubleshooting

### Enable Debug Logging

Add the following to your `graphwork.config.js`:

```javascript
module.exports = {
  // ... other config
  development: {
    debug: true,
    logLevel: 'debug',
  }
};
```

### Check System Health

```bash
# Check framework status
gw status

# Run diagnostics
gw diagnose

# View logs
gw logs --last 50
```

### Reset Framework State

If all else fails:

```bash
# Clear all caches
gw cache clear --all

# Reset configuration (be careful!)
gw config reset
```

## Getting Help

If you're still having issues:

1. Check the [GitHub Issues](https://github.com/graphmind/graphwork-framework/issues)
2. Ask in the [Community Forum](https://github.com/graphmind/graphwork-framework/discussions)
3. Join our [Discord Server](link-to-discord)
4. Open a new issue with the `bug` label if you've found a framework issue