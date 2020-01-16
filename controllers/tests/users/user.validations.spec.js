(() => {

    'use strict';

    const server = require('../../../index');
    
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const should = chai.should();
    const faker = require('faker');

    const HTTP_STATUS = require('http-status');
    
    chai.use(chaiHttp);

    describe('Users Validations', () => {

        it('should return an error: firstName undefined', done => {

            chai.request(server).post('/users').send({
                lastName: faker.name.lastName(),
                userType: 1,
                nic: '961264022V',
                email: faker.internet.email(),
                mobile: '0772506467',
                password: faker.internet.password()
            }).end((err, res) => {
                res.should.have.status(HTTP_STATUS.BAD_REQUEST);
                done();
            });

        });

        it('should return an error: lastName undefined', done => {

            chai.request(server).post('/users').send({
                firstName: faker.name.firstName(),
                userType: 1,
                nic: '961264022V',
                email: faker.internet.email(),
                mobile: '0772506467',
                password: faker.internet.password()
            }).end((err, res) => {
                res.should.have.status(HTTP_STATUS.BAD_REQUEST);
                done();
            });

        });

    });


})();