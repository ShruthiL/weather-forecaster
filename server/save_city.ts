// @ts-ignore
const saveCity = ({uid, city, res}, {collection}) => {

    collection.findOne({uid}, (err: any, doc: any) => {
        if (err) {
            res.send(err)
            return
        }

        const cities = doc && doc.cities || []

        if (cities.includes(city)) {
            res.status(200).send('city already exists in db')
            return
        }

        cities.push(city)

        const inputBody = {
            uid,
            cities
        }

        collection.findOneAndUpdate({uid}, {$set: inputBody}, {upsert: true, returnOriginal: false}, (err: any, doc: any) => {
            if (err) {
                res.send(err)
                return
            }

            delete doc.value['_id']

            res.status(201).send(doc.value)
        })
    })

}

export default saveCity
