

import * as _ from 'lodash';

interface objs {
    minimum_duration: number;
}
const objects: objs[] = [
    {minimum_duration: 12},
    {minimum_duration: 24},
    {minimum_duration: 5},
    {minimum_duration: 13}
]

const sorted = _.sortBy(objects, 'minimum_duration')
const largest = objects[objects.length-1]
console.log('sorted', sorted);
