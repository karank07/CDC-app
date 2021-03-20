import { getRequest, postRequest, putRequest, deleteRequest, getRequestWithHeader, postRequestWithHeader } from './RequestExecutor';
import {
  PATIENT_REGISTER,
  NURSE_REGISTER,
  LOGIN,
  PATIENT_PROFILE,
  REVIEW_ASSESSMENT,
  REVIEW_ASSESSMENT_BYID,
  DOCTOR_REGISTER,
  SCHEDULE_APPOINTMENT,
  POST_APPOINTMENT,
  PREVIOUS_APPOINTMENT,
  CANCEL_APPOINTMENT,
  PATIENT_LIST,
  FORWARDED_LIST,
  REVIEW_ASSESSMENT_BYID_BYDR,
  SCHEDULE_APPOINTMENT_BYDR,
  PATIENT_LIST_DR,
  UPDATE_PATIENT_PROFILE,
  UPDATE_DOCTOR_PROFILE,
  UPDATE_NURSE_PROFILE
} from './Url';


let token = null;



export async function getForwardedAssessmentData() {
  let responseData = await getRequestWithHeader(FORWARDED_LIST, token);
  return responseData;
}

export async function getAssessmentData() {
  let responseData = await getRequestWithHeader(PATIENT_PROFILE, token);
  return responseData;
}

export function checkIfLogin() {
  return token !== null;
}

export function logout() {
  token = null;
}

export async function getPreviousAssessmentData() {
  let responseData = await getRequestWithHeader(PREVIOUS_APPOINTMENT, token);
  return responseData;
}


export async function getListForReview() {
  let responseData = await getRequestWithHeader(REVIEW_ASSESSMENT, token);
  return responseData;
}

export async function cancelAppointment(id) {
  let responseData = await deleteRequest(CANCEL_APPOINTMENT + '/' + id, token);
  return responseData;
}

export async function getPatientList() {
  let responseData = await getRequestWithHeader(PATIENT_LIST, token);
  return responseData;
}

export async function postAssessment(difficultyBreathing, age, symptomsSet1, symptomsSet2) {
  let data = {
    difficultyBreathing,
    age,
    symptomsSet1,
    symptomsSet2
  };
  let responseData = await postRequestWithHeader(POST_APPOINTMENT, data, token);
  return responseData;
}

export async function postReviewAssessment(isForwarded, isRejected, isReviewed, id) {
  let data = {
    isForwarded,
    isRejected,
    isReviewed
  };
  let responseData = await postRequestWithHeader(REVIEW_ASSESSMENT_BYID + '/' + id, data, token);
  return responseData;
}

export async function postScheduleAppointment(date, id) {
  let data = {
    date
  };
  let responseData = await postRequestWithHeader(SCHEDULE_APPOINTMENT + '/' + id, data, token);
  return responseData;
}


export async function getPatientListForDr() {
  let responseData = await getRequestWithHeader(PATIENT_LIST_DR, token);
  return responseData;
}

export async function postReviewAssessmentByDr(isRejected, isReviewed, id) {
  let data = {
    isRejected,
    isReviewed
  };
  let responseData = await postRequestWithHeader(REVIEW_ASSESSMENT_BYID_BYDR + '/' + id, data, token);
  return responseData;
}

export async function postScheduleAppointmentByDr(date, id) {
  let data = {
    date
  };
  let responseData = await postRequestWithHeader(SCHEDULE_APPOINTMENT_BYDR + '/' + id, data, token);
  return responseData;
}


export async function updateNurse(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address
  };
  responseData = await putRequest(UPDATE_NURSE_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}
export async function updateDoctor(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address
  };
  responseData = await putRequest(UPDATE_DOCTOR_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}

export async function updatePatient(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address
  };
  responseData = await putRequest(UPDATE_PATIENT_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}

export async function registerPatient(email, firstName, lastName, password, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address
  };
  responseData = await postRequest(PATIENT_REGISTER, data);
  token = await responseData.token;
  return responseData;
}

export async function registerNurse(email, firstName, lastName, password, dateOfBirth, phone, address, registrationNum) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address,
    registrationNum
  };
  responseData = await postRequest(NURSE_REGISTER, data);
  token = await responseData.token;
  return responseData;
}


export async function registerDoctor(email, firstName, lastName, password, dateOfBirth, phone, address, registrationNum) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address,
    registrationNum
  };
  responseData = await postRequest(DOCTOR_REGISTER, data);
  token = responseData.token;
  return responseData;
}


export async function loginPatient(email, password) {
  let responseData;
  let data = {
    email,
    password,
  };
  responseData = await postRequest(LOGIN, data);

  token = await responseData.token;
  return responseData;
}

