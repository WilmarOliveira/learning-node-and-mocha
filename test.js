const { deepEqual, ok } = require('assert');
const database = require('./database');

const INITIAL_VALUE = [
    {
        id: 1,
        villain: 'Harley Quinn',
        name: 'Harley Quinnzel',
        enemy: 'Batman'
    },
    {
        id: 2,
        villain: 'Poison Ivy',
        name: 'Pamela Insley',
        enemy: 'Batman'
    }
]

const NEW_VILLAIN = {
        id: 3,
        villain: 'Brainiac',
        name: 'unknown',
        enemy: 'Superman'
    }


describe('Villain manipulation suite', () => {

    context('when i search a villain', () => {
        it('should return a villain', async () => {
            const expected = INITIAL_VALUE[0];
            const [ result ] = await database.list(expected.id);
            deepEqual(expected, result);
        })
    })

    context('when i created a new villain', () => {
        it('a new villain should be created', async () => {
            const expected = INITIAL_VALUE[1];
            const create = await database.register(expected) 
            const [ result ] = await database.list(expected.id);
            deepEqual(expected, result);
        })
    })

    context('when i delete a villain', () => {

        before(async() => {
            await database.register(NEW_VILLAIN);
        })

        it('should remove the villain', async () => {
            const expected = true;
            const result = await database.remove(NEW_VILLAIN.id);
            deepEqual(expected, result);
        })
    })

    context('when i alter data from a villain', () => {

        it('should update the villain information', async () => {
            const oldVillain = INITIAL_VALUE[1];
            const newVillain = {
                villain: 'Penguin',
                name: 'Oswald Coblepot' ,
            }
            const expected = {
                ...oldVillain,
                ...newVillain
            }

            const update = await database.update(oldVillain.id, newVillain);
            const [ result ] = await database.list(expected.id);

            deepEqual(expected, result);
        })
    })

})