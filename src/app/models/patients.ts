// #region _OLD
// export interface IPatientData {
//   id: number;
//   patient: string;
//   type: string;
//   gender: string;
//   blood: string;
//   admissionDate: string;
//   doctor: string;
//   department: string;
//   department_obj: null;
//   bed: string;
//   created_at: string;
//   updated_at: string;
//   is_active: boolean;
// }
// #endregion

import { IBedData } from "./beds";

export interface IPatientData {
  id: number | null;
  created_by_obj: any;
  name: string;
  gender: string;
  allergy: string;
  sector: string;
  birth_date: string;
  comorbidities: string;
  admission_date: string;
  is_active: boolean;
  check_last_read: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  cpf: string;
  // ------
  type: string;
  height: string;
  weight: string;
  blood_type: string;
  doctor_name: string;
  bed: IBedData;
  bed_obj: string;
  risk: string | null;
  urgency: string | null;
}

export interface IPatientDisplay {
  id: number | null;
  name: string;
  gender: string;
  allergy: string;
  sector: string;
  birth_date: string;
  comorbidities: string;
  admission_date: string;
  is_active: boolean;
  check_last_read: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  cpf: string;
  // ------
  type: string;
  height: string;
  weight: string;
  blood_type: string;
  doctor_name: string;
  bed: IBedData;
  bed_obj: string;
  risk: string | null;
  urgency: string | null;
}
export class PatientData {
  id = null;
  created_by_obj = null;
  name = "";
  gender = "";
  allergy = "";
  sector = "";
  birth_date = "";
  comorbidities = "";
  admission_date = "";
  is_active = false;
  check_last_read = "";
  created_at = "";
  updated_at = "";
  created_by = 0;
  cpf = "";
  // ------
  type = "";
  height = "";
  weight = "";
  blood_type = "";
  doctor_name = "";
  bed = {} as IBedData;
  bed_obj = "";
  risk = null;
  urgency = null;
}

export interface IPatientInformationData {
  id: number;
  created_by_obj: null;
  name: string;
  genrer: string;
  allergy: string;
  sector: string;
  birth_date: string;
  comorbidities: string;
  admission_date: string;
  is_active: boolean;
  check_last_read: string;
  created_at: string;
  updated_at: string;
  created_by: number;

  // age: number;
  // height: string;
  // weight: string;
  // bloodType: string;
  // bed: number;
  // doctor: string;
  // type: string;
}

export const PATIENT_DATA_MOCK = [
  {
    id: 2,
    created_by_obj: {
      id: 1,
      type_user_obj: null,
      last_login: "2023-07-19T10:39:20",
      email: "admin@admin.com",
      name: null,
      username: null,
      is_active: true,
      is_admin: true,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:53:07",
      updated_at: "2023-06-16T11:53:07",
      type_user: null,
    },
    name: "titi",
    cpf: "16150128789",
    genrer: "Maculino",
    allergy: "dipirona",
    sector: "neurologista",
    birth_date: "1999-04-10",
    comorbidities: "pc",
    admission_date: "2023-04-12T00:00:00",
    is_active: true,
    check_last_read: "2023-08-15T00:00:00",
    created_at: "2023-06-16T16:37:55",
    updated_at: "2023-06-21T15:23:11",
    created_by: 1,
  },
  {
    id: 3,
    created_by_obj: null,
    name: "Gustavo",
    cpf: "16150128789",
    genrer: "Maculino",
    allergy: "dipirona",
    sector: "neurologista",
    birth_date: "1999-04-10",
    comorbidities: "pc",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-08-15T00:00:00",
    created_at: "2023-06-21T15:40:36",
    updated_at: "2023-06-21T15:40:36",
    created_by: null,
  },
  {
    id: 4,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "Gustavo",
    cpf: "16150128789",
    genrer: "Maculino",
    allergy: "dipirona",
    sector: "neurologista",
    birth_date: "1999-04-10",
    comorbidities: "pc",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-08-15T00:00:00",
    created_at: "2023-06-21T15:52:24",
    updated_at: "2023-06-21T15:52:24",
    created_by: 2,
  },
  {
    id: 5,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "Teste swagger",
    cpf: "123",
    genrer: "male",
    allergy: "",
    sector: "",
    birth_date: "2023-06-23",
    comorbidities: "",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-23T10:53:30",
    updated_at: "2023-06-23T10:53:30",
    created_by: 2,
  },
  {
    id: 6,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "Teste swagger",
    cpf: "123",
    genrer: "male",
    allergy: "",
    sector: "",
    birth_date: "2023-06-23",
    comorbidities: "",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-23T10:58:49",
    updated_at: "2023-06-23T10:58:49",
    created_by: 2,
  },
  {
    id: 7,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "Teste swagger",
    cpf: "123",
    genrer: "male",
    allergy: "",
    sector: "",
    birth_date: "2023-06-23",
    comorbidities: "",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-23T11:13:08",
    updated_at: "2023-06-23T11:13:08",
    created_by: 2,
  },
  {
    id: 8,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "Teste swagger",
    cpf: "123",
    genrer: "male",
    allergy: "",
    sector: "",
    birth_date: "2023-06-23",
    comorbidities: "",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-23T11:13:39",
    updated_at: "2023-06-23T11:13:39",
    created_by: 2,
  },
  {
    id: 9,
    created_by_obj: {
      id: 2,
      type_user_obj: null,
      last_login: null,
      email: "a@a.com",
      name: "admin",
      username: "tilherme",
      is_active: true,
      is_admin: false,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:54:21",
      updated_at: "2023-06-23T11:27:09",
      type_user: null,
    },
    name: "string",
    cpf: "string",
    genrer: "string",
    allergy: "string",
    sector: "string",
    birth_date: "2023-06-23",
    comorbidities: "string",
    admission_date: null,
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-23T11:14:17",
    updated_at: "2023-06-23T11:14:17",
    created_by: 2,
  },
  {
    id: 1,
    created_by_obj: {
      id: 1,
      type_user_obj: null,
      last_login: "2023-07-19T10:39:20",
      email: "admin@admin.com",
      name: null,
      username: null,
      is_active: true,
      is_admin: true,
      token_notification: null,
      forgot_password_hash: null,
      forgot_password_expire: null,
      created_at: "2023-06-16T11:53:07",
      updated_at: "2023-06-16T11:53:07",
      type_user: null,
    },
    name: "string",
    cpf: "string",
    genrer: "string",
    allergy: "string",
    sector: "string",
    birth_date: "2023-06-23",
    comorbidities: "string",
    admission_date: "2023-04-12T00:00:00",
    is_active: true,
    check_last_read: "2023-06-23T00:00:00",
    created_at: "2023-06-16T12:05:33",
    updated_at: "2023-06-23T11:24:51",
    created_by: 1,
  },
];
