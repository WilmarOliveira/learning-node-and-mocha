const { readFileSync, writeFileSync } = require('fs');


class Database {
    constructor() {
        this.FILE_NAME = 'villains.json'
    }
    async getDataFromFile() {
        const file = await readFileSync(this.FILE_NAME, 'utf-8');
        return JSON.parse(file.toString());
    }
    async writeFile(data) {
        await writeFileSync(this.FILE_NAME, JSON.stringify(data));
        return true;
    }
    async list(id) {
        const data = await this.getDataFromFile();
        const filteredData = data.filter((item) => id ? item.id === id : true);

        return filteredData;
    }
    async register(villain) {
        const data = await this.getDataFromFile();
        const id = villain.id <= 3 ? villain.id : Date.now();

        const villainWithId = {
            id,
            ...villain
        }

        const updatedData = [
            ...data,
            villainWithId
        ]

        const result = await this.writeFile(updatedData);
        return result;
    }
    async remove(id) {
        const data = await this.getDataFromFile();
        const index = data.findIndex(item => item.id === parseInt(id));

        if (index === -1) {
            throw Error('Villain not find');
        }

        data.splice(index, 1);
        return await this.writeFile(data);
    }
    async update(id, modification) {
        const data = await this.getDataFromFile();
        const index = data.findIndex(item => item.id === parseInt(id));

        if (index === -1) {
            throw Error('Villain not find');
        }
        const currentVillain = data[index];

        const updatedVillain = {
            ...currentVillain,
            ...modification
        }
        data.splice(index, 1);

        return await this.writeFile([
            ...data,
            updatedVillain
        ])
    }
}

module.exports = new Database();