import { NextResponse } from "next/server";
import connect from "../../../lib/md";
import Doctor from './../../../models/doctor';



export async function GET (request){
    await connect();
    const patients= await Doctor.find();
    return NextResponse.json({doctors})
}