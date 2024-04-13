import { NextResponse } from "next/server";
import connect from "../../../lib/md";
import {verifyJwt} from "../../../lib/jwt.ts"
import Schedule from '../../../../models/schedule'

export async function POST (request, {params}){
    const {token} = params;
    const {schedules} = request.json();
    const payload= verifyJwt(token);
    await connect();
    const schedule = Schedule.create({ doctorId: payload.id, schedules });
    return NextResponse({message: "schedule posted"})
}



export async function PUT (request, {params}){
    const {token} = params;
    const {schedules} = request.json();
    const payload= verifyJwt(token);
    await connect();
    const schedule = Schedule.create();
    return NextResponse({message: "schedule updated"})
}