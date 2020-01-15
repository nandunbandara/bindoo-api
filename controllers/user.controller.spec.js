(() => {

    'use strict';

    const server = require('../index');
    
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const should = chai.should();

    const HTTP_STATUS = require('http-status');
    
    chai.use(chaiHttp);

    describe('Users', () => {

        // it('should create a new user', done => {

        //     chai.request(server).post('/users').send({
        //         firstName: 'Nandun',
        //         lastName: 'Bandara',
        //         userType: 1,
        //         nic: '961264022V',
        //         email: 'ntbandara3@hotmail.com',
        //         mobile: '0772506467',
        //         password: '1qaz2wsx@'
        //     }).end((err, res) => {
        //         // check firebase user
        //         // check db user
        //         res.should.have.status(HTTP_STATUS.CREATED);
        //         res.body.should.be.a('object');
        //         done();
        //     })

        // });

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
            })

        });

    });


})();