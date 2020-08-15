const Organization = require("../../models/organization.model");

const createOrganization = (uid, name, description, email) => Organization.create({
    uid, name, description, email
});

const updateOrganization = (uid, name, description) => 
    Organization.update({ name, description}, { where: { uid }});

const deleteOrganization = uid => Organization.destroy({ where: {uid}});

const getOrganizations = () => Organization.findAll();

const getOrganizationsCount = () =>  Organization.count();

module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizations,
    getOrganizationsCount,
}