import bcrypt from 'bcryptjs'
const patients = [
    {
        "firstName":"Tim",
        "lastName":"Witte",
        "address": "Apt 90, 7 Goyer Street, Montreal, QC, Canada, H3H2E6",
        "dateOfBirth":"2000-03-01",
        "phone":5148726258,
        "email":"testp1@example.com",
        "password":bcrypt.hashSync('123456', 10),
        "assessments":[],
        "appointments":[]

    },
    {
        "firstName":"Mary Lu",
        "lastName":"Lu",
        "address": "Apt 12, 10355 Drummond Street, Montreal, QC, Canada, H3H2G1",
        "dateOfBirth":"1984-05-25",
        "phone":5148726456,
        "email":"testp2@example.com",
        "password":bcrypt.hashSync('123456', 10),
        "assessments":[],
        "appointments":[]

    },
    {
        "firstName":"Jim",
        "lastName":"Pearson",
        "address": "10 Crescent Street, Scarborough, ON, Canada, Y2Y3T5",
        "dateOfBirth":"1991-12-15",
        "phone":5148726212,
        "email":"testp3@example.com",
        "password":bcrypt.hashSync('123456', 10),
        "assessments":[],
        "appointments":[]

    },

]

export default patients