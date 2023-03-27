'use strict'

import { encode, decode } from 'jwt-simple'
import moment from 'moment'

function createToken(user) {
    const payload = {
        sub: user.idUsuario,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    }

    return encode(payload, 'clavedeltokenfestilval')

}

function decryptToken(token) {

    return decode(token, 'clavedeltokenfestilval')

}

module.exports = {createToken, decryptToken}
