const { GraphQLInputObjectType, GraphQLList, GraphQLString } = require('graphql');

// Util for extending gql objects
const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary Measure.supplementalData Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'MeasureSupplementalData_Input',
	description: 'The supplemental data criteria for the measure report, specified as either the name of a valid CQL expression within a referenced library, or a valid FHIR Resource Path.',
	fields: () => extendSchema(require('./backboneelement.input'), {
		identifier: {
			type: require('./identifier.input'),
			description: 'An identifier for the supplemental data.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/measure-data-usage
		usage: {
			type: new GraphQLList(require('./codeableconcept.input')),
			description: 'An indicator of the intended usage for the supplemental data element. Supplemental data indicates the data is additional information requested to augment the measure information. Risk adjustment factor indicates the data is additional information used to calculate risk adjustment factors when applying a risk model to the measure calculation.'
		},
		criteria: {
			type: GraphQLString,
			description: 'The criteria for the supplemental data. This must be the name of a valid expression defined within a referenced library, and defines the data to be returned for this element.'
		},
		_criteria: {
			type: require('./element.input'),
			description: 'The criteria for the supplemental data. This must be the name of a valid expression defined within a referenced library, and defines the data to be returned for this element.'
		},
		path: {
			type: GraphQLString,
			description: 'The supplemental data to be supplied as part of the measure response, specified as a valid FHIR Resource Path.'
		},
		_path: {
			type: require('./element.input'),
			description: 'The supplemental data to be supplied as part of the measure response, specified as a valid FHIR Resource Path.'
		}
	})
});
