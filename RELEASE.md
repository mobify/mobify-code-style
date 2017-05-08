# Mobify Code Style - Release process

Use Slack to release new versions of the Mobify Code Style. 

`@mobitron release mobify-code-style [minor|patch]`

The release script will create the release and prep the npm package. Near the
end it merges a release branch in `master` which kicks off `circle.yml`. The
final npm publish step is done within the circle.yml file.
