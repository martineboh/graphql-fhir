const DateTimeScalar = require('../scalars/datetime.scalar');
const { GraphQLObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

let ImagingManifestResourceType = new GraphQLEnumType({
	name: 'ImagingManifestResourceType',
	values: {
		ImagingManifest: { value: 'ImagingManifest' }
	}
});

/**
 * @name exports
 * @summary ImagingManifest Schema
 */
module.exports = new GraphQLObjectType({
	name: 'ImagingManifest',
	description: 'Base StructureDefinition for ImagingManifest Resource.',
	fields: () => extendSchema(require('./domainresource.schema'), {
		resourceType: {
			type: new GraphQLNonNull(ImagingManifestResourceType),
			description: 'Type of this resource.'
		},
		identifier: {
			type: require('./identifier.schema'),
			description: 'Unique identifier of the DICOM Key Object Selection (KOS) that this resource represents.'
		},
		patient: {
			type: new GraphQLNonNull(require('./reference.schema')),
			description: 'A patient resource reference which is the patient subject of all DICOM SOP Instances in this ImagingManifest.'
		},
		authoringTime: {
			type: DateTimeScalar,
			description: 'Date and time when the selection of the referenced instances were made. It is (typically) different from the creation date of the selection resource, and from dates associated with the referenced instances (e.g. capture time of the referenced image).'
		},
		_authoringTime: {
			type: require('./element.schema'),
			description: 'Date and time when the selection of the referenced instances were made. It is (typically) different from the creation date of the selection resource, and from dates associated with the referenced instances (e.g. capture time of the referenced image).'
		},
		author: {
			type: require('./reference.schema'),
			description: 'Author of ImagingManifest. It can be a human author or a device which made the decision of the SOP instances selected. For example, a radiologist selected a set of imaging SOP instances to attach in a diagnostic report, and a CAD application may author a selection to describe SOP instances it used to generate a detection conclusion.'
		},
		description: {
			type: GraphQLString,
			description: 'Free text narrative description of the ImagingManifest.   The value may be derived from the DICOM Standard Part 16, CID-7010 descriptions (e.g. Best in Set, Complete Study Content). Note that those values cover the wide range of uses of the DICOM Key Object Selection object, several of which are not supported by ImagingManifest. Specifically, there is no expected behavior associated with descriptions that suggest referenced images be removed or not used.'
		},
		_description: {
			type: require('./element.schema'),
			description: 'Free text narrative description of the ImagingManifest.   The value may be derived from the DICOM Standard Part 16, CID-7010 descriptions (e.g. Best in Set, Complete Study Content). Note that those values cover the wide range of uses of the DICOM Key Object Selection object, several of which are not supported by ImagingManifest. Specifically, there is no expected behavior associated with descriptions that suggest referenced images be removed or not used.'
		},
		study: {
			type: new GraphQLList(new GraphQLNonNull(require('./imagingmanifeststudy.schema'))),
			description: 'Study identity and locating information of the DICOM SOP instances in the selection.'
		}
	})
});
