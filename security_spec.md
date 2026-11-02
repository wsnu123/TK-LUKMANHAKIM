# Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default Deny & Verified Identity**: All operations default to `false`. Every read and write operation requires an authenticated user with a verified email (`request.auth != null && request.auth.token.email_verified == true`).
2. **Strict Schema & Key Whitelisting**: Every document write (`create` and `update`) is validated through a dedicated `isValid[Entity](data)` helper enforcing exact key sets (`hasAll` and `hasOnly`), data types, regex patterns (`^[a-zA-Z0-9_\-]+$`), and string length limits (`size() <= maxLength`).
3. **Ownership & PII Isolation**: Records containing PII (`registrations`, `tuition_bills`, `student_reports`, `notification_logs`, `inquiries`) are isolated so that `get` and `list` queries strictly require `resource.data.ownerId == request.auth.uid || isAdmin()`.
4. **Temporal Integrity**: `createdAt` and `updatedAt` fields must match server time (`request.time`) on creation, `createdAt` is immutable on update, and `updatedAt` must equal `request.time` on update.
5. **Terminal State Locking**: Once a `RegistrationRecord` reaches `status == 'Diterima'` or a `TuitionBillRecord` reaches `status == 'Lunas'`, non-admin users cannot mutate the document further.
6. **Privilege Escalation Prevention**: Users cannot self-assign admin privileges in `/admins/{adminUid}`; only the bootstrapped super-admin (`ml0752960@gmail.com`) or existing verified admins can manage admin records.

## 2. The "Dirty Dozen" Payloads (Adversarial Test Cases)

1. **Payload 1 (Unverified Email Spoof)**: Authenticated user with `email: "ml0752960@gmail.com"` but `email_verified: false` attempting to create a teacher record. -> `PERMISSION_DENIED`
2. **Payload 2 (Shadow Field Injection)**: Creating a registration with an extra undeclared field `"isAdmin": true`. -> `PERMISSION_DENIED`
3. **Payload 3 (Identity Spoofing on Create)**: Authenticated user `user_A` creating a registration with `ownerId: "user_B"`. -> `PERMISSION_DENIED`
4. **Payload 4 (ID Poisoning Attack)**: Creating a document with a 200-character or special-character document ID (`id: "bad/id$123"`). -> `PERMISSION_DENIED`
5. **Payload 5 (Denial of Wallet / Oversized String)**: Submitting a registration where `notes` is 5,000 characters (exceeding `maxLength: 500`). -> `PERMISSION_DENIED`
6. **Payload 6 (Forged Client Timestamp)**: Creating a registration where `createdAt` is a past or future timestamp instead of `request.time`. -> `PERMISSION_DENIED`
7. **Payload 7 (Immortal Field Mutation)**: Updating a registration and attempting to change `ownerId` or `createdAt`. -> `PERMISSION_DENIED`
8. **Payload 8 (Unauthorized Status Escalation)**: Regular parent user attempting to update their own registration `status` directly to `"Diterima"`. -> `PERMISSION_DENIED`
9. **Payload 9 (Terminal State Bypass)**: Attempting to update a `TuitionBillRecord` that is already `"Lunas"` as a non-admin user. -> `PERMISSION_DENIED`
10. **Payload 10 (Cross-Tenant PII Read)**: Authenticated user `user_A` attempting `get` on `registrations/reg_owned_by_user_B`. -> `PERMISSION_DENIED`
11. **Payload 11 (Unfiltered List Scraping)**: Authenticated non-admin user `user_A` executing an unconstrained `list` query on `/registrations` without `where('ownerId', '==', 'user_A')`. -> `PERMISSION_DENIED`
12. **Payload 12 (Self-Assigned Admin Escalation)**: Non-admin user `user_A` attempting to create `/admins/user_A` with `role: "super_admin"`. -> `PERMISSION_DENIED`

## 3. Red Team Audit & Conflict Report

- **Identity Spoofing**: Blocked on all collections via `incoming().ownerId == request.auth.uid` (and `incoming().authorId == request.auth.uid`) during `create` and `incoming().ownerId == existing().ownerId` during `update`.
- **State Shortcutting**: Blocked on `registrations` and `tuition_bills` via terminal state gates (`existing().status != 'Diterima'` and `existing().status != 'Lunas'`) and restricted `affectedKeys().hasOnly(...)` action branches.
- **Resource Poisoning**: Blocked on all single-document paths via `isValidId()` enforcing `^[a-zA-Z0-9_\-]+$` and `.size() <= 128`, plus `.size()` limits on every string property.
- **Value Poisoning**: Blocked because every `allow update` wraps all branches inside `isValid[Entity](incoming())`.
