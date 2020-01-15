(() => {

    'use strict';

    const server = require('../../../index');
    
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const should = chai.should();
    const faker = require('faker');

    const HTTP_STATUS = require('http-status');
    
    chai.use(chaiHttp);

    describe('Users : POST', () => {

        let uid;

        it('should create a new user', done => {

            chai.request(server).post('/users').send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                userType: 1,
                nic: '972312784V',
                email: faker.internet.email(),
                mobile: '0771243542',
                password: faker.internet.password()
            }).end((err, res) => {
                uid = res.data.uid;
                res.should.have.status(HTTP_STATUS.CREATED);
                res.body.should.be.a('object');
                done();
            });

        });

        it('should return an error: firstName undefined', done => {

            chai.request(server).post('/users').send({
                lastName: 'Bandara',
                userType: 1,
                nic: '961264022V',
                email: 'ntbandara3@hotmail.com',
                mobile: '0772506467',
                password: '1qaz2wsx@'
            }).end((err, res) => {
                // check firebase user
                // check db user
                res.should.have.status(HTTP_STATUS.BAD_REQUEST);
                done();
            });

        });

        it('should delete the user', done => {

            done();

        });

    });


})();