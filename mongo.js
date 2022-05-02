const mongoose = require('mongoose');
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password111>')
    process.exit(1)
}



const url = `mongodb+srv://vgeordy:${password}@cluster0.tuioz.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        console.log('phonebook:')
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then((result) => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()

    })
}
