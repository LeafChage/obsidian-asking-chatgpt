function version() {
    cat ./manifest.json | jq -r .version
}
bun build ./build.ts
zip release-"$(version)".zip main.js manifest.json


