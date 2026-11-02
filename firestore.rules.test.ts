/**
 * Firestore Security Rules Adversarial Test Suite ("Dirty Dozen" Verification)
 * Verifies that all 12 adversarial payloads described in security_spec.md
 * are strictly rejected with PERMISSION_DENIED.
 */

export interface AdversarialTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: {
    uid: string;
    email: string;
    email_verified: boolean;
  } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TEST_CASES: AdversarialTestCase[] = [
  {
    id: 1,
    name: 'Unverified Email Spoof on Admin Endpoint',
    collection: 'teachers',
    docId: 'teacher_1',
    operation: 'create',
    auth: { uid: 'spoof_uid', email: 'ml0752960@gmail.com', email_verified: false },
    payload: { id: 'teacher_1', name: 'Spoof Teacher' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Shadow Field Injection on Registration',
    collection: 'registrations',
    docId: 'reg_1',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { id: 'reg_1', ownerId: 'user_1', isVerifiedAdmin: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Registration Create',
    collection: 'registrations',
    docId: 'reg_2',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { id: 'reg_2', ownerId: 'user_2' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'ID Poisoning Attack',
    collection: 'registrations',
    docId: 'invalid$id!with*chars',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { id: 'invalid$id!with*chars', ownerId: 'user_1' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Oversized String Denial of Wallet',
    collection: 'registrations',
    docId: 'reg_3',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { id: 'reg_3', ownerId: 'user_1', notes: 'A'.repeat(5000) },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Forged Client Timestamp',
    collection: 'registrations',
    docId: 'reg_4',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { id: 'reg_4', ownerId: 'user_1', createdAt: '1999-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Immortal Field Mutation (ownerId / createdAt)',
    collection: 'registrations',
    docId: 'reg_1',
    operation: 'update',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { ownerId: 'user_999' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Unauthorized Status Escalation by Non-Admin',
    collection: 'registrations',
    docId: 'reg_1',
    operation: 'update',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { status: 'Diterima' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Terminal State Bypass on Paid Tuition Bill',
    collection: 'tuition_bills',
    docId: 'bill_1',
    operation: 'update',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { status: 'Belum Lunas' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Cross-Tenant PII Read',
    collection: 'registrations',
    docId: 'reg_owned_by_user_2',
    operation: 'get',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Unfiltered List Query Scraping on PII Collection',
    collection: 'registrations',
    docId: '*',
    operation: 'list',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Self-Assigned Admin Escalation',
    collection: 'admins',
    docId: 'user_1',
    operation: 'create',
    auth: { uid: 'user_1', email: 'parent@example.com', email_verified: true },
    payload: { uid: 'user_1', email: 'parent@example.com', role: 'super_admin' },
    expectedResult: 'PERMISSION_DENIED',
  },
];
