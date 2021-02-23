import { getRequest, postRequest, putRequest, deleteRequest } from './RequestExecutor';
import {
    PATIENT_REGISTER,
    NURSE_REGISTER,
    LOGIN,
} from './Url';


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
    responseData = postRequest(PATIENT_REGISTER, data);
    return responseData;
  }


export async function loginPatient(email, password) {
    let responseData;
    let data = {
        email,
        password,
    };
    responseData = postRequest(LOGIN, data);
    return responseData;
  }

