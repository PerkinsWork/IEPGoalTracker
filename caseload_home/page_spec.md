# CASELOAD HOME (Dashboard)

## Purpose
Landing page post-auth; shows teacher’s students and quick progress glance.

## Visible UI Regions
1. **Top bar** – user avatar + plan badge, Sync status icon.
2. **Search bar** – fuzzy find student by name.
3. **Student grid** – tile per student:
   * Photo circle
   * Name, grade
   * Mini sparkline (last 7‑day percent met)
4. **Floating Action Button** – “Add Student”.
5. **Bottom nav** – Home • Team/Seats • Settings • Help.

## Inputs
* Tap tile → open `student_dashboard/`.
* Long‑press tile → context menu (Edit, Archive, Delete).
* FAB tap → open new‑student modal (inline overlay).

## Local Processing
* Grid built from local IndexedDB cache; update diff every sync.
* Sparkline uses cached derived stats; no heavy query.

## Outputs
* Route push to new pages.
* Snackbar “Student added” after creation.

## Navigation Targets
* `student_dashboard/`
* `team_seats/`
* `settings/`
* `help_faq/`

## Offline Behavior
* Works fully offline; new students queued for sync.

## Edge Cases
* Zero students → empty‑state illustration + call‑to‑action.
* >100 students → enable lazy list virtualization.

## Accessibility Hooks
* Tile focus ring, grid keyboard nav (←↑→↓).
