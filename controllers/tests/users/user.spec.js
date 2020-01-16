(() => {

    'use strict';

    const server = require('../../../index');
    
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const should = chai.should();
    const faker = require('faker');

    const HTTP_STATUS = require('http-status');
    
    chai.use(chaiHttp);

    describe('Users CRUD', () => {

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
                uid = res.body.data.uid;
                res.should.have.status(HTTP_STATUS.CREATED);
                res.body.should.be.a('object');
                done();
            });

        });

        it('should get the user by the uid', done => {

            chai.request(server)
                .get(`/users/${uid}`)
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.should.have.property('data');
                    res.body.success.should.equal(true);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('uid');
                    res.body.data.uid.should.equal(uid)
                    done();
                });

        });

        it('should delete the user', done => {

            chai.request(server)
                .delete(`/users/${uid}`)
                .end((err, res) => {
                    res.should.have.status(HTTP_STATUS.OK);
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    done();
                });
        });

    });


})();