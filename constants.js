const dbConfig = {
// DATABASE SETTINGS
	apiKey: 'AIzaSyCVn1oAM0-Go1yKsvIrZUzr54EV96AQVPk',
	authDomain: 'avengers-initiative-fa89b.firebaseapp.com',
	projectId: 'avengers-initiative-fa89b'
};

const messages = {
// CONTROLLER MESSAGES
	noRecordsFound: 'No records found',
	cannotGetRecords: 'Unable to get record(s) - ',
	recordDoesNotExist: 'Avenger does not exist',
	recordAdded: 'Avenger added to DB',
	cannotAddRecord: 'Cannot add avenger - ',
	recordUpdated: 'Avenger has been updated',
	cannotUpdateRecord: 'Cannot update data - ',
	recordRemoved: 'Avenger has been removed',
	cannotRemoveRecord: 'Cannot remove avenger - ',
	validationError: 'One or more of the fields are incorrect'
};

module.exports = { dbConfig, messages };

