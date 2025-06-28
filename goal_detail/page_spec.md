# GOAL DETAIL PAGE

## Purpose
Deep dive on one goal, allow data logging and review.

## Visible UI Regions
1. **Goal header**
   * Description
   * Target criterion
   * Current average
2. **Full chart**
   * Line (score/percent) or bar (frequency)
   * Date range selector (30 d, 90 d, custom)
3. **Quick Stats**
   * Total trials, successes, slope/trajectory emoji.
4. **Add Entry FAB**
5. **Entries list** (reverse chronological):
   * Date, value, note icon → tap to expand note.

## Inputs
* FAB → `data_entry_modal/`
* Scroll bottom triggers lazy load older entries.
* Date range change rerenders chart.

## Local Processing
* Chart reads from local time‑series array (cached).
* On entry delete, confirm dialog then soft‑delete flag.

## Outputs
* Snackbar “Entry saved”.
* Chart animation to new point.

## Navigation Targets
* `data_entry_modal/`

## Offline Behavior
* Add Entry allowed offline; unsynced flag on list item.

## Edge Cases
* >2000 points: chart switches to decimation algorithm.

## Accessibility Hooks
* Chart area has spoken summary ("Average 78 %, trending up").
