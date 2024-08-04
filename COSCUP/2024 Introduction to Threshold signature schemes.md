# Introduction to Threshold signature schemes

Speaker: cyc

Issues

- How to securely store the private key?
- Single point of failure

Solution 1: Shamir's Secret Sharing

- Split the private key into n shares

MPC(Multi-Party Computation)

Ideal(MPC+Digital Signature)

Threadhold Signature

- Distribute key generation，但是也只有簽名
- Sign Signature
- Refresh share(i.e. revoke keys)

一開始私鑰的碎片，每一片稱作 share。

- M-of-N threshold signature, M <= N

就算 use, generate, refresh share, 都不會暴露私鑰。