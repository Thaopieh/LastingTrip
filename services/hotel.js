import { query, raw } from "express";

const { Hotels } = require("../models");
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get provinces.',
            response
        })
    } catch (error) {
        reject(error)
    }
});

const getAllHotel = ({page,limit,order, ...query}) => new Promise( async (resolve, reject)) => {
    try
    {
        const queries = { raw: true, nest: true}
        const offset = (!page || +page<=1)? 0: (+page -1)
        const flimit = +limit || process.env.LIMIT_BOOK
        queries.offset = offset * flimit
        queries.limit = flimit
        if(order) queries.order= [order]
        if(name) query.title


    }
}