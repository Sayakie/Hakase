/**
 * @fileoverview Represents strategy how Git hooks should do.
 * @author Sayakie <sayakie@kakao.com>
 */

/**
 * @typedef {'applypatch-msg' | 'pre-applypatch' | 'post-applypatch' | 'pre-commit' | 'pre-merge-commit' | 'prepare-commit-msg' | 'commit-msg' | 'post-commit' | 'pre-rebase' | 'post-checkout' | 'post-merge' | 'pre-push' | 'pre-receive' | 'update' | 'proc-receive' | 'post-receive' | 'post-update' | 'reference-transaction' | 'push-to-checkout' | 'pre-auto-gc' | 'post-rewrite' | 'sendemail-validate' | 'fsmonitor-watchman' | 'p4-changelist' | 'p4-prepare-changelist' | 'p4-post-changelist' | 'p4-pre-submit' | 'post-index-change'} GitHooks
 *
 * @type {Record<GitHooks, String>}
 */
module.exports = {
  "pre-commit": "pnpm lint-staged",
  "commit-msg": "pnpm commitlint --edit"
}
