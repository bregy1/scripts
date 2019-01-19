
const log = [
    {
        type: "Changed", 
        fields_changed: [
            { key: "name", value: "New name" },
            { key: 'city', value: 'new york' }
        ]
    },
    { 
        type: "Changed", 
        fields_changed: [
            { key: "age", value: '10' }
        ] 
    },
]

const fieldsNames = [
    { key: 'name', field_name: 'Name' },
    { key: 'age', field_name: 'Age' },
    { key: 'city', field_name: 'City' }
]


const changes_for_display = log
    // loop through log object.
    .map(change => ({
        
        // for every object, map its fields_changed property,
        fields_changed: change.fields_changed.map(field_change => {

            // Look for a field in fieldsNames with same key as field_change.
            const field = fieldsNames.find(name => name.key === field_change.key);
            if (!field) {
                throw 'Field ' + field_change.key + ' NOT FOUND....';
            }

            // build new field_change object out of it,
            // basaically, just asasign value property..
            return Object.assign(field, { value: field_change.value })
            
        }), type: change.type })
    );


// Cheers..
console.log(changes_for_display)