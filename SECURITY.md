# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in BaseArcade, please report it responsibly.

### How to Report

1. **DO NOT** open a public issue
2. Email: security@basearcade.xyz (or create a private security advisory on GitHub)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Time

- We will acknowledge your report within 48 hours
- We aim to provide a fix within 7 days for critical issues
- You will be credited (if desired) once the issue is resolved

## Security Measures

### Smart Contract

- Audited by [Auditor Name]
- No admin keys or backdoors
- Open source and verifiable on BaseScan
- Immutable game logic

### Frontend

- No private keys stored locally
- All wallet interactions via secure providers
- HTTPS only in production
- Regular dependency updates

### Best Practices

**For Users:**
- Never share your private keys
- Verify contract address before interacting
- Use hardware wallets for large amounts
- Double-check transaction details

**For Developers:**
- Keep dependencies updated
- Follow secure coding practices
- Run security audits before deployment
- Use environment variables for sensitive data

## Known Limitations

- Smart contract is immutable - cannot be upgraded
- No emergency pause function
- Prize claims are manual

## Bug Bounty

We currently do not have a formal bug bounty program, but we appreciate responsible disclosure and will consider rewards on a case-by-case basis.

## Contact

For security concerns: security@basearcade.xyz
