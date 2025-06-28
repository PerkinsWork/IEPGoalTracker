# DATA ENTRY MODAL (Sheet)

## Purpose
Record a single data point quickly.

## Visible UI Regions
1. **Date/time picker** (default now).
2. **Value input**
   * Number stepper, Yes/No toggle, or tap‑to‑count.
3. **Note field (multi‑line)**.
4. **SAVE / CANCEL buttons**.

## Inputs
* User taps SAVE.

## Local Processing
* Validate numeric within 0–maxScore or 0–100 %.
* Append Entry object to local DB; aggregator recomputes stats.

## Outputs
* Returns to `goal_detail/` with list and chart updated.

## Navigation Targets
* None (modal dismiss only).

## Offline Behavior
* Always available; adds syncStatus=pending.

## Edge Cases
* Duplicate timestamp merges in UI list (shows “(2 entries)” badge).

## Accessibility Hooks
* Esc key closes modal.
* Note field labeled for screen readers.
