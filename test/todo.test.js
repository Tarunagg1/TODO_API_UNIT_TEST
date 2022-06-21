
const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');


const BASE_API_URL = "http://localhost:8000/api";

chai.use(chaihttp);




describe('todo api', () => {
    let token = null;
    let todoid = null;


    // console.log(token);
    // describe('create new todo', () => {

    describe('create new todo without auth token', () => {
        it('should return 401', async () => {
            const userid = 1;
            const res = await chai.request(BASE_API_URL).delete(`/todo/${userid}`);
            expect(res.status).to.equal(401);
        });
    })

    describe('should login then create todo', () => {
        it('should return 200', async () => {
            const data = {
                name: "test",
                email: "test7@gmail.com",
                password: "testing"
            };
            const authres = await chai.request(BASE_API_URL).post(`/auth/login`).send(data);
            expect(authres.status).to.equal(200);

            let tododata = {
                title: "this is title",
                text: "this is text"
            }

            token = authres.body.token;
            const resonse = await chai.request(BASE_API_URL).post(`/todo`).send(tododata)
                .set('Authorization', 'JBarrerWT ' + token)

            resonse.should.have.status(200);
            expect(resonse.body.message).to.equal('todo created');
            resonse.should.be.json;
            resonse.body.should.have.property('data')
            todoid = resonse.body.data._id;

            resonse.body.data.should.have.property('_id');
            resonse.body.data.should.have.property('title');
            resonse.body.data.should.have.property('text');
        });
    })

    describe('should create todo witout data', () => {
        it('should return 400', async () => {

            const resonse = await chai.request(BASE_API_URL).post(`/todo`).send({})
                .set('Authorization', 'JBarrerWT ' + token)

            resonse.should.have.status(400);
            expect(resonse.body.message).to.equal('title or text required');
            resonse.should.be.json;
        });
    })


    describe('get todo without auth token', () => {
        it('should return 401', async () => {
            const res = await chai.request(BASE_API_URL).delete(`/todo/${todoid}`);
            expect(res.status).to.equal(401);
        });
    })

    describe('get single todo', () => {
        it('should return 200', async () => {
            const resonse = await chai.request(BASE_API_URL).get(`/todo/${todoid}`)
                .set('Authorization', 'JBarrerWT ' + token)

            resonse.should.have.status(200);
            resonse.should.be.json;
            expect(resonse.body.message).to.equal('todo');
            resonse.body.should.have.property('data')
        });
    })


    describe('get lists of todos', () => {
        it('should return 200', async () => {
            const resonse = await chai.request(BASE_API_URL).get(`/todo`)
                .set('Authorization', 'JBarrerWT ' + token)

            resonse.should.have.status(200);
            expect(resonse.body.message).to.equal('todo list');
            resonse.body.should.have.property('data')
            resonse.body.data.should.be.a('array');

            resonse.body.data[0].should.have.property('_id');
            resonse.body.data[0].should.have.property('title');
            resonse.body.data[0].should.have.property('text');
        });
    })




    describe('update todo without auth token', () => {
        it('should return 401', async () => {
            const res = await chai.request(BASE_API_URL).put(`/todo/${todoid}`);
            expect(res.status).to.equal(401);
        });
    })

    describe('update todo', () => {
        it('should return 200', async () => {
            let tododata = {
                title: "this is title updated",
                text: "this is text updated"
            }

            const res = await chai.request(BASE_API_URL).put(`/todo/${todoid}`)
                .send(tododata)
                .set('Authorization', 'JBarrerWT ' + token)

            expect(res.status).to.equal(200);
            res.should.be.json;
            expect(res.body.message).to.equal('toto updated');
            res.body.should.have.property('data')

            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('title').to.equal(tododata.title);
            res.body.data.should.have.property('text').to.equal(tododata.text);

        });
    })

    describe('delete todo without auth token', () => {
        it('should return 401', async () => {
            const res = await chai.request(BASE_API_URL).put(`/todo/${todoid}`);
            expect(res.status).to.equal(401);
        });
    })


    describe('delete todo', () => {
        it('should return 200', async () => {
            const res = await chai.request(BASE_API_URL).delete(`/todo/${todoid}`)
                .set('Authorization', 'JBarrerWT ' + token);
            expect(res.status).to.equal(200);
            res.should.be.json;
            expect(res.body.message).to.equal('todo deleted');
            res.body.should.have.property('data');
        });
    });


    describe('get deleted todo', () => {
        it('should return 200', async () => {
            const res = await chai.request(BASE_API_URL).delete(`/todo/${todoid}`)
                .set('Authorization', 'JBarrerWT ' + token);

            expect(res.status).to.equal(200);
            res.should.be.json;
            expect(res.body.message).to.equal('todo deleted');
            res.body.should.have.property('data');
            expect(res.body.data).to.equal(null);
        });
    });



    // })

})


