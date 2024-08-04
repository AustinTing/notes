# Let's tackle open-source supply chain issues with open source

Speaker: Naruhiko Ogasawara

Software Supply Chain Risk

1. Vulnerable software components

1. The injection of malicious code

## Vulnerable software components

例子：log4sheel issue

我們要如何辨識 vulnerable software components？

SBOM (Software Bill of Materials)

Two major SBOM formats

1. [SPDX](https://spdx.dev/)
  - Developed by the Linux Foundation 

2. [CycloneDX](https://cyclonedx.org/)
  - Developed by the OWASP Foundation

## How to create SBOM

- Software Composition Analysis (SCA) tools

- CycloneDX SCA Families
  - cdxgen
  - Highly recommended
