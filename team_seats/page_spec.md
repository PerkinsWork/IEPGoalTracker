# TEAM & SEATS PAGE

## Purpose
Manage subscription seats, invite users, adjust roles.

## Visible UI Regions
1. **Plan label** (Solo / Team, seats used).
2. **Seat table**
   * Email, role badge, status (Active | Pending).
   * Action menu (Resend, Remove, Downgrade role).
3. **Invite seat FAB**.
4. **Upgrade section** – link to `subscription_billing/` if no seats left.

## Inputs
* Invite seat → email + role dialog.
* Remove seat confirmation.

## Local Processing
* Verify seatsAvailable; if 0 redirect to billing.

## Outputs
* Invitation triggers backend email; UI row status Pending.

## Navigation Targets
* `subscription_billing/`

## Offline Behavior
* Read‑only when offline; invite disabled.

## Edge Cases
* Attempt remove self (admin) → blocked.

## Accessibility Hooks
* Table rows announce seat status via aria-label.
