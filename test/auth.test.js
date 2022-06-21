
const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
const should = chai.should();
var fakeEmail = require('fake-email');



const BASE_API_URL = "http://localhost:8000/api";

chai.use(chaihttp);


describe('Register user api', () => {

    describe('No fields provide', () => {
        it('should return 400', async () => {
            const res = await chai.request(BASE_API_URL).post(`/auth/register`, {});
            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('All field required');
        });
    })

    describe('On successfully register', () => {
        it('should return 200', async () => {
            const data = {
                name: "test",
                email: fakeEmail("test"),
                password: "test"
            };
            const res = await chai.request(BASE_API_URL).post(`/auth/register`).send(data)
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Registration successfully");
        });
    })


    describe('On Email allredy exists', () => {
        it('should return 400', async () => {
            const data = {
                name: "test",
                email: "test7@gmail.com",
                password: "testing"
            };
            const res = await chai.request(BASE_API_URL).post(`/auth/register`).send(data);
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Email allredy register');
        });
    })

})


describe('Login user api', () => {

    describe('No fields provide', () => {
        it('should return 400', async () => {
            const res = await chai.request(BASE_API_URL).post(`/auth/login`, {});
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('All field required');
        });
    })

    describe('on email not exists', () => {
        it('should return 400', async () => {
            const data = {
                name: "test",
                email: "donjfeoidjfwijefjefij@hgmail.com",
                password: "test"
            };
            const res = await chai.request(BASE_API_URL).post(`/auth/login`).send(data)
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal("User not exist");
        });
    })


    describe('On Email allredy exists', () => {
        it('should return 400', async () => {
            const data = {
                name: "test",
                email: "test7@gmail.com",
                password: "testing1"
            };
            const res = await chai.request(BASE_API_URL).post(`/auth/login`).send(data);
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Invalid password');
        });
    })

    describe('On Successfully login', () => {
        it('should return 400', async () => {
            const data = {
                name: "test",
                email: "test7@gmail.com",
                password: "testing"
            };
            const res = await chai.request(BASE_API_URL).post(`/auth/login`).send(data);
            expect(res.status).to.equal(200);
            res.should.be.json;
            res.body.should.have.property('token');
            res.body.should.have.property('user');
            res.body.user.should.have.property('name');
            res.body.user.should.have.property('email');
            expect(res.body.message).to.equal('login success');
            expect(res.body.token)
        });
    })

})


