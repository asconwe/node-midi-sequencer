const {getUserConfig} = require('../../modules/initialize/initSequencer')

describe('getUserConfig()', () => {
    it(`should return promise with an array of unique routes`, () => {
        getUserConfig(inPorts, outPorts)
            .then(routes => {
                routes.should.be.an.array;
                routes.map(route => {
                    route.should.have.property('id').and.should.have.property('name');
                })
            })
    })

    it(`should throw an error if inPorts or outPorts are not defined`, () => {
        getUserConfig(inPorts).should.thow;
        getUserConfig('invalid entry', outPorts).should.throw;
    })
})