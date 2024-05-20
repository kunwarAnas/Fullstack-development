import jwt from 'jsonwebtoken';
import { Users } from '../DB'
import { Request, Response, raw } from 'express';

(async function createUserIfNoUser() {
    try {
        await Users.upsert({
            firstName: 'Anas',
            lastName: 'Anas',
            age: 20,
            profilePicture: '',
            emailAddress: 'anas@email.com',
            employment: 'Private'
        })
        console.log('Default user created')
    } catch (err: any) {
        console.log(err.message)
    }

})()

const authUser = (req: Request, res: Response) => {

    const email = req.body.email || ''

    const user = Users.findOne({ where: { email } })

    if (!user) {
        return res.status(500).send('No user Found')
    }

    const token = jwt.sign(JSON.stringify(user), `${process.env.JWT_SECRET}`, { expiresIn: '1w' });
    res.cookie('Token', token, { secure: true })
    res.send(token)
}

export default authUser