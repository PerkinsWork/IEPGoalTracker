# AUTH PAGE

## Purpose
Authenticate a user via email/password or Google/Microsoft SSO, then pull Stripe subscription status.

## Visible UI Regions
1. **Logo / App name** – top center.
2. **Sign-in form** – email, password, "Forgot?" link.
3. **SSO buttons** – Google, Microsoft (OAuth2 implicit).
4. **Create account** – link to same page in "mode=signup".
5. **Error banner** – collapsible area for auth errors.
6. **Footer** – privacy + FERPA notice.

## Inputs
* Email (string, RFC 5322)
* Password (string, ≥ 8 chars)
* OAuth tokens (Google/Microsoft)

## Local Processing
* Validate email format instantly.
* Disable submit until both fields non-empty.
* Hash password client-side only for TLS transit.
* Store JWT & refresh token encrypted (Keychain / Keystore / browser IndexedDB).
* On first login fetch `subscriptionTier`, `seatsAllowed/Used`.

## Outputs
* Success → navigate `caseload_home/`.
* Failure → show error banner text.

## Navigation Targets
* `/signup` mode inside same page.
* Deep-link callback from `subscription_billing/` when Stripe returns.

## Offline Behavior
* Page unusable offline; show "Offline – connect to sign in".

## Edge Cases
* Password reset email invalid → generic message to avoid user enumeration.
* SSO denial/timeout → banner: “We couldn’t complete sign-in, try again.”

## Accessibility Hooks
* All form fields labeled.
* Focus trap for modal errors.
* Contrast ≥ 4.5:1.
