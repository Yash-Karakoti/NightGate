#!/bin/bash
set -e

COMPACT_DIR="/home/karakoti/.compact/versions/0.31.0/x86_64-unknown-linux-musl"
cd "$COMPACT_DIR"

# Extract using python3 since unzip may not be installed
python3 << 'EOF'
import zipfile
z = zipfile.ZipFile("artifact.zip")
z.extractall(".")
z.close()
print("Extracted successfully")
EOF

# Make compactc executable
chmod +x compactc 2>/dev/null || true
chmod +x * 2>/dev/null || true
ls -la

# Test compile
source /home/karakoti/.local/bin/env
compact update 0.31.0 2>&1 || echo "Update command returned error but files should be extracted"
compact --version
