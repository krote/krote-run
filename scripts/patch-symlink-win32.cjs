/**
 * Windows symlink patch for pnpm + esbuild compatibility.
 *
 * Problem: @opennextjs/aws and Next.js create symlinks without specifying type,
 * which creates FILE symlinks on Windows. esbuild cannot read directories through
 * FILE symlinks, causing "Access is denied" errors.
 *
 * Fix: Patch fs.symlinkSync and fs.promises.symlink to try 'junction' first.
 * Junction points (directory hard links) always work on Windows without elevated privileges.
 */
if (process.platform === 'win32') {
  const fs = require('fs');

  // --- symlinkSync patch ---
  const originalSymlinkSync = fs.symlinkSync;
  fs.symlinkSync = function symlinkSyncPatched(target, linkPath, type) {
    if (type == null) {
      // Try junction first (always readable by esbuild), fall back on failure
      try {
        return originalSymlinkSync.call(this, target, linkPath, 'junction');
      } catch {
        // junction failed (file target) → fall back to default
      }
    }
    return originalSymlinkSync.call(this, target, linkPath, type);
  };

  // --- fs.promises.symlink patch ---
  // Next.js build/utils.js calls: await fs.promises.symlink(symlink, fileOutputPath)
  const originalSymlinkAsync = fs.promises.symlink;
  fs.promises.symlink = async function symlinkAsyncPatched(target, linkPath, type) {
    if (type == null) {
      // Try junction first, fall back on failure
      try {
        return await originalSymlinkAsync.call(this, target, linkPath, 'junction');
      } catch {
        // junction failed (file target) → fall back to default
      }
    }
    return await originalSymlinkAsync.call(this, target, linkPath, type);
  };

  process.stderr.write('[patch-symlink-win32] patched (junction-first)\n');
}
