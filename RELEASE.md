## Mobify Code Style
- [ ] Branch off of `develop` and create a `release-vX.Y.Z` branch.
- [ ] Create a new pull request with the following settings:
      * Base: `master`
      * Compare: `release-vX.Y.Z`
      Paste the contents of this checklist into this pull request.
- [ ] Increment the version in `package.json`.
- [ ] In the CHANGELOG.md file of this release branch, change the 'To be released' header to 'vX.Y.Z'.
- [ ] Merge `release-vX.Y.Z` into `master` using the pull request (**don't delete the `release-vX.Y.Z` branch yet!!**).
- [ ] [Publish to npm](https://docs.npmjs.com/cli/publish) from the release branch.
- [ ] Draft a new Github release with the following settings:
      * Tag version: `X.Y.Z` @ `release-vX.Y.Z`
      * Release title: `X.Y.Z - <island_name>`
      * Description: Use highlights from the CHANGELOG.md (only pick out the most significant changes)
- [ ] Merge `release-vX.Y.Z` into `develop` (no need for review on PR, just merge).
- [ ] Delete `release-vX.Y.Z` branch.