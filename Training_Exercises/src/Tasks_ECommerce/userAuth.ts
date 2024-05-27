import jwt from 'jsonwebtoken';
import { Users } from '../DB'
import { Request, Response } from 'express';
import {sendEmail} from './sendEmail'

(async function createUserIfNoUser() {
    try {
        const user: any = await Users.upsert({
            firstName: 'Anas',
            lastName: 'Anas',
            age: 20,
            profilePicture: '',
            emailAddress: 'anas@email.com',
            employment: 'Private',
            isVerified: true
        })

        if (user?.id) {
            const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
            const verificationUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
            //sendEmail(verificationUrl, user)
        }
        console.log('Default user created','anas@email.com')
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

exports.verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.query ;
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const user = await Users.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user not found.' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default authUser