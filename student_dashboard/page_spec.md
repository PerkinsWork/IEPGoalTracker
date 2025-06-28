# STUDENT DASHBOARD

## Purpose
Show one student’s snapshot and list of goals.

## Visible UI Regions
1. **Header card**
   * Photo, name, grade, class.
   * Weekly goals met vs total.
2. **Summary mini‑chart** – stacked bar progress last 4 weeks.
3. **Goal list**
   * Card per goal: description, current avg, target, micro‑chart.
4. **Primary Buttons**
   * Add Goal
   * Export (opens `export_modal/`)
   * Share (opens seat invite pre‑filtered to student)

## Inputs
* Tap goal card → `goal_detail/`.
* Swipe goal card → quick actions (Archive).
* Tap Add Goal → opens goal form overlay.

## Local Processing
* Recalculate weekly metric when a new entry arrives.

## Outputs
* Live update of cards as entries sync.
* Export or share triggers modals.

## Navigation Targets
* `goal_detail/`
* `export_modal/`

## Offline Behavior
* Fully functional; export uses local data only.

## Edge Cases
* No goals → empty‑state card “Add your first goal”.

## Accessibility Hooks
* 48 px minimum tap on goal cards.
