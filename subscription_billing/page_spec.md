# SUBSCRIPTION / BILLING

## Purpose
Stripe Checkout & Customer Portal wrapper.

## Visible UI Regions
1. **Plan comparison cards** (Solo vs Team).
2. **Change plan** button → opens Stripe Checkout in webview.
3. **Manage billing** button → opens Stripe Customer Portal.
4. **Billing history list** (webhook‑fed cache).

## Inputs
* Plan selection, seat add.

## Local Processing
* Wait for Stripe redirect; on success refresh user doc.

## Outputs
* Snackbar “Plan updated”.

## Navigation Targets
* Back to `team_seats/` or `caseload_home/`.

## Offline Behavior
* Page blocked; show "Connect to Internet".

## Edge Cases
* Checkout cancel → return, show “Purchase canceled”.

## Accessibility Hooks
* Stripe embeds provide a11y; wrapper adds labels.
