import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import blueprint from '../firebase-blueprint.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const BOOTSTRAPPED_ADMIN_EMAIL = 'ml0752960@gmail.com';
export const ID_REGEX_PATTERN = new RegExp(
  blueprint.entities.RegistrationRecord.properties.id.pattern || '^[a-zA-Z0-9_\\-]+$'
);

export const VALIDATION_LIMITS = {
  idMaxLength: blueprint.entities.RegistrationRecord.properties.id.maxLength || 128,
  teacherNameMax: blueprint.entities.TeacherRecord.properties.name.maxLength || 120,
  teacherNipMax: blueprint.entities.TeacherRecord.properties.nip.maxLength || 50,
  teacherRoleMax: blueprint.entities.TeacherRecord.properties.role.maxLength || 100,
  teacherEduMax: blueprint.entities.TeacherRecord.properties.education.maxLength || 100,
  teacherPhotoMax: blueprint.entities.TeacherRecord.properties.photo.maxLength || 1000,
  teacherBioMax: blueprint.entities.TeacherRecord.properties.bio.maxLength || 600,
  teacherPhoneMax: blueprint.entities.TeacherRecord.properties.phone.maxLength || 30,
  teacherSpecialtyMax: blueprint.entities.TeacherRecord.properties.specialty.maxLength || 150,
  galleryTitleMax: blueprint.entities.GalleryRecord.properties.title.maxLength || 150,
  galleryUrlMax: blueprint.entities.GalleryRecord.properties.imageUrl.maxLength || 1000,
  galleryDateMax: blueprint.entities.GalleryRecord.properties.date.maxLength || 30,
  galleryDescMax: blueprint.entities.GalleryRecord.properties.description.maxLength || 600,
  regNumberMax: blueprint.entities.RegistrationRecord.properties.regNumber.maxLength || 50,
  childNameMax: blueprint.entities.RegistrationRecord.properties.childName.maxLength || 120,
  nicknameMax: blueprint.entities.RegistrationRecord.properties.nickname.maxLength || 60,
  nikMax: blueprint.entities.RegistrationRecord.properties.nik.maxLength || 32,
  birthPlaceMax: blueprint.entities.RegistrationRecord.properties.birthPlace.maxLength || 80,
  birthDateMax: blueprint.entities.RegistrationRecord.properties.birthDate.maxLength || 30,
  parentNameMax: blueprint.entities.RegistrationRecord.properties.parentName.maxLength || 120,
  motherNameMax: blueprint.entities.RegistrationRecord.properties.motherName.maxLength || 120,
  emailMax: (blueprint.entities.RegistrationRecord.properties as any).email?.maxLength || 256,
  phoneMax: blueprint.entities.RegistrationRecord.properties.phone.maxLength || 30,
  occupationMax: blueprint.entities.RegistrationRecord.properties.occupation.maxLength || 100,
  addressMax: blueprint.entities.RegistrationRecord.properties.address.maxLength || 400,
  notesMax: blueprint.entities.RegistrationRecord.properties.notes.maxLength || 500,
  inquiryInterestMax: blueprint.entities.InquiryRecord.properties.interest.maxLength || 150,
  inquiryMessageMax: blueprint.entities.InquiryRecord.properties.message.maxLength || 1000,
};

export function sanitizeId(rawId: string): string {
  const cleaned = rawId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, VALIDATION_LIMITS.idMaxLength);
  return cleaned.length > 0 ? cleaned : `doc_${Date.now()}`;
}

export function sanitizeString(val: string | undefined | null, maxLength: number, fallback = ''): string {
  const str = (val ?? fallback).trim();
  const effective = str.length > 0 ? str : fallback;
  return effective.slice(0, maxLength);
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.info('Firebase connection: offline/caching mode active.');
    }
  }
}


export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

export { serverTimestamp };
