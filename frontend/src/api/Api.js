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
} from './Url';


let token = null;

export async function getAssessmentData() {
  let responseData = getRequestWithHeader(PATIENT_PROFILE, token);
  return responseData;
}

export function checkIfLogin() {
  return token !== null;
}

export function logout() {
  token = null;
}

export async function getPreviousAssessmentData() {
  let responseData = getRequestWithHeader(PREVIOUS_APPOINTMENT, token);
  return responseData;
}


export async function getListForReview() {
  let responseData = getRequestWithHeader(REVIEW_ASSESSMENT, token);
  return responseData;
}

export async function cancelAppointment(id) {
  let responseData = deleteRequest(CANCEL_APPOINTMENT + '/' + id, token);
  return responseData;
}

export async function getPatientList() {
  let responseData = getRequestWithHeader(PATIENT_LIST, token);
  return responseData;
}

export async function postAssessment(difficultyBreathing, age, symptomsSet1, symptomsSet2) {
  let data = {
    difficultyBreathing,
    age,
    symptomsSet1,
    symptomsSet2
  };
  let responseData = postRequestWithHeader(POST_APPOINTMENT, data, token);
  return responseData;
}

export async function postReviewAssessment(isForwarded, isRejected, isReviewed, id) {
  let data = {
    isForwarded,
    isRejected,
    isReviewed
  };
  let responseData = postRequestWithHeader(REVIEW_ASSESSMENT_BYID + '/' + id, data, token);
  return responseData;
}

export async function postScheduleAppointment(date, id) {
  let data = {
    date
  };
  let responseData = postRequestWithHeader(SCHEDULE_APPOINTMENT + '/' + id, data, token);
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
  responseData = postRequest(PATIENT_REGISTER, data);
  token = responseData.token;
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
  responseData = postRequest(NURSE_REGISTER, data);
  token = responseData.token;
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
  responseData = postRequest(DOCTOR_REGISTER, data);
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

