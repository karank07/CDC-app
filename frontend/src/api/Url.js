//development
export const BASE_URL = 'http://localhost:5000/api';

//REGISTER
export const PATIENT_REGISTER = BASE_URL + '/patients/register';
export const NURSE_REGISTER = BASE_URL + '/nurses/register';
export const DOCTOR_REGISTER = BASE_URL + '/doctors/register';

//LOGIN
export const LOGIN = BASE_URL + '/user/login';

//PATIENT
export const PATIENT_PROFILE = BASE_URL + '/patients/profile';
export const CANCEL_APPOINTMENT = BASE_URL + '/patients/cancel-appointment';
export const PREVIOUS_APPOINTMENT = BASE_URL + '/patients/previous-assessments';
export const POST_APPOINTMENT = BASE_URL + '/patients/give-assessment';
export const UPDATE_PATIENT_PROFILE = BASE_URL + '/patients/profile';


//NURSE
export const NURSE_PROFILE = BASE_URL + '/nurses/profile';
export const REVIEW_ASSESSMENT = BASE_URL + '/nurses/assessments-for-review';
export const REVIEW_ASSESSMENT_BYID = BASE_URL + '/nurses/review-assessment';
export const SCHEDULE_APPOINTMENT = BASE_URL + '/nurses/schedule-appointment';
export const PATIENT_LIST = BASE_URL + '/nurses/patient-list';
export const UPDATE_NURSE_PROFILE = BASE_URL + '/nurses/profile';

//DOCTOR
export const FORWARDED_LIST = BASE_URL + '/doctors/forwarded-assessments';
export const REVIEW_ASSESSMENT_BYID_BYDR = BASE_URL + '/doctors/review-assessments';
export const SCHEDULE_APPOINTMENT_BYDR = BASE_URL + '/doctors/schedule-appointment';
export const PATIENT_LIST_DR = BASE_URL + '/doctors/patient-list';
export const UPDATE_DOCTOR_PROFILE = BASE_URL + '/doctors/profile';


//deployment