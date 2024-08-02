#!/bin/sh
set -eux
cd programs/token && cargo concordium build --out dist/module.wasm.v1 --schema-out dist/schema.bin
cd ../..
cd programs/vaults && cargo concordium build --out dist/module.wasm.v1 --schema-out dist/schema.bin