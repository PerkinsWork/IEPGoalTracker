# SETTINGS PAGE

## Purpose
User preferences and app info.

## Visible UI Regions
1. **Sync status row** (offline, pending, synced).
2. **Biometric unlock toggle**.
3. **Data reminders toggle & frequency**.
4. **Cache size selector** (50 MB, 100 MB, unlimited).
5. **Purge cache now** button.
6. **About** (version, privacy, TOS).

## Inputs
* Toggle switches, cache slider.

## Local Processing
* Update local settings object; persist to device storage.

## Outputs
* Toast “Settings saved”.

## Navigation Targets
* None (stays on page).

## Offline Behavior
* Fully functional; some options disabled if platform lacks biometric.

## Edge Cases
* Purge while export running → block with message.

## Accessibility Hooks
* High‑contrast toggle available if OS in forced‑colors mode.
