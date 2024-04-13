import { NextResponse } from "next/server";
import connect from "../../../lib/md";
import {verifyJwt} from "../../../lib/jwt.ts"
import Doctor from './../../../../models/doctor';

export async function GET ({params}){
    const {token} = params;
    const payload= verifyJwt(token);
    await connect();
    const doctor = Doctor.findById(payload.id);

    return NextResponse({doctor})

}


export async function PUT (request, {params}){
    const {token} = params;
    const {fullName, photo, about, education, experience, ticketPrice, num_registre, num_patients, diploma } = request.json();

    const payload= verifyJwt(token);
    await connect();
    const doctor = Doctor.findByIdAndUpdate(payload.id, {fullName, photo, about, education, experience, ticketPrice, num_registre, num_patients, diploma });
    return NextResponse({message: "doctor updated"})
}

export async function DELETE ({params}){
    const {token} = params;
    const payload= verifyJwt(token);
    await connect();
    const doctor = Doctor.findByIdAndDelete(payload.id);

    return NextResponse({doctor})

}