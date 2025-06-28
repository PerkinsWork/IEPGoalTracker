# IEP Goal Tracker – Repository Overview

This repo contains **functional page specs** for every screen in the MVP.
Each folder = one screen or modal.  
Each `page_spec.md` is the single source of truth for that screen’s:

* Purpose & user stories
* UI zoning and component list
* Inputs, outputs, local state, and side effects
* Navigation entry points and exit targets
* Offline / sync behaviors
* Edge-case and error handling
* Minimum accessibility notes (WCAG AA roadmap)

The structure purposely omits code. Designers wire-frame from these files, and devs stub components exactly one-for-one with the pages inside `lib/screens/`.
