import { getAuthSession } from "../auth/[...nextauth]/route";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {

  const session = await getAuthSession();

  try {

    console.log('session is:' + session)

    if (session.user.isAdmin) {
      console.log('Authorised as admin')
      const orders = await prisma.order.findMany();
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    }
    const orders = await prisma.order.findMany({
      where: {
        userEmail: session.user.email,
      }
    });

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json(); // represents the JSON data sent in the request body, which is used to create an order record
      const order = await prisma.order.create({
        data: body, // save our new order record in the database
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }), 
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
