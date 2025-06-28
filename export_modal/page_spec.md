# EXPORT MODAL

## Purpose
Generate PDF or CSV for student data (print / share).

## Visible UI Regions
1. **Range selector** – presets 30 days, 90 days, custom date pickers.
2. **Include charts toggle** (on by default).
3. **Export buttons**
   * PDF
   * CSV
4. **Progress bar** appears while rendering.

## Inputs
* Tap PDF or CSV.

## Local Processing
* Fetch entries in range (local).
* Build HTML template → convert to PDF blob OR build CSV string.
* Invoke OS share sheet.

## Outputs
* Shares file, dismisses modal.

## Navigation Targets
* None (modal).

## Offline Behavior
* Fully functional.

## Edge Cases
* Range with zero entries → disable export buttons.

## Accessibility Hooks
* All controls keyboard reachable.
