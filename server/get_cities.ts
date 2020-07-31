// @ts-ignore
const getCities = ({uid, res}, {collection}) => {

    collection.findOne({uid}, (err: any, doc: any) => {
        if (err) {
            res.send(err)
            return
        }

        if (!doc) {
            res.send([])
            return
        }

        res.send(doc.cities || [])
    })

}

export default getCities
