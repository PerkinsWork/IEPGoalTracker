# ERROR STATES PAGE (Template Components)

Purpose: consolidate UI components for common error dialogs and banners so designers handle them consistently.

## Components
* **BannerError** – inline at top of screen, red background.
* **ModalError** – blocking modal with retry button.
* **EmptyState** – illustration + description + primary action.
* **OfflineOverlay** – grey bar “Working offline…”

## Standard Copy Library
| Code | Message |
|------|---------|
| AUTH_401 | “Incorrect email or password.” |
| PAY_001 | “Subscription required. Visit Billing.” |
| NET_OFF | “No Internet connection. Changes will sync later.” |

## Accessibility
* All modals focus‑trap, banners have `role="alert"`.
